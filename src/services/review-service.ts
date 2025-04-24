import type { Feedback, PaginatedResponse } from './../types'

import { BaseService } from './base.service'

export class ReviewService extends BaseService {
  private static instance: ReviewService

  /**
   * Get the singleton instance
   */
  static getInstance(): ReviewService {
    if (!ReviewService.instance) {
      ReviewService.instance = new ReviewService()
    }
    return ReviewService.instance
  }
  async fetchReviews({
    productId,
    search = '',
    sort = '-createdAt',
    currentPage = 1
  }: {
    productId: string
    search: string
    sort: string
    currentPage: number
  }) {
    return this.get<PaginatedResponse<Feedback>>(
      `/api/reviews/me?product_id=${productId}&q=${search}&sort=${sort}&page=${currentPage}`
    )
  }
  async allReviews({
    search = '',
    sort = '-createdAt',
    currentPage = 1
  }: {
    search: string
    sort: string
    currentPage: number
  }) {
    return this.get<PaginatedResponse<Feedback>>('/api/products/all-ratings')
  }

  async fetchProducrReviews(productId: string) {
    return this.get<PaginatedResponse<Feedback>>(
      `/api/reviews?product-id=${productId}`
    )
  }

  async saveReview(review: Omit<Feedback, 'id'>) {
    return this.post<Feedback>('/api/reviews', review)
  }
}

// Use singleton instance
export const reviewService = ReviewService.getInstance()
