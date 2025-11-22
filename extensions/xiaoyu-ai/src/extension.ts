import * as vscode from 'vscode';
import { XiaoyuApiClient } from './api/client';
import { ChatViewProvider } from './views/chatView';

let apiClient: XiaoyuApiClient;
let chatViewProvider: ChatViewProvider;

export function activate(context: vscode.ExtensionContext) {
	console.log('小玉AI扩展已激活');

	// 初始化API客户端
	apiClient = new XiaoyuApiClient();

	// 注册聊天视图
	chatViewProvider = new ChatViewProvider(context.extensionUri, apiClient);
	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider('xiaoyu.chatView', chatViewProvider)
	);

	// 注册命令：打开聊天
	context.subscriptions.push(
		vscode.commands.registerCommand('xiaoyu.openChat', () => {
			vscode.commands.executeCommand('xiaoyu.chatView.focus');
		})
	);

	// 注册命令：解释代码
	context.subscriptions.push(
		vscode.commands.registerCommand('xiaoyu.explainCode', async () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				return;
			}

			const selection = editor.selection;
			const code = editor.document.getText(selection);
			const language = editor.document.languageId;

			if (!code) {
				vscode.window.showWarningMessage('请先选中要解释的代码');
				return;
			}

			try {
				const response = await apiClient.advancedChat(
					`请解释以下${language}代码：\n\`\`\`${language}\n${code}\n\`\`\``,
					'你是一个编程专家，擅长解释代码的功能和实现原理。'
				);

				// 在聊天面板显示结果
				chatViewProvider.addMessage('user', `解释代码：\n\`\`\`${language}\n${code}\n\`\`\``);
				chatViewProvider.addMessage('assistant', response.response);
			} catch (error: any) {
				vscode.window.showErrorMessage(`解释代码失败: ${error.message}`);
			}
		})
	);

	// 注册命令：重构代码
	context.subscriptions.push(
		vscode.commands.registerCommand('xiaoyu.refactorCode', async () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				return;
			}

			const selection = editor.selection;
			const code = editor.document.getText(selection);
			const language = editor.document.languageId;

			if (!code) {
				vscode.window.showWarningMessage('请先选中要重构的代码');
				return;
			}

			try {
				const response = await apiClient.advancedChat(
					`请重构以下${language}代码，提高可读性和性能：\n\`\`\`${language}\n${code}\n\`\`\``,
					'你是一个代码重构专家，擅长优化代码结构和性能。请只返回重构后的代码。'
				);

				// 显示重构建议
				const panel = vscode.window.createWebviewPanel(
					'xiaoyuRefactor',
					'代码重构建议',
					vscode.ViewColumn.Beside,
					{}
				);

				panel.webview.html = getRefactorHtml(code, response.response, language);
			} catch (error: any) {
				vscode.window.showErrorMessage(`重构代码失败: ${error.message}`);
			}
		})
	);

	// 注册命令：添加记忆
	context.subscriptions.push(
		vscode.commands.registerCommand('xiaoyu.addMemory', async () => {
			const key = await vscode.window.showInputBox({
				prompt: '记忆标题',
				placeHolder: '例如：项目架构'
			});

			if (!key) {
				return;
			}

			const value = await vscode.window.showInputBox({
				prompt: '记忆内容',
				placeHolder: '输入要记住的内容'
			});

			if (!value) {
				return;
			}

			try {
				await apiClient.addMemory({
					type: 'user_pref',
					key,
					value,
					importance: 8,
					tags: ['vscode', 'manual']
				});

				vscode.window.showInformationMessage('记忆已添加');
			} catch (error: any) {
				vscode.window.showErrorMessage(`添加记忆失败: ${error.message}`);
			}
		})
	);

	// 检查API连接
	checkApiConnection();
}

async function checkApiConnection() {
	try {
		const isHealthy = await apiClient.healthCheck();
		if (!isHealthy) {
			vscode.window.showWarningMessage('小玉AI服务连接失败，请检查配置');
		}
	} catch (error) {
		vscode.window.showErrorMessage('无法连接到小玉AI服务，请检查API Key和网络');
	}
}

function getRefactorHtml(original: string, refactored: string, language: string): string {
	return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { padding: 20px; font-family: var(--vscode-font-family); }
        h2 { color: var(--vscode-foreground); }
        pre { background: var(--vscode-editor-background); padding: 15px; border-radius: 5px; overflow-x: auto; }
        code { color: var(--vscode-editor-foreground); }
        .section { margin-bottom: 30px; }
      </style>
    </head>
    <body>
      <div class="section">
        <h2>原始代码</h2>
        <pre><code class="language-${language}">${escapeHtml(original)}</code></pre>
      </div>
      <div class="section">
        <h2>重构建议</h2>
        <pre><code class="language-${language}">${escapeHtml(refactored)}</code></pre>
      </div>
    </body>
    </html>
  `;
}

function escapeHtml(text: string): string {
	return text
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}

export function deactivate() { }
