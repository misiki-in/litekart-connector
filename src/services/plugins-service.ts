import type { Plugins, PaginatedResponse } from './../types'

import { BaseService } from './base.service'

export class PluginService extends BaseService {
  private static instance: PluginService

  /**
   * Get the singleton instance
   */
  static getInstance(): PluginService {
    if (!PluginService.instance) {
      PluginService.instance = new PluginService()
    }
    return PluginService.instance
  }
  async list({ page = 1, q = '', sort = '-createdAt' }) {
    return this.get<PaginatedResponse<Plugins>>(
      `/api/plugins?page=${page}&q=${q}&sort=${sort}`
    )
  }
}

// Use singleton instance
export const pluginService = PluginService.getInstance()
