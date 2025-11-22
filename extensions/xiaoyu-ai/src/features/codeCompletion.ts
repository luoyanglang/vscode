import * as vscode from 'vscode';
import { XiaoyuApiClient } from '../api/client';

/**
 * 代码补全提供器（预留）
 * 等待 API 支持 /api/code/complete 接口后启用
 */
export class XiaoyuCompletionProvider implements vscode.InlineCompletionItemProvider {
	private apiClient: XiaoyuApiClient;

	constructor(apiClient: XiaoyuApiClient) {
		this.apiClient = apiClient;
	}

	async provideInlineCompletionItems(
		document: vscode.TextDocument,
		position: vscode.Position,
		context: vscode.InlineCompletionContext,
		token: vscode.CancellationToken
	): Promise<vscode.InlineCompletionItem[] | vscode.InlineCompletionList | null | undefined> {
		// TODO: 等待 API 支持代码补全接口后实现
		// 需要的功能：
		// 1. 获取当前文件上下文
		// 2. 获取光标位置前后的代码
		// 3. 调用 API 获取补全建议
		// 4. 返回补全项

		return null;
	}
}

/**
 * 注册代码补全功能（预留）
 */
export function registerCodeCompletion(
	context: vscode.ExtensionContext,
	apiClient: XiaoyuApiClient
): void {
	// TODO: 等待 API 支持后取消注释
	// const provider = new XiaoyuCompletionProvider(apiClient);
	// context.subscriptions.push(
	//   vscode.languages.registerInlineCompletionItemProvider(
	//     { pattern: '**' },
	//     provider
	//   )
	// );

	console.log('代码补全功能预留，等待 API 支持');
}
