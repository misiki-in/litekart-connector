import type { Banner, PaginatedResponse } from './../types'
import { BaseService } from './base.service'

export class BannerService extends BaseService {
  private static instance: BannerService

  /**
   * Get the singleton instance
   */
  static getInstance(): BannerService {
    if (!BannerService.instance) {
      BannerService.instance = new BannerService()
    }
    return BannerService.instance
  }

  async list() {
    return this.get<PaginatedResponse<Banner>>('/api/banners')
  }

  async fetchBannersGroup() {
    return this.get<PaginatedResponse<Banner>>('/api/banners')
  }
}

// Use singleton instance
export const bannerService = BannerService.getInstance()
