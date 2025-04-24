import type { Country } from './../types'

import { BaseService } from './base.service'

export class CountryService extends BaseService {
  private static instance: CountryService

  /**
   * Get the singleton instance
   */
  static getInstance(): CountryService {
    if (!CountryService.instance) {
      CountryService.instance = new CountryService()
    }
    return CountryService.instance
  }
  async list() {
    return this.get<Country[]>('/api/countries/all')
  }
}

// // Use singleton instance
export const countryService = CountryService.getInstance()
