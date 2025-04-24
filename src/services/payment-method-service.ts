import type { PaymentMethod, PaginatedResponse } from './../types'

import { BaseService } from './base.service'

export class PaymentMethodService extends BaseService {
  private static instance: PaymentMethodService

  /**
   * Get the singleton instance
   */
  static getInstance(): PaymentMethodService {
    if (!PaymentMethodService.instance) {
      PaymentMethodService.instance = new PaymentMethodService()
    }
    return PaymentMethodService.instance
  }
  async list({ page = 1, q = '', sort = '-createdAt' }) {
    return this.get<PaginatedResponse<PaymentMethod>>(
      `/api/payment-methods?page=${page}&q=${q}&sort=${sort}`
    )
  }
}

// Use singleton instance
export const paymentMethodService = PaymentMethodService.getInstance()
