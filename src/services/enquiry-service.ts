import type { Enquiry } from './../types'

import { BaseService } from './base.service'

export class EnquiryService extends BaseService {
  private static instance: EnquiryService

  /**
   * Get the singleton instance
   */
  static getInstance(): EnquiryService {
    if (!EnquiryService.instance) {
      EnquiryService.instance = new EnquiryService()
    }
    return EnquiryService.instance
  }
  async create({
    name,
    email,
    phone,
    message,
    productId
  }: {
    name: string
    email: string
    phone: string
    message: string
    productId: string
  }) {
    return this.post<Enquiry>('/api/enquiry', {
      name,
      email,
      phone,
      message,
      productId
    })
  }
}

// // Use singleton instance
export const enquiryService = EnquiryService.getInstance()
