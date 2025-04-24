import { BaseService } from './base.service'

export class ChatService extends BaseService {
	private static instance: ChatService

	/**
	 * Get the singleton instance
	 */
	static getInstance(): ChatService {
		if (!ChatService.instance) {
			ChatService.instance = new ChatService()
		}
		return ChatService.instance
	}
	async list() {
		return this.get<Record<string, any>[]>('/api/chats')
	}
}

// // Use singleton instance
export const chatService = ChatService.getInstance()
