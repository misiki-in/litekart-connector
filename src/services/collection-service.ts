import type { Collection, PaginatedResponse } from './../types'

import { BaseService } from './base.service'

export class CollectionService extends BaseService {
  private static instance: CollectionService

  /**
   * Get the singleton instance
   */
  static getInstance(): CollectionService {
    if (!CollectionService.instance) {
      CollectionService.instance = new CollectionService()
    }
    return CollectionService.instance
  }
  async list({ page = 1, q = '', sort = '-createdAt' }) {
    return this.get(
      `/api/collections?page=${page}&q=${q}&sort=${sort}`
    ) as Promise<PaginatedResponse<Collection>>
  }

  async getOne(id: string) {
    return this.get(`/api/collections/${id}`) as Promise<Collection>
  }

  async getAllRatings() {
    return this.get('/api/collections/all-ratings') as Promise<Collection>
  }
}

// // Use singleton instance
export const collectionService = CollectionService.getInstance()
