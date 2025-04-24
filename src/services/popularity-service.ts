import { BaseService } from './base.service'

export class PopularityService extends BaseService {
	private static instance: PopularityService

	/**
	 * Get the singleton instance
	 */
	static getInstance(): PopularityService {
		if (!PopularityService.instance) {
			PopularityService.instance = new PopularityService()
		}
		return PopularityService.instance
	}
	async updatePopularity({ product_id, sid = null }: { product_id: string; sid: string | null }) {}
}

// Use singleton instance
export const popularityService = PopularityService.getInstance()
