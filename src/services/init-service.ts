import type { Init } from './../types'

import { BaseService } from './base.service'

export class InitService extends BaseService {
  private static instance: InitService

  /**
   * Get the singleton instance
   */
  static getInstance(): InitService {
    if (!InitService.instance) {
      InitService.instance = new InitService()
    }
    return InitService.instance
  }
  async fetchInit() {
    return this.get<Init[]>('/api/init')
  }
}

// Use singleton instance
export const initService = InitService.getInstance()
