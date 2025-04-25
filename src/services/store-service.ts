import { BaseService } from './base.service'

/**
 * StoreService provides functionality for retrieving store information
 * in the Litekart platform.
 *
 * This service helps with:
 * - Retrieving store details by ID or domain
 * - Accessing store configuration and settings
 * - Facilitating multi-store operations
 */
export class StoreService extends BaseService {
  private static instance: StoreService

  /**
   * Get the singleton instance
   *
   * @returns {StoreService} The singleton instance of StoreService
   */
  static getInstance(): StoreService {
    if (!StoreService.instance) {
      StoreService.instance = new StoreService()
    }
    return StoreService.instance
  }

  /**
   * Retrieves store details by ID or domain name
   *
   * @param {Object} params - The parameters for fetching the store
   * @param {string} [params.storeId] - The ID of the store to fetch
   * @param {string} [params.domain] - The domain name of the store to fetch
   * @returns {Promise<any>} The store details
   * @api {get} /api/stores/public-details Get store details
   *
   * @example
   * // Get store by ID
   * const store = await storeService.getStoreByIdOrDomain({
   *   storeId: '123'
   * });
   *
   * // Get store by domain
   * const store = await storeService.getStoreByIdOrDomain({
   *   domain: 'mystore.example.com'
   * });
   */
  async getStoreByIdOrDomain({
    storeId,
    domain
  }: {
    storeId?: string
    domain?: string
  }) {
    let url = `/api/stores/public-details?domain=${domain}`
    if (storeId) {
      url = `/api/stores/public-details?store_id=${storeId}`
    }
    return this.get(url)
  }
}

// Use singleton instance
export const storeService = StoreService.getInstance()
