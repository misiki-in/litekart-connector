import type { Category, PaginatedResponse } from './../types'

import { BaseService } from './base.service'

export class CategoryService extends BaseService {
  private static instance: CategoryService

  /**
   * Get the singleton instance
   */
  static getInstance(): CategoryService {
    if (!CategoryService.instance) {
      CategoryService.instance = new CategoryService()
    }
    return CategoryService.instance
  }
  async fetchFooterCategories({ page = 1, q = '', sort = '-createdAt' }) {
    return this.get(
      `/api/categories?page=${page}&q=${q}&sort=${sort}`
    ) as Promise<PaginatedResponse<Category>>
  }
  async fetchFeaturedCategories({ limit = 100 }) {
    return this.get(`/api/categories/featured?limit=${limit}`) as Promise<
      PaginatedResponse<Category>
    >
  }

  async fetchCategory(id: string) {
    return this.get(`/api/product-categories?handle=${id}`) as Promise<Category>
  }

  async fetchAllCategories() {
    return this.get('/api/categories') as Promise<PaginatedResponse<Category>>
  }

  async fetchAllProductsOfCategories(id) {
    return this.get(`/api/product-categories?handle=${id}`) as Promise<
      PaginatedResponse<Category>
    >
  }

  async getMegamenu() {
    return this.get('/api/categories/megamenu') as Promise<
      PaginatedResponse<Category>
    >
  }
}

// // Use singleton instance
export const categoryService = CategoryService.getInstance()
