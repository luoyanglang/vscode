import * as vscode from 'vscode';

interface AIMessage {
	role: 'system' | 'user' | 'assistant';
	content: string;
}

interface AIResponse {
	choices: Array<{
		message: {
			content: string;
		};
	}>;
}

type AIProvider = 'deepseek' | 'openai';

class AIService {
	private conversationHistory: AIMessage[] = [];
	private outputChannel: vscode.OutputChannel;

	constructor(outputChannel: vscode.OutputChannel) {
		this.outputChannel = outputChannel;
	}

	private getConfig() {
		const config = vscode.workspace.getConfiguration('aiAssistant');
		const provider = config.get<AIProvider>('provider', 'deepseek');

		if (provider === 'openai') {
			return {
				provider,
				apiKey: config.get<string>('openai.apiKey', ''),
				endpoint: config.get<string>('openai.apiEndpoint', 'https://api.openai.com/v1'),
				model: config.get<string>('openai.model', 'gpt-4'),
				language: config.get<string>('language', 'zh-CN')
			};
		} else {
			return {
				provider,
				apiKey: config.get<string>('deepseek.apiKey', ''),
				endpoint: 'https://api.deepseek.com/v1',
				model: config.get<string>('deepseek.model', 'deepseek-chat'),
				language: config.get<string>('language', 'zh-CN')
			};
		}
	}

