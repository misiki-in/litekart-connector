import type { Coupon, PaginatedResponse } from './../types'

import { BaseService } from './base.service'

export class CouponService extends BaseService {
  private static instance: CouponService

  /**
   * Get the singleton instance
   */
  static getInstance(): CouponService {
    if (!CouponService.instance) {
      CouponService.instance = new CouponService()
    }
    return CouponService.instance
  }
  async listCoupons({ page = 1, q = '', sort = '-createdAt' }) {
    return this.get<PaginatedResponse<Coupon>>(
      `/api/coupons?page=${page}&q=${q}&sort=${sort}`
    )
  }

  async searchCoupons({ page = 1, q = '', sort = '-createdAt' }) {
    return this.get<PaginatedResponse<Coupon>>(
      `/api/coupons?page=${page}&q=${q}&sort=${sort}`
    )
  }

  async getCoupon(id: string) {
    return this.get<Coupon>(`/api/coupons/${id}`)
  }

  async createCoupon(coupons: Omit<Coupon, 'id'>) {
    return this.post<Coupon>('/api/coupons', coupons)
  }

  async patchCoupon(id: string, coupons: Partial<Coupon>) {
    return this.put<Coupon>(`/api/coupons/${id}`, coupons)
  }

  async deleteCoupon(id: string) {
    return this.delete<Coupon>(`/api/coupons/${id}`)
  }
}

// // Use singleton instance
export const couponService = CouponService.getInstance()
