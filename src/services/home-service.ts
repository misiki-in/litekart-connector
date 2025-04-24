import type { Home } from './../types'

import { BaseService } from './base.service'

export class HomeService extends BaseService {
  private static instance: HomeService

  /**
   * Get the singleton instance
   */
  static getInstance(): HomeService {
    if (!HomeService.instance) {
      HomeService.instance = new HomeService()
    }
    return HomeService.instance
  }
  async getHome() {
    return this.get<Home[]>('/api/home')
  }
}

// Use singleton instance
export const homeService = HomeService.getInstance()