	async chat(userMessage: string, systemPrompt?: string): Promise<string> {
		const config = this.getConfig();

		if (!config.apiKey) {
			throw new Error(`请先配置 ${config.provider === 'openai' ? 'OpenAI' : 'DeepSeek'} API Key`);
		}

		const messages: AIMessage[] = [];

		if (systemPrompt) {
			messages.push({ role: 'system', content: systemPrompt });
		}

		messages.push(...this.conversationHistory);
		messages.push({ role: 'user', content: userMessage });

		try {
			const response = await fetch(`${config.endpoint}/chat/completions`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${config.apiKey}`
				},
				body: JSON.stringify({
					model: config.model,
					messages: messages,
					stream: false,
					temperature: 0.7
				})
			});

			if (!response.ok) {
				const error = await response.text();
				throw new Error(`API 错误 (${response.status}): ${error}`);
			}

			const data: AIResponse = await response.json();
			const assistantMessage = data.choices[0]?.message?.content || '';

			// 保存对话历史
			this.conversationHistory.push({ role: 'user', content: userMessage });
			this.conversationHistory.push({ role: 'assistant', content: assistantMessage });

			// 限制历史记录长度
			if (this.conversationHistory.length > 20) {
				this.conversationHistory = this.conversationHistory.slice(-20);
			}

			return assistantMessage;
		} catch (error) {
			this.outputChannel.appendLine(`错误: ${error}`);
			throw error;
		}
	}

	clearHistory() {
		this.conversationHistory = [];
	}

	getProviderName(): string {
		const config = this.getConfig();
		return config.provider === 'openai' ? 'OpenAI' : 'DeepSeek';
	}
}

export function activate(context: vscode.ExtensionContext) {
	const outputChannel = vscode.window.createOutputChannel('AI 助手');
	const aiService = new AIService(outputChannel);

	outputChannel.appendLine('='.repeat(50));
	outputChannel.appendLine('AI 代码助手已激活');
	outputChannel.appendLine('支持: DeepSeek、OpenAI Codex');
	outputChannel.appendLine('快捷键: Ctrl+Shift+A (Mac: Cmd+Shift+A)');
	outputChannel.appendLine('='.repeat(50));

	// 开始对话
	context.subscriptions.push(
		vscode.commands.registerCommand('aiAssistant.chat', async () => {
			const input = await vscode.window.showInputBox({
				prompt: '💬 输入你的问题',
				placeHolder: '例如: 如何使用 TypeScript 创建一个类？',
				ignoreFocusOut: true
			});

			if (!input) return;

			await executeAICommand(
				aiService,
				outputChannel,
				'对话',
				input,
				async () => await aiService.chat(input)
			);
		})
	);

	// 解释代码
	context.subscriptions.push(
		vscode.commands.registerCommand('aiAssistant.explainCode', async () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) return;

			const selection = editor.document.getText(editor.selection);
			if (!selection) {
				vscode.window.showWarningMessage('请先选择要解释的代码');
				return;
			}

			const language = editor.document.languageId;
			await executeAICommand(
				aiService,
				outputChannel,
				'代码解释',
				selection,
				async () => await aiService.chat(
					`请详细解释以下 ${language} 代码的功能、实现原理和关键点:\n\n\`\`\`${language}\n${selection}\n\`\`\``,
					'你是一位经验丰富的程序员，擅长解释代码。请用清晰易懂的中文解释代码。'
				)
			);
		})
	);

	// 生成代码
	context.subscriptions.push(
		vscode.commands.registerCommand('aiAssistant.generateCode', async () => {
			const input = await vscode.window.showInputBox({
				prompt: '✨ 描述你想要生成的代码',
				placeHolder: '例如: 创建一个 React 组件用于显示用户列表',
				ignoreFocusOut: true
			});

			if (!input) return;

			const editor = vscode.window.activeTextEditor;
			const language = editor?.document.languageId || 'typescript';

			await executeAICommand(
				aiService,
				outputChannel,
				'代码生成',
				input,
				async () => {
					const code = await aiService.chat(
						`请用 ${language} 生成以下功能的代码:\n${input}\n\n要求:\n1. 只返回代码，不要有额外的解释\n2. 代码要完整可运行\n3. 添加必要的注释`,
						'你是一位专业的程序员，擅长编写高质量的代码。'
					);

					if (editor) {
						await editor.edit(editBuilder => {
							editBuilder.insert(editor.selection.active, code);
						});
					}

					return code;
				}
			);
		})
	);

	// 优化代码
	context.subscriptions.push(
		vscode.commands.registerCommand('aiAssistant.optimizeCode', async () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) return;

			const selection = editor.document.getText(editor.selection);
			if (!selection) {
				vscode.window.showWarningMessage('请先选择要优化的代码');
				return;
			}

			const language = editor.document.languageId;
			await executeAICommand(
				aiService,
				outputChannel,
				'代码优化',
				selection,
				async () => await aiService.chat(
					`请优化以下 ${language} 代码，提高性能、可读性和可维护性:\n\n\`\`\`${language}\n${selection}\n\`\`\`\n\n请提供:\n1. 优化后的代码\n2. 优化说明`,
					'你是一位代码优化专家，擅长提升代码质量。'
				)
			);
		})
	);

	// 修复代码错误
	context.subscriptions.push(
		vscode.commands.registerCommand('aiAssistant.fixCode', async () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) return;

			const selection = editor.document.getText(editor.selection);
			if (!selection) {
				vscode.window.showWarningMessage('请先选择要修复的代码');
				return;
			}

			const language = editor.document.languageId;
			await executeAICommand(
				aiService,
				outputChannel,
				'修复错误',
				selection,
				async () => await aiService.chat(
					`请分析并修复以下 ${language} 代码中的错误:\n\n\`\`\`${language}\n${selection}\n\`\`\`\n\n请提供:\n1. 错误分析\n2. 修复后的代码\n3. 修复说明`,
					'你是一位调试专家，擅长发现和修复代码错误。'
				)
			);
		})
	);

	// 添加注释
	context.subscriptions.push(
		vscode.commands.registerCommand('aiAssistant.addComments', async () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) return;

			const selection = editor.document.getText(editor.selection);
			if (!selection) {
				vscode.window.showWarningMessage('请先选择要添加注释的代码');
				return;
			}

			const language = editor.document.languageId;
			await executeAICommand(
				aiService,
				outputChannel,
				'添加注释',
				selection,
				async () => await aiService.chat(
					`请为以下 ${language} 代码添加详细的中文注释:\n\n\`\`\`${language}\n${selection}\n\`\`\`\n\n要求:\n1. 注释要清晰易懂\n2. 解释关键逻辑\n3. 保持代码格式`,
					'你是一位文档专家，擅长编写清晰的代码注释。'
				)
			);
		})
	);

	// 生成测试代码
	context.subscriptions.push(
		vscode.commands.registerCommand('aiAssistant.generateTests', async () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) return;

			const selection = editor.document.getText(editor.selection);
			if (!selection) {
				vscode.window.showWarningMessage('请先选择要生成测试的代码');
				return;
			}

			const language = editor.document.languageId;
			await executeAICommand(
				aiService,
				outputChannel,
				'生成测试',
				selection,
				async () => await aiService.chat(
					`请为以下 ${language} 代码生成完整的单元测试:\n\n\`\`\`${language}\n${selection}\n\`\`\`\n\n要求:\n1. 使用常见的测试框架\n2. 覆盖主要功能\n3. 包含边界情况`,
					'你是一位测试专家，擅长编写全面的单元测试。'
				)
			);
		})
	);

	// 翻译代码语言
	context.subscriptions.push(
		vscode.commands.registerCommand('aiAssistant.translateCode', async () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) return;

			const selection = editor.document.getText(editor.selection);
			if (!selection) {
				vscode.window.showWarningMessage('请先选择要翻译的代码');
				return;
			}

			const targetLanguage = await vscode.window.showQuickPick(
				['TypeScript', 'JavaScript', 'Python', 'Java', 'Go', 'Rust', 'C++', 'C#'],
				{ placeHolder: '选择目标语言' }
			);

			if (!targetLanguage) return;

			const sourceLanguage = editor.document.languageId;
			await executeAICommand(
				aiService,
				outputChannel,
				'代码翻译',
				selection,
				async () => await aiService.chat(
					`请将以下 ${sourceLanguage} 代码翻译成 ${targetLanguage}:\n\n\`\`\`${sourceLanguage}\n${selection}\n\`\`\`\n\n要求:\n1. 保持功能一致\n2. 使用目标语言的最佳实践\n3. 添加必要的注释`,
					'你是一位多语言编程专家，擅长在不同编程语言之间转换代码。'
				)
			);
		})
	);

	// 重构代码
	context.subscriptions.push(
		vscode.commands.registerCommand('aiAssistant.refactor', async () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) return;

			const selection = editor.document.getText(editor.selection);
			if (!selection) {
				vscode.window.showWarningMessage('请先选择要重构的代码');
				return;
			}

			const language = editor.document.languageId;
			await executeAICommand(
				aiService,
				outputChannel,
				'代码重构',
				selection,
				async () => await aiService.chat(
					`请重构以下 ${language} 代码，提高代码质量:\n\n\`\`\`${language}\n${selection}\n\`\`\`\n\n要求:\n1. 提取重复代码\n2. 改善命名\n3. 简化逻辑\n4. 遵循设计模式`,
					'你是一位重构专家，擅长改善代码结构和设计。'
				)
			);
		})
	);

	// 生成文档
	context.subscriptions.push(
		vscode.commands.registerCommand('aiAssistant.generateDoc', async () => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) return;

			const selection = editor.document.getText(editor.selection);
			if (!selection) {
				vscode.window.showWarningMessage('请先选择要生成文档的代码');
				return;
			}

			const language = editor.document.languageId;
			await executeAICommand(
				aiService,
				outputChannel,
				'生成文档',
				selection,
				async () => await aiService.chat(
					`请为以下 ${language} 代码生成详细的 API 文档:\n\n\`\`\`${language}\n${selection}\n\`\`\`\n\n要求:\n1. 使用 JSDoc/Markdown 格式\n2. 包含参数说明\n3. 包含返回值说明\n4. 包含使用示例`,
					'你是一位技术文档专家，擅长编写清晰的 API 文档。'
				)
			);
		})
	);

	// 清除对话历史
	context.subscriptions.push(
		vscode.commands.registerCommand('aiAssistant.clearHistory', () => {
			aiService.clearHistory();
			vscode.window.showInformationMessage('✅ 对话历史已清除');
			outputChannel.appendLine('\n' + '='.repeat(50));
			outputChannel.appendLine('对话历史已清除');
			outputChannel.appendLine('='.repeat(50) + '\n');
		})
	);

	// 监听配置变化
	context.subscriptions.push(
		vscode.workspace.onDidChangeConfiguration(e => {
			if (e.affectsConfiguration('aiAssistant')) {
				const provider = aiService.getProviderName();
				outputChannel.appendLine(`\n配置已更新，当前使用: ${provider}\n`);
			}
		})
	);
}

