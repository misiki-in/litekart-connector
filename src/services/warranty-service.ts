import type { Warranty, WarrantyRegistrationInput } from '../types'
import { BaseService } from './base.service'

/**
 * WarrantyService provides functionality for managing warranty registrations
 * in the Litekart platform.
 */
export class WarrantyService extends BaseService {
  private static instance: WarrantyService

  static getInstance(): WarrantyService {
    if (!WarrantyService.instance) {
      WarrantyService.instance = new WarrantyService()
    }
    return WarrantyService.instance
  }

  /**
   * Submits a warranty registration to the API
   * @param {WarrantyRegistrationInput} data - The warranty registration details
   * @returns {Promise<Warranty>} The created warranty record
   */
  async submitWarrantyRegistration(data: WarrantyRegistrationInput) {
    return this.post<Warranty>('/api/warranty', data)
  }

  /**
   * Gets list of warranties (Admin)
   */
  async getWarranties(params?: Record<string, any>) {
    const query = params ? `?${new URLSearchParams(params).toString()}` : ''
    return this.get<{ data: Warranty[]; count: number; pageSize: number; page: number }>(`/api/admin/warranties${query}`)
  }

  /**
   * Gets a specific warranty (Admin)
   */
  async getWarranty(id: string) {
    return this.get<Warranty>(`/api/admin/warranties/${id}`)
  }
}

export const warrantyService = WarrantyService.getInstance()
