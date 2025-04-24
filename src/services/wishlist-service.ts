import type { Wishlist } from './../types'

import { BaseService } from './base.service'

export class WishlistService extends BaseService {
  private static instance: WishlistService

  /**
   * Get the singleton instance
   */
  static getInstance(): WishlistService {
    if (!WishlistService.instance) {
      WishlistService.instance = new WishlistService()
    }
    return WishlistService.instance
  }
  // Fetch the user's wishlist with optional search, sorting, and pagination
  async fetchWishlist({ q = '', sort = '', page = 1 }) {
    return this.get<Wishlist>('/api/wishlists/me')
  }

  // Check if a specific product is in the user's wishlist
  async checkWishlist({
    productId,
    variantId
  }: {
    productId: string
    variantId: string
  }) {
    return this.get<boolean>(
      `/api/wishlists/me/check?productId=${productId}&variantId=${variantId}`
    )
  }

  // Toggle a product's presence in the user's wishlist
  async toggleWishlist({
    productId,
    variantId
  }: {
    productId: string
    variantId: string
  }) {
    return this.post<Wishlist>('/api/wishlists/me/toggle', {
      productId,
      variantId
    })
  }
}

// Use singleton instance
export const wishlistService = WishlistService.getInstance()