async function executeAICommand(
	aiService: AIService,
	outputChannel: vscode.OutputChannel,
	commandName: string,
	input: string,
	action: () => Promise<string>
) {
	try {
		await vscode.window.withProgress({
			location: vscode.ProgressLocation.Notification,
			title: `${aiService.getProviderName()} 正在处理...`,
			cancellable: false
		}, async () => {
			const response = await action();

			outputChannel.clear();
			outputChannel.appendLine('='.repeat(50));
			outputChannel.appendLine(`命令: ${commandName}`);
			outputChannel.appendLine(`提供商: ${aiService.getProviderName()}`);
			outputChannel.appendLine(`时间: ${new Date().toLocaleString('zh-CN')}`);
			outputChannel.appendLine('='.repeat(50));
			outputChannel.appendLine('\n【输入】');
			outputChannel.appendLine(input.substring(0, 500) + (input.length > 500 ? '...' : ''));
			outputChannel.appendLine('\n【回复】');
			outputChannel.appendLine(response);
			outputChannel.appendLine('\n' + '='.repeat(50) + '\n');
			outputChannel.show();
		});
	} catch (error: any) {
		vscode.window.showErrorMessage(`❌ ${error.message || error}`);
		outputChannel.appendLine(`\n错误: ${error.message || error}\n`);
	}
}

export function deactivate() { }
