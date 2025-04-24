import type { Cart, Checkout } from './../types'

import { BaseService } from './base.service'

export class CheckoutService extends BaseService {
  private static instance: CheckoutService

  /**
   * Get the singleton instance
   */
  static getInstance(): CheckoutService {
    if (!CheckoutService.instance) {
      CheckoutService.instance = new CheckoutService()
    }
    return CheckoutService.instance
  }
  async checkoutRazorpay({
    cartId,
    origin
  }: {
    cartId: string
    origin: string
  }) {
    return this.post('/api/checkout/razorpay', {
      cartId,
      origin
    }) as Promise<Cart>
  }
  async checkoutCOD({ cartId, origin }: { cartId: string; origin: string }) {
    return this.post('/api/checkout/cod', { cartId, origin }) as Promise<Cart>
  }
  async captureRazorpayPayment({
    razorpay_order_id,
    razorpay_payment_id
  }: {
    razorpay_order_id: string
    razorpay_payment_id: string
  }) {
    return this.post('/api/checkout/razorpay-capture', {
      razorpay_order_id,
      razorpay_payment_id
    })
  }
  async checkoutPhonepe({
    cartId,
    email,
    phone,
    origin
  }: {
    cartId: string
    email: string
    phone: string
    origin: string
  }) {
    return this.post('/api/checkout/phonepe', { cartId, email, phone, origin })
  }
  async capturePhonepePayment({
    phonepe_order_id,
    phonepe_payment_id
  }: {
    phonepe_order_id: string
    phonepe_payment_id: string
  }) {
    return this.post('/api/checkout/phonepe-capture', {
      phonepe_order_id,
      phonepe_payment_id
    })
  }
  async checkoutPaypal({
    cartId,
    origin,
    return_url
  }: {
    cartId: string
    origin: string
    return_url: string
  }) {
    return this.post('/api/checkout/paypal', { cartId, origin, return_url })
  }
  async checkoutStripe({ cartId, origin }: { cartId: string; origin: string }) {
    return this.post('/api/checkout/stripe', { cartId, origin })
  }
  async checkoutStripeCapture({
    order_no,
    pg,
    payment_session_id,
    storeId
  }: {
    order_no: string
    pg: string
    payment_session_id: string
    storeId: string
  }) {
    return this.post('/api/checkout/stripe-capture', {
      order_no,
      pg,
      payment_session_id,
      storeId
    })
  }
  async getShippingRates({ cartId }: { cartId: string }) {
    return this.get(`/api/shipping-rates/${cartId}`) as Promise<Checkout>
  }

  async createAffirmPayOrder({
    cartId,
    addressId,
    origin,
    storeId,
    paymentMethodId
  }: {
    cartId: string
    addressId: string
    origin: string
    storeId: string
    paymentMethodId: string
  }) {
    return this.post('/api/affirm-checkout/create-order', {
      cartId,
      addressId,
      origin,
      storeId,
      paymentMethodId
    })
  }

  async cancelAffirmOrder({
    orderId,
    storeId,
    origin
  }: {
    orderId: string
    storeId: string
    origin: string
  }) {
    return this.post('/api/checkout/affirm/cancel-order', {
      orderId,
      storeId,
      origin
    })
  }

  async confirmAffirmOrder({
    affirmToken,
    orderId,
    storeId,
    origin
  }: {
    affirmToken: string
    orderId: string
    storeId: string
    origin: string
  }) {
    return this.post('/api/checkout/affirm/confirm-order', {
      affirmToken,
      orderId,
      storeId,
      origin
    })
  }
}

// // Use singleton instance
export const checkoutService = CheckoutService.getInstance()
