import type { Menu } from './../types'

import { BaseService } from './base.service'

export class MenuService extends BaseService {
  private static instance: MenuService

  /**
   * Get the singleton instance
   */
  static getInstance(): MenuService {
    if (!MenuService.instance) {
      MenuService.instance = new MenuService()
    }
    return MenuService.instance
  }
  async list() {
    return this.get<Menu[]>('/api/menu')
  }
}

// Use singleton instance
export const menuService = MenuService.getInstance()
