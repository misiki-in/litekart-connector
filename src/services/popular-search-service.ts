import type { PopularSearch, PaginatedResponse } from './../types'

import { BaseService } from './base.service'

export class PopularSearchService extends BaseService {
  private static instance: PopularSearchService

  /**
   * Get the singleton instance
   */
  static getInstance(): PopularSearchService {
    if (!PopularSearchService.instance) {
      PopularSearchService.instance = new PopularSearchService()
    }
    return PopularSearchService.instance
  }
  async listPopularSearch({ page = 1, q = '', sort = '-createdAt' }) {
    return this.get<PaginatedResponse<PopularSearch>>(
      `/api/popular-search?page=${page}&q=${q}&sort=${sort}`
    )
  }
}

// Use singleton instance
export const popularSearchService = PopularSearchService.getInstance()
