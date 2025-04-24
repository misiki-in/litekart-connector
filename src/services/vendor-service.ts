import type { PaginatedResponse, Product, Vendor } from './../types'

import { BaseService } from './base.service'

export class VendorService extends BaseService {
  private static instance: VendorService

  /**
   * Get the singleton instance
   */
  static getInstance(): VendorService {
    if (!VendorService.instance) {
      VendorService.instance = new VendorService()
    }
    return VendorService.instance
  }
  // Save a new vendor
  async save(data: Partial<Vendor>) {
    return this.post('/api/vendors', data) as Promise<Vendor>
  }

  // Update vendor details by ID
  async update(data: Partial<Vendor> & { id: string }) {
    return this.patch(`/api/vendors/${data.id}`, data) as Promise<Vendor>
  }

  // List vendors with optional pagination and query
  async list({ page = 1, q = '', sort = '-createdAt' }) {
    return this.get(`/api/vendors?page=${page}&q=${q}&sort=${sort}`) as Promise<
      PaginatedResponse<Vendor>
    >
  }

  // Get vendor details by ID
  async getVendor(id: string) {
    return this.get(`/api/vendors/${id}`) as Promise<Vendor>
  }

  // Fetch current vendor's details
  async fetchMyVendorDetails() {
    return this.get('/api/vendors/me') as Promise<Vendor>
  }

  // Fetch vendor dashboard summary data
  async fetchDashboard() {
    return this.get('/api/dashboard/summary') as Promise<Vendor>
  }

  // Fetch all products of a specific vendor by vendor ID
  async fetchProductsOfVendor(vendorId: string) {
    return this.get(`/api/products?vendor_id=${vendorId}`) as Promise<Product[]>
  }

  // Fetch all products of a specific vendor by vendor ID
  async getAllVendorRatings(vendorId: string) {
    return this.get(
      `/api/vendors/all-ratings?vendor_id=${vendorId}`
    ) as Promise<Product[]>
  }
}

// Use singleton instance
export const vendorService = VendorService.getInstance()
