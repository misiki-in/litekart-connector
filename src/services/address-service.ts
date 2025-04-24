import type { Address, PaginatedResponse } from '../types'
import { BaseService } from './base.service'

/**
 * Service for managing address
 * This class can be moved to another project easily
 */
export class AddressService extends BaseService {
	private static instance: AddressService

	/**
	 * Get the singleton instance
	 */
	static getInstance(): AddressService {
		if (!AddressService.instance) {
			AddressService.instance = new AddressService()
		}
		return AddressService.instance
	}
	async list({ page = 1, q = '', sort = '-createdAt', user = '' }) {
		return this.get(`/api/address?page=${page}&q=${q}&sort=${sort}&user=${user}`) as Promise<
			PaginatedResponse<Address>
		>
	}

	async fetchAddress(id: string) {
		return this.get(`/api/address/${id}`) as Promise<Address>
	}

	async saveAddress(address: Omit<Address, 'id'>) {
		return this.post('/api/address/me', address) as Promise<Address>
	}

	async editAddress(id: string, address: Partial<Address>) {
		return this.put(`/api/address/me/${id}`, address) as Promise<Address>
	}

	async deleteAddress(id: string) {
		return this.delete(`/api/address/${id}`)
	}
}

// // Use singleton instance
export const addressService = AddressService.getInstance()
