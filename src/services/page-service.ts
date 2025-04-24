import type { Page, PaginatedResponse } from './../types'

import { BaseService } from './base.service'

export class PageService extends BaseService {
  private static instance: PageService

  /**
   * Get the singleton instance
   */
  static getInstance(): PageService {
    if (!PageService.instance) {
      PageService.instance = new PageService()
    }
    return PageService.instance
  }
  async list({ page = 1, search = '', sort = '-createdAt' }) {
    return this.get<Page[]>(
      `/api/pages?page=${page}&search=${search}&sort=${sort}`
    )
  }

  async listLatestPages({}) {
    return this.get<PaginatedResponse<Page>>(
      '/api/pages?sort=-updatedAt&limit=10'
    )
  }

  async getOne(id: string) {
    return this.get<Page>(`/api/pages/${id}`)
  }
}

// Use singleton instance
export const pageService = PageService.getInstance()
