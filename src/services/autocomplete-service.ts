import type { AutoComplete, PaginatedResponse } from '../types'
import { BaseService } from './base.service'

export class AutocompleteService extends BaseService {
	private static instance: AutocompleteService

	/**
	 * Get the singleton instance
	 */
	static getInstance(): AutocompleteService {
		if (!AutocompleteService.instance) {
			AutocompleteService.instance = new AutocompleteService()
		}
		return AutocompleteService.instance
	}

	async list({ page = 1, q = '', sort = '-createdAt' }) {
		return this.get<PaginatedResponse<AutoComplete>>(
			`/api/autocomplete?page=${page}&q=${q}&sort=${sort}`
		)
	}
}

// // Use singleton instance
export const autocompleteService = AutocompleteService.getInstance()
