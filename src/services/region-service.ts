import type { Region } from './../types'

import { BaseService } from './base.service'

export class RegionService extends BaseService {
  private static instance: RegionService

  /**
   * Get the singleton instance
   */
  static getInstance(): RegionService {
    if (!RegionService.instance) {
      RegionService.instance = new RegionService()
    }
    return RegionService.instance
  }
  async getRegionByRegionId(id: string) {
    return this.get<Region>('/api/settings')
  }
}

// Use singleton instance
export const regionService = RegionService.getInstance()
