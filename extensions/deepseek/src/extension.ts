import * as vscode from 'vscode';

interface DeepSeekMessage {
	role: 'system' | 'user' | 'assistant';
	content: string;
}

interface DeepSeekResponse {
	choices: Array<{
		message: {
			content: string;
		};
	}>;
}

class DeepSeekService {
	private apiKey: string = '';
	private apiEndpoint: string = '';
	private model: string = '';

	constructor() {
		this.loadConfig();
	}

	private loadConfig() {
		const config = vscode.workspace.getConfiguration('deepseek');
		this.apiKey = config.get('apiKey', '');
		this.apiEndpoint = config.get('apiEndpoint', 'https://api.deepseek.com/v1');
		this.model = config.get('model', 'deepseek-chat');
	}

	async chat(messages: DeepSeekMessage[]): Promise<string> {
		if (!this.apiKey) {
			throw new Error('请先配置 DeepSeek API Key');
		}

		const response = await fetch(`${this.apiEndpoint}/chat/completions`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${this.apiKey}`
			},
			body: JSON.stringify({
				model: this.model,
				messages: messages,
				stream: false
			})
		});

		if (!response.ok) {
			throw new Error(`DeepSeek API 错误: ${response.statusText}`);
		}

		const data: DeepSeekResponse = await response.json();
		return data.choices[0]?.message?.content || '';
	}
}

export function activate(context: vscode.ExtensionContext) {
	const deepseek = new DeepSeekService();
	const outputChannel = vscode.window.createOutputChannel('DeepSeek');

	// 注册聊天命令
	context.subscriptions.push(
		vscode.commands.registerCommand('deepseek.chat', async () => {
			const input = await vscode.window.showInputBox({
				prompt: '输入你的问题',
				placeHolder: '例如: 如何使用 TypeScript 创建一个类？'
			});

			if (!input) {
				return;
			}

			try {
				await vscode.window.withProgress({
					location: vscode.ProgressLocation.Notification,
					title: 'DeepSeek 正在思考...',
					cancellable: false
				}, async () => {
					const response = await deepseek.chat([
						{ role: 'user', content: input }
					]);

					outputChannel.clear();
					outputChannel.appendLine('问题: ' + input);
					outputChannel.appendLine('');
					outputChannel.appendLine('回答:');
					outputChannel.appendLine(response);
					outputChannel.show();
				});
			} catch (error) {
				vscode.window.showErrorMessage(`DeepSeek 错误: ${error}`);
			}
		})
	);

	// 注册解释代码命令
	context.subscriptions.push(
		vscode.commands.registerCommand('deepseek.explainCode', async () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				return;
			}

			const selection = editor.document.getText(editor.selection);
			if (!selection) {
				vscode.window.showWarningMessage('请先选择要解释的代码');
				return;
			}

			try {
				await vscode.window.withProgress({
					location: vscode.ProgressLocation.Notification,
					title: 'DeepSeek 正在分析代码...',
					cancellable: false
				}, async () => {
					const response = await deepseek.chat([
						{
							role: 'user',
							content: `请详细解释以下代码的功能和实现原理:\n\n${selection}`
						}
					]);

					outputChannel.clear();
					outputChannel.appendLine('代码:');
					outputChannel.appendLine(selection);
					outputChannel.appendLine('');
					outputChannel.appendLine('解释:');
					outputChannel.appendLine(response);
					outputChannel.show();
				});
			} catch (error) {
				vscode.window.showErrorMessage(`DeepSeek 错误: ${error}`);
			}
		})
	);

	// 注册生成代码命令
	context.subscriptions.push(
		vscode.commands.registerCommand('deepseek.generateCode', async () => {
			const input = await vscode.window.showInputBox({
				prompt: '描述你想要生成的代码',
				placeHolder: '例如: 创建一个 React 组件用于显示用户列表'
			});

			if (!input) {
				return;
			}

			try {
				await vscode.window.withProgress({
					location: vscode.ProgressLocation.Notification,
					title: 'DeepSeek 正在生成代码...',
					cancellable: false
				}, async () => {
					const response = await deepseek.chat([
						{
							role: 'user',
							content: `请生成以下功能的代码:\n${input}\n\n只返回代码，不要有额外的解释。`
						}
					]);

					const editor = vscode.window.activeTextEditor;
					if (editor) {
						editor.edit(editBuilder => {
							editBuilder.insert(editor.selection.active, response);
						});
					} else {
						outputChannel.clear();
						outputChannel.appendLine(response);
						outputChannel.show();
					}
				});
			} catch (error) {
				vscode.window.showErrorMessage(`DeepSeek 错误: ${error}`);
			}
		})
	);

	// 注册优化代码命令
	context.subscriptions.push(
		vscode.commands.registerCommand('deepseek.optimizeCode', async () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				return;
			}

			const selection = editor.document.getText(editor.selection);
			if (!selection) {
				vscode.window.showWarningMessage('请先选择要优化的代码');
				return;
			}

			try {
				await vscode.window.withProgress({
					location: vscode.ProgressLocation.Notification,
					title: 'DeepSeek 正在优化代码...',
					cancellable: false
				}, async () => {
					const response = await deepseek.chat([
						{
							role: 'user',
							content: `请优化以下代码，提高性能和可读性:\n\n${selection}\n\n只返回优化后的代码和简短说明。`
						}
					]);

					outputChannel.clear();
					outputChannel.appendLine('原始代码:');
					outputChannel.appendLine(selection);
					outputChannel.appendLine('');
					outputChannel.appendLine('优化建议:');
					outputChannel.appendLine(response);
					outputChannel.show();
				});
			} catch (error) {
				vscode.window.showErrorMessage(`DeepSeek 错误: ${error}`);
			}
		})
	);

	// 监听配置变化
	context.subscriptions.push(
		vscode.workspace.onDidChangeConfiguration(e => {
			if (e.affectsConfiguration('deepseek')) {
				deepseek['loadConfig']();
			}
		})
	);

	outputChannel.appendLine('DeepSeek AI 助手已激活');
	outputChannel.appendLine('使用 Ctrl+Shift+D (Mac: Cmd+Shift+D) 开始对话');
}

export function deactivate() { }
