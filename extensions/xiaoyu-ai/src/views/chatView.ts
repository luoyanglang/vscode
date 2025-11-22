import * as vscode from 'vscode';
import { XiaoyuApiClient } from '../api/client';

interface Message {
	role: 'user' | 'assistant';
	content: string;
	timestamp: number;
}

export class ChatViewProvider implements vscode.WebviewViewProvider {
	private _view?: vscode.WebviewView;
	private messages: Message[] = [];
	private sessionId?: string;

	constructor(
		private readonly _extensionUri: vscode.Uri,
		private readonly apiClient: XiaoyuApiClient
	) { }

	public resolveWebviewView(
		webviewView: vscode.WebviewView,
		context: vscode.WebviewViewResolveContext,
		_token: vscode.CancellationToken
	) {
		this._view = webviewView;

		webviewView.webview.options = {
			enableScripts: true,
			localResourceRoots: [this._extensionUri]
		};

		webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

		// 处理来自webview的消息
		webviewView.webview.onDidReceiveMessage(async (data) => {
			switch (data.type) {
				case 'sendMessage':
					await this.handleSendMessage(data.message);
					break;
				case 'clearChat':
					this.messages = [];
					this.sessionId = undefined;
					this.updateWebview();
					break;
				case 'newSession':
					this.sessionId = await this.apiClient.createSession();
					vscode.window.showInformationMessage('新会话已创建');
					break;
			}
		});
	}

	private async handleSendMessage(message: string) {
		if (!message.trim()) {
			return;
		}

		// 添加用户消息
		this.addMessage('user', message);

		try {
			// 发送到API
			const response = await this.apiClient.sendMessage({
				message,
				session_id: this.sessionId,
				use_memory: true
			});

			// 保存session_id
			if (response.session_id) {
				this.sessionId = response.session_id;
			}

			// 添加AI回复
			this.addMessage('assistant', response.response);

			// 显示token使用情况
			if (response.tokens_used) {
				console.log(`Tokens使用: ${response.tokens_used}, 成本: ${response.cost}`);
			}
		} catch (error: any) {
			vscode.window.showErrorMessage(`发送消息失败: ${error.message}`);
			this.addMessage('assistant', `错误: ${error.message}`);
		}
	}

	public addMessage(role: 'user' | 'assistant', content: string) {
		this.messages.push({
			role,
			content,
			timestamp: Date.now()
		});
		this.updateWebview();
	}

	private updateWebview() {
		if (this._view) {
			this._view.webview.postMessage({
				type: 'updateMessages',
				messages: this.messages
			});
		}
	}

	private _getHtmlForWebview(webview: vscode.Webview) {
		return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>小玉AI聊天</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: var(--vscode-font-family);
      color: var(--vscode-foreground);
      background: var(--vscode-editor-background);
      height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .header {
      padding: 10px;
      background: var(--vscode-sideBar-background);
      border-bottom: 1px solid var(--vscode-panel-border);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .header h3 {
      font-size: 14px;
      font-weight: 600;
    }

    .header-buttons button {
      background: var(--vscode-button-background);
      color: var(--vscode-button-foreground);
      border: none;
      padding: 4px 8px;
      margin-left: 5px;
      cursor: pointer;
      border-radius: 3px;
      font-size: 11px;
    }

    .header-buttons button:hover {
      background: var(--vscode-button-hoverBackground);
    }

    .messages {
      flex: 1;
      overflow-y: auto;
      padding: 15px;
    }

    .message {
      margin-bottom: 15px;
      animation: fadeIn 0.3s;
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .message.user {
      text-align: right;
    }

    .message-content {
      display: inline-block;
      max-width: 80%;
      padding: 10px 12px;
      border-radius: 8px;
      word-wrap: break-word;
    }

    .message.user .message-content {
      background: var(--vscode-button-background);
      color: var(--vscode-button-foreground);
    }

    .message.assistant .message-content {
      background: var(--vscode-input-background);
      border: 1px solid var(--vscode-input-border);
    }

    .message-content pre {
      background: var(--vscode-textCodeBlock-background);
      padding: 8px;
      border-radius: 4px;
      overflow-x: auto;
      margin: 8px 0;
    }

    .message-content code {
      font-family: var(--vscode-editor-font-family);
      font-size: 12px;
    }

    .input-area {
      padding: 10px;
      background: var(--vscode-sideBar-background);
      border-top: 1px solid var(--vscode-panel-border);
    }

    .input-container {
      display: flex;
      gap: 8px;
    }

    #messageInput {
      flex: 1;
      background: var(--vscode-input-background);
      color: var(--vscode-input-foreground);
      border: 1px solid var(--vscode-input-border);
      padding: 8px 12px;
      border-radius: 4px;
      font-size: 13px;
      resize: none;
      min-height: 36px;
      max-height: 120px;
    }

    #messageInput:focus {
      outline: 1px solid var(--vscode-focusBorder);
    }

    #sendButton {
      background: var(--vscode-button-background);
      color: var(--vscode-button-foreground);
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 13px;
      white-space: nowrap;
    }

    #sendButton:hover {
      background: var(--vscode-button-hoverBackground);
    }

    #sendButton:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  </style>
</head>
<body>
  <div class="header">
    <h3>💬 小玉AI助手</h3>
    <div class="header-buttons">
      <button onclick="newSession()">新会话</button>
      <button onclick="clearChat()">清空</button>
    </div>
  </div>

  <div class="messages" id="messages"></div>

  <div class="input-area">
    <div class="input-container">
      <textarea id="messageInput" placeholder="输入消息... (Ctrl+Enter发送)" rows="1"></textarea>
      <button id="sendButton" onclick="sendMessage()">发送</button>
    </div>
  </div>

  <script>
    const vscode = acquireVsCodeApi();
    const messagesDiv = document.getElementById('messages');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');

    // 接收来自扩展的消息
    window.addEventListener('message', event => {
      const message = event.data;
      if (message.type === 'updateMessages') {
        renderMessages(message.messages);
      }
    });

    function renderMessages(messages) {
      messagesDiv.innerHTML = '';
      messages.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.className = \`message \${msg.role}\`;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = formatMessage(msg.content);

        messageDiv.appendChild(contentDiv);
        messagesDiv.appendChild(messageDiv);
      });

      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }

    function formatMessage(content) {
      // 简单的markdown代码块处理
      content = content.replace(/\`\`\`(\w+)?\n([\s\S]*?)\`\`\`/g, '<pre><code>$2</code></pre>');
      content = content.replace(/\`([^\`]+)\`/g, '<code>$1</code>');
      content = content.replace(/\n/g, '<br>');
      return content;
    }

    function sendMessage() {
      const message = messageInput.value.trim();
      if (!message) return;

      vscode.postMessage({
        type: 'sendMessage',
        message: message
      });

      messageInput.value = '';
      messageInput.style.height = 'auto';
    }

    function clearChat() {
      vscode.postMessage({ type: 'clearChat' });
    }

    function newSession() {
      vscode.postMessage({ type: 'newSession' });
    }

    // 自动调整输入框高度
    messageInput.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = Math.min(this.scrollHeight, 120) + 'px';
    });

    // Ctrl+Enter发送
    messageInput.addEventListener('keydown', function(e) {
      if (e.ctrlKey && e.key === 'Enter') {
        e.preventDefault();
        sendMessage();
      }
    });

    // Enter换行
    messageInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' && !e.ctrlKey && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
  </script>
</body>
</html>`;
	}
}
