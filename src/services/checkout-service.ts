import type { Cart, Checkout } from './../types'

import { BaseService } from './base.service'

/**
 * CheckoutService provides functionality for managing checkout processes
 * in the Litekart platform.
 *
 * This service helps with:
 * - Processing payments through various payment gateways
 * - Managing checkout flows for different payment methods
 * - Handling shipping rates and order completion
 */
export class CheckoutService extends BaseService {
  private static instance: CheckoutService

  /**
   * Get the singleton instance
   *
   * @returns {CheckoutService} The singleton instance of CheckoutService
   */
  static getInstance(): CheckoutService {
    if (!CheckoutService.instance) {
      CheckoutService.instance = new CheckoutService()
    }
    return CheckoutService.instance
  }

  /**
   * Initiates Razorpay checkout process
   *
   * @param {Object} params - Parameters for Razorpay checkout
   * @param {string} params.cartId - The cart ID for checkout
   * @param {string} params.origin - The origin URL for callbacks
   * @returns {Promise<Cart>} The cart with Razorpay payment information
   * @api {post} /api/checkout/razorpay Razorpay checkout
   *
   * @example
   * // Start Razorpay checkout
   * const checkoutData = await checkoutService.checkoutRazorpay({
   *   cartId: '123',
   *   origin: 'https://example.com'
   * });
   */
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

  /**
   * Initiates Cash on Delivery checkout process
   *
   * @param {Object} params - Parameters for COD checkout
   * @param {string} params.cartId - The cart ID for checkout
   * @param {string} params.origin - The origin URL for callbacks
   * @returns {Promise<Cart>} The cart with COD payment information
   * @api {post} /api/checkout/cod COD checkout
   *
   * @example
   * // Start COD checkout
   * const checkoutData = await checkoutService.checkoutCOD({
   *   cartId: '123',
   *   origin: 'https://example.com'
   * });
   */
  async checkoutCOD({ cartId, origin }: { cartId: string; origin: string }) {
    return this.post('/api/checkout/cod', { cartId, origin }) as Promise<Cart>
  }

  /**
   * Captures a Razorpay payment after authorization
   *
   * @param {Object} params - Parameters for capturing Razorpay payment
   * @param {string} params.razorpay_order_id - Razorpay order ID
   * @param {string} params.razorpay_payment_id - Razorpay payment ID
   * @returns {Promise<any>} The capture response
   * @api {post} /api/checkout/razorpay-capture Capture Razorpay payment
   *
   * @example
   * // Capture Razorpay payment
   * const captureResponse = await checkoutService.captureRazorpayPayment({
   *   razorpay_order_id: 'order_123',
   *   razorpay_payment_id: 'pay_456'
   * });
   */
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

  /**
   * Initiates PhonePe checkout process
   *
   * @param {Object} params - Parameters for PhonePe checkout
   * @param {string} params.cartId - The cart ID for checkout
   * @param {string} params.email - Customer email
   * @param {string} params.phone - Customer phone number
   * @param {string} params.origin - The origin URL for callbacks
   * @returns {Promise<any>} The PhonePe checkout response
   * @api {post} /api/checkout/phonepe PhonePe checkout
   *
   * @example
   * // Start PhonePe checkout
   * const checkoutData = await checkoutService.checkoutPhonepe({
   *   cartId: '123',
   *   email: 'customer@example.com',
   *   phone: '9876543210',
   *   origin: 'https://example.com'
   * });
   */
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

  /**
   * Retrieves shipping rates for a cart
   *
   * @param {Object} params - Parameters for getting shipping rates
   * @param {string} params.cartId - The cart ID to get shipping rates for
   * @returns {Promise<Checkout>} The shipping rates information
   * @api {get} /api/shipping-rates/:cartId Get shipping rates
   *
   * @example
   * // Get shipping rates for a cart
   * const shippingRates = await checkoutService.getShippingRates({
   *   cartId: '123'
   * });
   */
  async getShippingRates({ cartId }: { cartId: string }) {
    return this.get(`/api/shipping-rates/${cartId}`) as Promise<Checkout>
  }

  /**
   * Creates a new Checkout
   *
   * @param {any} data - The data to create
   * @returns {Promise<any>} The created checkout
   * @api {post} /api/checkout Create checkout
   *
   * @example
   * // Example usage
   * const newCheckout = await checkoutService.createAffirmPayOrder({
   *   // required fields
   * });
   */

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
