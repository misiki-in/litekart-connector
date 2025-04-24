import type { User } from '../types'
import { BaseService } from './base.service'

export class UserService extends BaseService {
	private static instance: UserService

	/**
	 * Get the singleton instance
	 */
	static getInstance(): UserService {
		if (!UserService.instance) {
			UserService.instance = new UserService()
		}
		return UserService.instance
	}

	async getMe() {
		return this.get('/api/users/me') as Promise<User>
	}

	async getUser(id: string) {
		return this.get(`/api/users/${id}`) as Promise<User>
	}

	async signup({
		firstName,
		lastName,
		phone,
		email,
		password,
		passwordConfirmation,
		cartId = null,
		origin
	}: {
		firstName: string
		lastName: string
		phone: string
		email: string
		password: string
		passwordConfirmation: string | null
		cartId?: string | null
		origin: string
	}) {
		try {
			return this.post<User>('/api/auth/signup', {
				firstName,
				lastName,
				phone,
				email,
				password,
				cartId,
				origin
			})
		} catch (e: unknown) {
			const errorMessage = e instanceof Error ? e.message : 'Failed to signup'
			throw new Error(errorMessage)
		}
	}

	async joinAsVendor({
		firstName,
		lastName,
		businessName,
		phone,
		email,
		password,
		passwordConfirmation,
		cartId = null,
		origin
	}: {
		firstName: string
		lastName: string
		businessName: string
		phone: string
		email: string
		password: string
		passwordConfirmation: string
		cartId?: string | null
		origin: string
	}) {
		return this.post<User>('/api/auth/join-as-vendor', {
			firstName,
			lastName,
			businessName,
			phone,
			email,
			password,
			cartId,
			origin
		})
	}

	async login({
		email,
		password,
		cartId = null
	}: {
		email: string
		password: string
		cartId?: string | null
	}) {
		return this.post<User>('/api/auth/login', { email, password })
	}

	async forgotPassword({ email, referrer }: { email: string; referrer: string }) {
		return this.post<User>('/api/auth/forgot-password', {
			email,
			referrer
		})
	}

	async changePassword(body: { old: string; password: string }) {
		return this.post<User>('/api/auth/change-password', body)
	}

	async resetPassword({
		userId,
		token,
		password
	}: {
		userId: string
		token: string
		password: string
	}) {
		return this.post<User>('/api/auth/reset-password', {
			userId,
			token,
			password
		})
	}

	async getOtp({
		firstName,
		lastName,
		phone,
		email,
		password,
		passwordConfirmation
	}: {
		firstName: string
		lastName: string
		phone: string
		email: string
		password: string
		passwordConfirmation: string
	}) {
		return this.post<{ otp: string }>('/api/auth/get-otp', {
			firstName,
			lastName,
			phone,
			email,
			password,
			passwordConfirmation
		})
	}

	async verifyOtp({ phone, otp }: { phone: string; otp: string }) {
		return this.post<User>('/api/auth/verify-otp', { phone, otp })
	}

	async logout() {
		return this.delete('/api/auth/logout')
	}

	async updateProfile({
		id,
		firstName,
		lastName,
		email,
		phone,
		avatar
	}: {
		id: string
		firstName: string
		lastName: string
		email: string
		phone: string
		avatar?: string
	}) {
		return this.put(`/api/admin/users/${id}`, {
			firstName,
			lastName,
			email,
			phone,
			avatar
		})
	}

	async checkEmail(email: string) {
		try {
			const res = await this.post('/api/users/check-email', { email })
			return res
		} catch (e: unknown) {
			const error = e as { message?: string }
			throw new Error(error?.message || 'Failed to check email')
		}
	}

	async deleteUser(id: string) {
		return this.delete(`/api/delete/user/${id}`)
	}
}

// Use singleton instance
export const userService = UserService.getInstance()
