import type { Feedback, PaginatedResponse } from './../types'

import { BaseService } from './base.service'

export class FeedbackService extends BaseService {
  private static instance: FeedbackService

  /**
   * Get the singleton instance
   */
  static getInstance(): FeedbackService {
    if (!FeedbackService.instance) {
      FeedbackService.instance = new FeedbackService()
    }
    return FeedbackService.instance
  }
  async listFeedbacks({ page = 1, q = '', sort = '-createdAt' }) {
    return this.get<Feedback[]>(
      `/api/feedbacks?page=${page}&q=${q}&sort=${sort}`
    )
  }
}

// // Use singleton instance
export const feedbackService = FeedbackService.getInstance()
