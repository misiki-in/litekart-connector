import type { Address, Cart } from './../types'
const REGION_ID = ''

import { BaseService } from './base.service'

export class CartService extends BaseService {
  private static instance: CartService

  /**
   * Get the singleton instance
   */
  static getInstance(): CartService {
    if (!CartService.instance) {
      CartService.instance = new CartService()
    }
    return CartService.instance
  }
  async fetchCartData() {
    return this.get('/api/cart') as Promise<Cart>
  }

  async refereshCart() {
    const cartId = localStorage.getItem('cart_id') || null
    return this.get(`/api/carts/refresh/${cartId}`) as Promise<Cart>
  }

  //  async fetchRefreshCart(cartId: string) {
  // 	return this.get<Cart>(`/api/carts/${cartId}`)
  // }

  async getCartByCartId(cartId: string) {
    return this.get(`/api/carts/${cartId}`) as Promise<Cart>
  }

  async addToCart({
    productId,
    variantId,
    qty,
    cartId,
    lineId
  }: {
    productId: string
    variantId: string
    qty: number
    cartId?: string | null
    lineId: string | null
  }) {
    if (cartId === undefined || cartId === 'undefined') {
      cartId = localStorage.getItem('cart_id') || null
    }
    const body = { productId, variantId, qty }

    if (!cartId) {
      const cartRes = (await this.post('/api/carts', {
        cartId,
        productId,
        variantId,
        qty
      })) as Cart

      // console.log(cartRes)
      cartId = cartRes?.id
    }
    localStorage.setItem('cart_id', cartId)
    let res: any = {}
    if (body.qty === -9999999) {
      res = await this.delete(`/api/carts/${cartId}/line-items/${lineId}`)
    } else {
      if (lineId) {
        res = (await this.post(
          `/api/carts/${cartId}/line-items/${lineId}`,
          body
        )) as Cart
      } else {
        res = (await this.post(`/api/carts/${cartId}/line-items`, body)) as Cart
      }
      cartId = res?.cartId || res?.id
    }
    if (cartId) {
      res = (await this.get(`/api/carts/${cartId}`)) as Cart
      // await postKitcommerceApi(`carts/${cartId}`, { customer_id: res?.id })

      localStorage.setItem('cart_id', cartId)
    }
    return res
    // return this.post<Cart>(`/api/carts`, { cartId, productId, variantId, qty })
  }

  async removeCart({
    cartId,
    lineId = null
  }: {
    cartId: string
    lineId: string | null
  }) {
    // console.log('🚀 ~ addToCartService= ~ productId variantId qty lineId:', lineId)
    if (cartId === undefined || cartId === 'undefined') {
      cartId = localStorage.getItem('cart_id') || null
    }

    let res: any = {}
    if (!cartId) {
      const cartRes = (await this.post('/api/carts', {
        region_id: REGION_ID
      })) as Cart
      cartId = cartRes?.id
    }
    localStorage.setItem('cart_id', cartId)

    if (lineId) {
      res = await this.delete(`/api/carts/${cartId}/line-items/${lineId}`)
    }
    if (cartId) {
      res = (await this.post(`/api/carts/${cartId}`, {
        customer_id: res?.id
      })) as Cart
    }

    return res || {}
  }

  async applyCoupon({
    cartId,
    couponCode
  }: {
    cartId: string
    couponCode: string
  }) {
    return this.post(`/api/cart/apply-coupon/${cartId}`, {
      couponCode
    }) as Promise<Cart>
  }

  async removeCoupon() {
    const cartId = localStorage.getItem('cart_id') || null
    return this.post(`/api/cart/remove-coupon/${cartId}`, {}) as Promise<Cart>
  }

