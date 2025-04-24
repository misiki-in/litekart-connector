import type { Currency, PaginatedResponse } from './../types'

import { BaseService } from './base.service'

export class CurrencyService extends BaseService {
  private static instance: CurrencyService

  /**
   * Get the singleton instance
   */
  static getInstance(): CurrencyService {
    if (!CurrencyService.instance) {
      CurrencyService.instance = new CurrencyService()
    }
    return CurrencyService.instance
  }
  async listCurrencies() {
    return this.get<PaginatedResponse<Currency>>('/api/currencies')
  }
}

// // Use singleton instance
export const currencyService = CurrencyService.getInstance()
