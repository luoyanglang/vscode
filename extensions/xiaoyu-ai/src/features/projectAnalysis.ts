import * as vscode from 'vscode';
import * as path from 'path';
import { XiaoyuApiClient } from '../api/client';

/**
 * 项目分析功能
 * 分析项目结构、技术栈、依赖关系等
 */
export class ProjectAnalyzer {
	constructor(private apiClient: XiaoyuApiClient) { }

	/**
	 * 分析整个项目
	 */
	async analyzeProject(): Promise<void> {
		const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
		if (!workspaceFolder) {
			vscode.window.showErrorMessage('请先打开一个项目');
			return;
		}

		await vscode.window.withProgress(
			{
				location: vscode.ProgressLocation.Notification,
				title: '小玉正在分析项目...',
				cancellable: false
			},
			async (progress) => {
				progress.report({ increment: 0, message: '扫描项目结构...' });

				// 收集项目信息
				const projectInfo = await this.collectProjectInfo(workspaceFolder);

				progress.report({ increment: 50, message: '分析中...' });

				// 调用 API 分析
				const analysis = await this.apiClient.advancedChat(
					this.buildAnalysisPrompt(projectInfo),
					'你是一个资深的软件架构师和项目分析专家。请详细分析项目结构、技术栈、潜在问题，并提供优化建议。'
				);

				progress.report({ increment: 100, message: '完成' });

				// 显示分析结果
				this.showAnalysisResult(analysis.response);
			}
		);
	}

	/**
	 * 分析当前文件
	 */
	async analyzeCurrentFile(): Promise<void> {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			vscode.window.showWarningMessage('请先打开一个文件');
			return;
		}

		const document = editor.document;
		const code = document.getText();
		const language = document.languageId;
		const fileName = path.basename(document.fileName);

		const analysis = await this.apiClient.advancedChat(
			`请分析以下${language}文件（${fileName}）：\n\n\`\`\`${language}\n${code}\n\`\`\`\n\n请从以下角度分析：\n1. 代码结构和组织\n2. 设计模式和最佳实践\n3. 潜在的问题和改进建议\n4. 性能优化建议`,
			'你是一个代码审查专家，擅长发现代码问题并提供改进建议。'
		);

