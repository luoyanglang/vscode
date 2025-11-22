import axios, { AxiosInstance } from 'axios';
import * as vscode from 'vscode';

export interface ChatRequest {
	message: string;
	session_id?: string;
	use_memory?: boolean;
	model?: string;
}

export interface ChatResponse {
	success: boolean;
	response: string;
	session_id: string;
	memories_used?: any[];
	tokens_used?: number;
	cost?: number;
}

export interface Memory {
	id?: number;
	type: string;
	key: string;
	value: string;
	importance: number;
	tags?: string[];
}

export class XiaoyuApiClient {
	private client: AxiosInstance;
	private apiKey: string;
	private apiUrl: string;

	constructor() {
		const config = vscode.workspace.getConfiguration('xiaoyu');
		this.apiKey = config.get('apiKey', '');
		this.apiUrl = config.get('apiUrl', 'https://xiaoyu.api.ymd.cc');

		this.client = axios.create({
			baseURL: this.apiUrl,
			timeout: 30000,
			headers: {
				'X-API-Key': this.apiKey,
				'Content-Type': 'application/json'
			}
		});
	}

	async sendMessage(request: ChatRequest): Promise<ChatResponse> {
		const config = vscode.workspace.getConfiguration('xiaoyu');
		const useMemory = config.get('useMemory', true);
		const model = config.get('model', 'deepseek-chat');

		const response = await this.client.post<ChatResponse>('/api/chat', {
			...request,
			use_memory: request.use_memory ?? useMemory,
			model: request.model ?? model
		});

		return response.data;
	}

	async advancedChat(message: string, systemPrompt: string): Promise<ChatResponse> {
		const response = await this.client.post<ChatResponse>('/api/chat/advanced', {
			message,
			system_prompt: systemPrompt,
			use_memory: true
		});

		return response.data;
	}

	async addMemory(memory: Memory): Promise<void> {
		await this.client.post('/api/memory/add', memory);
	}

	async searchMemory(query: string, limit: number = 10): Promise<any[]> {
		const response = await this.client.post('/api/memory/search', {
			query,
			limit
		});

		return response.data.memories || [];
	}

	async createSession(name?: string): Promise<string> {
		const response = await this.client.post('/api/session/create', {
			name: name || `会话 ${new Date().toLocaleString()}`
		});

		return response.data.session_id;
	}

	async getSessionList(): Promise<any[]> {
		const response = await this.client.get('/api/session/list');
		return response.data.sessions || [];
	}

	async healthCheck(): Promise<boolean> {
		try {
			const response = await this.client.get('/health');
			return response.data.status === 'healthy';
		} catch {
			return false;
		}
	}
}
