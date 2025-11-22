import * as vscode from 'vscode';

/**
 * 流式响应处理器（预留）
 * 等待 API 支持 SSE 或 WebSocket 后启用
 */
export class StreamingClient {
	private apiUrl: string;
	private apiKey: string;

	constructor(apiUrl: string, apiKey: string) {
		this.apiUrl = apiUrl;
		this.apiKey = apiKey;
	}

	/**
	 * 流式聊天（预留接口）
	 * @param message 消息内容
	 * @param onChunk 接收到数据块时的回调
	 * @param onComplete 完成时的回调
	 * @param onError 错误时的回调
	 */
	async streamChat(
		message: string,
		onChunk: (chunk: string) => void,
		onComplete: () => void,
		onError: (error: Error) => void
	): Promise<void> {
		// TODO: 等待 API 支持流式响应后实现
		// 可能的实现方式：
		// 1. Server-Sent Events (SSE)
		// 2. WebSocket
		// 3. HTTP Chunked Transfer Encoding

		vscode.window.showInformationMessage('流式响应功能开发中，敬请期待！');
	}

	/**
	 * 取消正在进行的请求（预留）
	 */
	cancelRequest(requestId: string): void {
		// TODO: 实现请求取消逻辑
	}
}
