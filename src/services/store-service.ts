import { BaseService } from './base.service'

/**
 * Service for managing store
 * This class can be moved to another project easily
 */
export class StoreService extends BaseService {
	private static instance: StoreService

	/**
	 * Get the singleton instance
	 */
	static getInstance(): StoreService {
		if (!StoreService.instance) {
			StoreService.instance = new StoreService()
		}
		return StoreService.instance
	}

	/**
	 * Get a single store by ID
	 */
	async getStoreByIdOrDomain({ storeId, domain }: { storeId?: string; domain?: string }) {
		let url = `/api/stores/public-details?domain=${domain}`
		if (storeId) {
			url = `/api/stores/public-details?store_id=${storeId}`
		}
		return this.get(url)
	}
}

// Use singleton instance
export const storeService = StoreService.getInstance()
