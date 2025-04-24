import type { Demo } from './../types'

import { BaseService } from './base.service'

export class DemoRequestService extends BaseService {
  private static instance: DemoRequestService

  /**
   * Get the singleton instance
   */
  static getInstance(): DemoRequestService {
    if (!DemoRequestService.instance) {
      DemoRequestService.instance = new DemoRequestService()
    }
    return DemoRequestService.instance
  }
  async saveScheduleDemo() {
    return this.get<Demo>('/api/schedule-demo')
  }
}

// // Use singleton instance
export const demoRequestService = DemoRequestService.getInstance()
