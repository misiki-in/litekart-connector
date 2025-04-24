import type { Reels, PaginatedResponse } from './../types'

import { BaseService } from './base.service'

export class ReelsService extends BaseService {
  private static instance: ReelsService

  /**
   * Get the singleton instance
   */
  static getInstance(): ReelsService {
    if (!ReelsService.instance) {
      ReelsService.instance = new ReelsService()
    }
    return ReelsService.instance
  }
  async list() {
    return this.get<PaginatedResponse<Reels>>('/api/reels')
  }
}

// Use singleton instance
export const reelsService = ReelsService.getInstance()
