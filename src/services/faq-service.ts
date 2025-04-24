import type { Faq, PaginatedResponse } from './../types'

import { BaseService } from './base.service'

export class FaqService extends BaseService {
  private static instance: FaqService

  /**
   * Get the singleton instance
   */
  static getInstance(): FaqService {
    if (!FaqService.instance) {
      FaqService.instance = new FaqService()
    }
    return FaqService.instance
  }
  async listFaqs({ page = 1, q = '', sort = '-createdAt' }) {
    return this.get<PaginatedResponse<Faq>>(
      `/api/faqs?page=${page}&q=${q}&sort=${sort}`
    )
  }
}

// // Use singleton instance
export const faqService = FaqService.getInstance()
