import type { PaginatedResponse, Order } from './../types'

import { BaseService } from './base.service'

export class OrderService extends BaseService {
  private static instance: OrderService

  /**
   * Get the singleton instance
   */
  static getInstance(): OrderService {
    if (!OrderService.instance) {
      OrderService.instance = new OrderService()
    }
    return OrderService.instance
  }
  async list({ page = 1, q = '', sort = '-createdAt' }) {
    return this.get(`/api/orders?page=${page}&q=${q}&sort=${sort}`) as Promise<
      PaginatedResponse<Order>
    >
  }

  async listOrdersByParent({
    orderNo,
    cartId
  }: {
    orderNo: string | null
    cartId: string | null
  }) {
    return this.get(
      `/api/orders/list-by-parent?order_no=${orderNo}&cart_id=${cartId}`
    ) as Promise<PaginatedResponse<Order>>
  }

  async fetchOrder(id: string) {
    return this.get(`/api/orders/${id}`) as Promise<Order>
  }

  async getOrder(orderNo: string) {
    return this.get(`/api/orders/${orderNo}`) as Promise<Order>
  }

  async fetchTrackOrder(id: string) {
    return this.get(`/api/orders/list-by-parent?id=${id}`) as Promise<
      PaginatedResponse<Order>
    >
  }

  async paySuccessPageHit(orderId: string) {
    return this.get(`/api/orders/${orderId}`) as Promise<Order>
  }

  async codCheckout({
    address,
    cartId,
    origin,
    paymentMethod,
    paymentProviderId,
    prescription
  }: any) {
    return this.post<Order>(`/api/carts/${cartId}/payment-sessions`, {
      provider_id: paymentProviderId
    })
  }

  async cashfreeCheckout({
    address,
    paymentMethod,
    prescription,
    origin
  }: any) {
    return this.get('/api/orders/me') as Promise<Order>
  }

  async razorpayCheckout({
    address,
    paymentMethod,
    prescription,
    origin
  }: any) {
    return this.get('/api/orders/me') as Promise<Order>
  }

  async stripeCheckout({ address, paymentMethod, prescription, origin }: any) {
    return this.get('/api/orders/me') as Promise<Order>
  }

  async razorCapture({ rpPaymentId, rpOrderId, origin }: any) {
    return this.get('/api/orders/me') as Promise<Order>
  }

  async listPublic() {
    return this.get('/api/orders/public/list') as Promise<
      PaginatedResponse<Order>
    >
  }

  async getOrderByEmailAndOTP({ email, otp }: { email: string; otp: string }) {
    return this.get(
      `/api/orders-public/list?otp=${otp}&email=${email}&sort=-createdAt`
    ) as Promise<PaginatedResponse<Order>>
  }

  async buyAgain() {
    return this.get('/api/orders/buy-again') as Promise<
      PaginatedResponse<Order>
    >
  }
}

// Use singleton instance
export const orderService = OrderService.getInstance()