  async updateCart2({
    storeId,
    cartId,
    email,
    billingAddress,
    customer_id,
    shippingAddress,
    phone,
    isBillingAddressSameAsShipping
  }: any) {
    if (!cartId || cartId === undefined || cartId === 'undefined') {
      cartId = localStorage.getItem('cart_id') || null
    }

    const body: any = {
      customer_id
    }
    if (email) {
      body.email = email
    }
    if (phone) {
      body.phone = phone
    }
    let address_data
    if (shippingAddress) {
      body.shipping_address = {
        id: shippingAddress?.id,
        firstName: shippingAddress?.firstName,
        lastName: shippingAddress?.lastName,
        address_1: shippingAddress?.address_1,
        address_2: shippingAddress?.address_2,
        city: shippingAddress?.city,
        landmark: shippingAddress?.landmark,
        zip: shippingAddress?.zip,
        state: shippingAddress?.state,
        countryCode: shippingAddress?.countryCode || 'IN',
        phone: shippingAddress?.phone,
        email: shippingAddress?.email
      }
      address_data = (await this.post(
        '/api/address',
        body.shipping_address
      )) as Address
      delete body.shipping_address
      body.shippingAddressId = address_data?.id
    }
    if (billingAddress && !isBillingAddressSameAsShipping) {
      body.billing_address = {
        id:
          shippingAddress?.id === billingAddress?.id
            ? 'new'
            : shippingAddress
            ? billingAddress?.id
            : 'new',
        firstName: billingAddress?.firstName,
        lastName: billingAddress?.lastName,
        address_1: billingAddress?.address_1,
        address_2: billingAddress?.address_2,
        city: billingAddress?.city,
        landmark: billingAddress?.landmark,
        zip: billingAddress?.zip,
        state: billingAddress?.state,
        countryCode: billingAddress?.countryCode || 'IN',
        phone: billingAddress?.phone,
        email: billingAddress?.email
      }
      address_data = (await this.post(
        '/api/address',
        body.billing_address
      )) as Address
      delete body.billing_address
      // console.log('🚀 ~ CartService ~ updateCart2 ~ address_data:', address_data)
      body.billingAddressId = address_data?.id
    } else if (shippingAddress && isBillingAddressSameAsShipping) {
      body.billingAddressId = body.shippingAddressId
    }

    if (cartId) {
      const res = (await this.patch(`/api/carts/${cartId}`, body)) as Cart

      // Use type assertion to avoid TypeScript error
      ;(res as any).shipping_address = address_data

      return res || {}
    }
  }

  async completeCart(cart_id: string) {
    return this.post(`/api/carts/${cart_id}/complete`, {
      id: cart_id
    }) as Promise<Cart>
  }

  async updateCart({
    qty,
    cartId,
    lineId = null,
    productId,
    variantId,
    isSelectedForCheckout
  }: any) {
    // console.log('🚀 ~ addToCartService= ~ productId variantId qty lineId:', qty, lineId, productId, variantId)
    if (!cartId || cartId === undefined || cartId === 'undefined') {
      cartId = localStorage.getItem('cart_id') || null
    }

    let res: any = {}
    if (!cartId) {
      const cartRes = (await this.post('/api/carts', {
        region_id: REGION_ID
      })) as Cart
      cartId = cartRes?.id
    }
    localStorage.setItem('cart_id', cartId)

    if (lineId) {
      res = (await this.post(`/api/carts/${cartId}/line-items`, {
        qty: qty,
        id: lineId,
        productId,
        variantId,
        isSelectedForCheckout
      })) as Cart
    }
    // console.log(res)
    // if (cartId) {
    // 	await postKitcommerceApi(`carts/${cartId}`, { customer_id: res?.id })
    // }

    return res || {}
    // return this.post<Cart>(`/api/carts/${cartId}/line-items`, { qty: qty, id: lineId, productId, variantId })
  }

  async updateShippingRate({
    cartId,
    shippingRateId
  }: {
    cartId: string
    shippingRateId: string
  }) {
    const updates = { shippingRateId }
    return this.patch(`/api/carts/${cartId}`, updates) as Promise<Cart>
  }
}

// // Use singleton instance
export const cartService = CartService.getInstance()
