import type { User } from './../types'

import { BaseService } from './base.service'

export class ProfileService extends BaseService {
  private static instance: ProfileService

  /**
   * Get the singleton instance
   */
  static getInstance(): ProfileService {
    if (!ProfileService.instance) {
      ProfileService.instance = new ProfileService()
    }
    return ProfileService.instance
  }
  async getOne() {
    return this.get<User>('/api/users/me')
  }

  async save(blog: Omit<User, 'id'>) {
    return this.patch<User>('/api/users', blog)
  }
}

// Use singleton instance
export const profileService = ProfileService.getInstance()
