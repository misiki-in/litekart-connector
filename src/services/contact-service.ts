import type { Contact } from './../types'

import { BaseService } from './base.service'

export class ContactService extends BaseService {
  private static instance: ContactService

  /**
   * Get the singleton instance
   */
  static getInstance(): ContactService {
    if (!ContactService.instance) {
      ContactService.instance = new ContactService()
    }
    return ContactService.instance
  }
  async submitContactUsForm({
    name,
    email,
    message
  }: {
    name: string
    email: string
    message: string
  }) {
    return this.post<Contact>('/api/contact-us', { name, email, message })
  }
}

// // Use singleton instance
export const contactService = ContactService.getInstance()
