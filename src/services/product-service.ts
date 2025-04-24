import type { PaginatedResponse, Product } from '../types'
import { BaseService } from './base.service'

/**
 * Service for managing products
 * This class can be moved to another project easily
 */
export class ProductService extends BaseService {
	private static instance: ProductService

	/**
	 * Get the singleton instance
	 */
	static getInstance(): ProductService {
		if (!ProductService.instance) {
			ProductService.instance = new ProductService()
		}
		return ProductService.instance
	}

	async listFeaturedProducts({ page = 1, sort = '-createdAt' }) {
		const search = '' // "Featured"
		return this.get(`/api/products?page=${page}&search=${search}&sort=${sort}`) as Promise<
			PaginatedResponse<[Product]>
		>
	}

	async listTrendingProducts({ page = 1, search = '', sort = '-createdAt' }) {
		const q = 'Trending'
		return this.get(`/api/products?page=${page}&search=${search}&sort=${sort}`) as Promise<
			PaginatedResponse<[Product]>
		>
	}

	async listRelatedProducts({ page = 1, categoryId = '', sort = '-createdAt' }) {
		return this.get(`/api/products?page=${page}&categories=${categoryId}&sort=${sort}`) as Promise<
			PaginatedResponse<[Product]>
		>
	}

	async list({ page = 1, search = '', sort = '-createdAt' }) {
		return this.get(`/api/products?page=${page}&search=${search}&sort=${sort}`) as Promise<
			PaginatedResponse<[Product]>
		>
	}

	async getOne(slug: string) {
		return this.get(`/api/products/${slug}`) as Promise<PaginatedResponse<Product>>
	}

	async addReview({
		productId,
		variantId,
		review,
		rating,
		uploadedImages
	}: {
		productId: string
		variantId: string
		review: string
		rating: number
		uploadedImages: string[]
	}) {
		return this.post('/api/products/ratings-and-reviews', {
			productId,
			variantId,
			review,
			rating,
			uploadedImages
		})
	}

	async fetchReels() {
		try {
			const res = await this.get('api/reels')
			return res
		} catch (e: unknown) {
			const error = e as { status?: string | number; data?: { message?: string }; message?: string }
			throw new Error(error.data?.message || error.message || 'Failed to fetch reels')
		}
	}
}

// // Use singleton instance
export const productService = ProductService.getInstance()

// // Export the instance methods for backward compatibility
// export const listFeaturedProducts = () => productService.listFeaturedProducts({})
