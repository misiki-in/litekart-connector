import type { Setting } from './../types'

import { BaseService } from './base.service'

export class SettingService extends BaseService {
  private static instance: SettingService

  /**
   * Get the singleton instance
   */
  static getInstance(): SettingService {
    if (!SettingService.instance) {
      SettingService.instance = new SettingService()
    }
    return SettingService.instance
  }
  async fetchSetting() {
    return this.get<Setting[]>('/api/settings')
  }

  async saveSettings(setting: Omit<Setting, 'id'>) {
    return this.post<Setting>('/api/settings', setting)
  }

  async updateSettings(id: string, setting: Partial<Setting>) {
    return this.patch<Setting>(`/api/settings/${id}`, setting)
  }
}

// Use singleton instance
export const settingService = SettingService.getInstance()