		this.showAnalysisResult(analysis.response);
	}

	/**
	 * 生成项目文档
	 */
	async generateDocumentation(): Promise<void> {
		const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
		if (!workspaceFolder) {
			vscode.window.showErrorMessage('请先打开一个项目');
			return;
		}

		const docType = await vscode.window.showQuickPick(
			[
				{ label: 'README.md', description: '项目说明文档' },
				{ label: 'API文档', description: 'API接口文档' },
				{ label: '架构文档', description: '系统架构设计文档' },
				{ label: '开发指南', description: '开发环境搭建和规范' }
			],
			{ placeHolder: '选择要生成的文档类型' }
		);

		if (!docType) {
			return;
		}

		await vscode.window.withProgress(
			{
				location: vscode.ProgressLocation.Notification,
				title: `正在生成${docType.label}...`,
				cancellable: false
			},
			async () => {
				const projectInfo = await this.collectProjectInfo(workspaceFolder);
				const prompt = this.buildDocumentationPrompt(docType.label, projectInfo);

				const result = await this.apiClient.advancedChat(
					prompt,
					'你是一个技术文档专家，擅长编写清晰、专业的技术文档。'
				);

				// 创建新文档
				const doc = await vscode.workspace.openTextDocument({
					content: result.response,
					language: 'markdown'
				});

				await vscode.window.showTextDocument(doc);
				vscode.window.showInformationMessage(`${docType.label}已生成`);
			}
		);
	}

	/**
	 * 提供解决方案
	 */
	async provideSolution(problem: string): Promise<void> {
		const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
		const projectContext = workspaceFolder
			? await this.collectProjectInfo(workspaceFolder)
			: null;

		const contextInfo = projectContext
			? `\n\n项目上下文：\n${JSON.stringify(projectContext, null, 2)}`
			: '';

		const solution = await this.apiClient.advancedChat(
			`问题描述：${problem}${contextInfo}\n\n请提供详细的解决方案，包括：\n1. 问题分析\n2. 多个可行方案\n3. 推荐方案及理由\n4. 实施步骤\n5. 注意事项`,
			'你是一个问题解决专家，擅长分析问题并提供多种可行的解决方案。'
		);

		this.showSolutionPanel(problem, solution.response);
	}

	/**
	 * 收集项目信息
	 */
	private async collectProjectInfo(workspaceFolder: vscode.WorkspaceFolder): Promise<any> {
		const projectPath = workspaceFolder.uri.fsPath;
		const projectName = path.basename(projectPath);

		// 读取 package.json
		let packageJson: any = null;
		try {
			const packagePath = vscode.Uri.joinPath(workspaceFolder.uri, 'package.json');
			const content = await vscode.workspace.fs.readFile(packagePath);
			packageJson = JSON.parse(content.toString());
		} catch {
			// package.json 不存在
		}

		// 扫描文件类型
		const files = await vscode.workspace.findFiles('**/*', '**/node_modules/**', 100);
		const fileTypes = new Set<string>();
		files.forEach(file => {
			const ext = path.extname(file.fsPath);
			if (ext) {
				fileTypes.add(ext);
			}
		});

		return {
			name: projectName,
			path: projectPath,
			packageJson: packageJson ? {
				name: packageJson.name,
				version: packageJson.version,
				dependencies: packageJson.dependencies,
				devDependencies: packageJson.devDependencies,
				scripts: packageJson.scripts
			} : null,
			fileTypes: Array.from(fileTypes),
			fileCount: files.length
		};
	}

	/**
	 * 构建分析提示词
	 */
	private buildAnalysisPrompt(projectInfo: any): string {
		return `请分析以下项目：

项目名称：${projectInfo.name}
文件数量：${projectInfo.fileCount}
文件类型：${projectInfo.fileTypes.join(', ')}

${projectInfo.packageJson ? `
Package.json 信息：
- 名称：${projectInfo.packageJson.name}
- 版本：${projectInfo.packageJson.version}
- 依赖：${Object.keys(projectInfo.packageJson.dependencies || {}).join(', ')}
- 开发依赖：${Object.keys(projectInfo.packageJson.devDependencies || {}).join(', ')}
- 脚本：${Object.keys(projectInfo.packageJson.scripts || {}).join(', ')}
` : ''}

请提供：
1. 项目技术栈分析
2. 项目结构评估
3. 潜在问题识别
4. 优化建议
5. 最佳实践建议`;
	}

	/**
	 * 构建文档生成提示词
	 */
	private buildDocumentationPrompt(docType: string, projectInfo: any): string {
		const baseInfo = `项目名称：${projectInfo.name}\n文件类型：${projectInfo.fileTypes.join(', ')}`;

		switch (docType) {
			case 'README.md':
				return `请为以下项目生成一个专业的 README.md 文档：\n\n${baseInfo}\n\n${projectInfo.packageJson ? `依赖：${Object.keys(projectInfo.packageJson.dependencies || {}).join(', ')}` : ''
					}\n\n请包含：项目简介、功能特性、安装方法、使用说明、开发指南、许可证等章节。`;

			case 'API文档':
				return `请为以下项目生成 API 接口文档：\n\n${baseInfo}\n\n请包含：接口列表、请求参数、响应格式、错误码、使用示例等。`;

			case '架构文档':
				return `请为以下项目生成系统架构设计文档：\n\n${baseInfo}\n\n请包含：系统架构图、模块划分、技术选型、数据流、部署架构等。`;

			case '开发指南':
				return `请为以下项目生成开发指南：\n\n${baseInfo}\n\n请包含：环境搭建、目录结构、开发规范、调试方法、常见问题等。`;

			default:
				return `请为项目生成${docType}`;
		}
	}

	/**
	 * 显示分析结果
	 */
	private showAnalysisResult(content: string): void {
		const panel = vscode.window.createWebviewPanel(
			'xiaoyuAnalysis',
			'项目分析结果',
			vscode.ViewColumn.One,
			{ enableScripts: true }
		);

		panel.webview.html = this.getResultHtml('项目分析', content);
	}

	/**
	 * 显示解决方案面板
	 */
	private showSolutionPanel(problem: string, solution: string): void {
		const panel = vscode.window.createWebviewPanel(
			'xiaoyuSolution',
			'解决方案',
			vscode.ViewColumn.One,
			{ enableScripts: true }
		);

		panel.webview.html = this.getResultHtml(`问题：${problem}`, solution);
	}

	/**
	 * 生成结果页面 HTML
	 */
	private getResultHtml(title: string, content: string): string {
		return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: var(--vscode-font-family);
      color: var(--vscode-foreground);
      background: var(--vscode-editor-background);
      padding: 20px;
      line-height: 1.6;
    }
    h1 {
      color: var(--vscode-textLink-foreground);
      border-bottom: 2px solid var(--vscode-textLink-foreground);
      padding-bottom: 10px;
    }
    h2 {
      color: var(--vscode-textLink-foreground);
      margin-top: 30px;
    }
    pre {
      background: var(--vscode-textCodeBlock-background);
      padding: 15px;
      border-radius: 5px;
      overflow-x: auto;
    }
    code {
      font-family: var(--vscode-editor-font-family);
      background: var(--vscode-textCodeBlock-background);
      padding: 2px 6px;
      border-radius: 3px;
    }
    ul, ol {
      margin-left: 20px;
    }
    li {
      margin: 8px 0;
    }
  </style>
