import type { Deal, PaginatedResponse } from './../types'

import { BaseService } from './base.service'

export class DealService extends BaseService {
  private static instance: DealService

  /**
   * Get the singleton instance
   */
  static getInstance(): DealService {
    if (!DealService.instance) {
      DealService.instance = new DealService()
    }
    return DealService.instance
  }
  async fetchDeals() {
    return this.get<PaginatedResponse<Deal>>('/api/products')
  }
}

// // Use singleton instance
export const dealService = DealService.getInstance()
