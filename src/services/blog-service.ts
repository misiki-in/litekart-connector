import type { Blog, PaginatedResponse } from './../types'
import { BaseService } from './base.service'

export class BlogService extends BaseService {
  private static instance: BlogService

  /**
   * Get the singleton instance
   */
  static getInstance(): BlogService {
    if (!BlogService.instance) {
      BlogService.instance = new BlogService()
    }
    return BlogService.instance
  }

  async list({ page = 1, q = '', sort = '-createdAt' }) {
    return this.get<PaginatedResponse<Blog>>(
      `/api/blogs?page=${page}&q=${q}&sort=${sort}`
    )
  }

  async getOne(id: string) {
    return this.get<Blog>(`/api/blogs/${id}`)
  }
}

// // Use singleton instance
export const blogService = BlogService.getInstance()