</head>
<body>
  <h1>${this.escapeHtml(title)}</h1>
  <div id="content">${this.formatMarkdown(content)}</div>
</body>
</html>`;
	}

	private formatMarkdown(text: string): string {
		// 简单的 markdown 转换
		text = text.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');
		text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
		text = text.replace(/^### (.*$)/gim, '<h3>$1</h3>');
		text = text.replace(/^## (.*$)/gim, '<h2>$1</h2>');
		text = text.replace(/^# (.*$)/gim, '<h1>$1</h1>');
		text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
		text = text.replace(/\n/g, '<br>');
		return text;
	}

	private escapeHtml(text: string): string {
		return text
			.replace(/&/g, '&amp;')
			.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;')
			.replace(/"/g, '&quot;')
			.replace(/'/g, '&#039;');
	}
}

/**
 * 注册项目分析功能
 */
export function registerProjectAnalysis(
	context: vscode.ExtensionContext,
	apiClient: XiaoyuApiClient
): void {
	const analyzer = new ProjectAnalyzer(apiClient);

	// 分析整个项目
	context.subscriptions.push(
		vscode.commands.registerCommand('xiaoyu.analyzeProject', () => {
			analyzer.analyzeProject();
		})
	);

	// 分析当前文件
	context.subscriptions.push(
		vscode.commands.registerCommand('xiaoyu.analyzeFile', () => {
			analyzer.analyzeCurrentFile();
		})
	);

	// 生成文档
	context.subscriptions.push(
		vscode.commands.registerCommand('xiaoyu.generateDocs', () => {
			analyzer.generateDocumentation();
		})
	);

	// 提供解决方案
	context.subscriptions.push(
		vscode.commands.registerCommand('xiaoyu.provideSolution', async () => {
			const problem = await vscode.window.showInputBox({
				prompt: '描述你遇到的问题',
				placeHolder: '例如：如何优化数据库查询性能？',
				multiline: true
			});

			if (problem) {
				analyzer.provideSolution(problem);
			}
		})
	);
}
