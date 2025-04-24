import type { User, verifyEmail } from '../types'
import { BaseService } from './base.service'

/**
 * Service for managing address
 * This class can be moved to another project easily
 */
export class AuthService extends BaseService {
	private static instance: AuthService

	/**
	 * Get the singleton instance
	 */
	static getInstance(): AuthService {
		if (!AuthService.instance) {
			AuthService.instance = new AuthService()
		}
		return AuthService.instance
	}
	async getMe() {
		return this.get('/api/admin/users/me') as Promise<User>
	}

	async get(id: string) {
		return this.get('/api/users/' + id) as Promise<User>
	}

	async verifyEmail(email: string, token: string) {
		return this.post('/api/auth/verify-email', { email, token }) as Promise<verifyEmail>
	}

	async signup({
		firstName,
		lastName,
		phone,
		email,
		password,
		passwordConfirmation,
		cartId = null
	}: {
		firstName: string
		lastName: string
		phone: string
		email: string
		password: string
		passwordConfirmation: string
		cartId?: string | null
	}) {
		return this.post('/api/auth/signup', {
			firstName,
			lastName,
			phone,
			email,
			password,
			cartId
		}) as Promise<User>
	}

	async joinAsVendor({
		firstName,
		lastName,
		businessName,
		phone,
		email,
		password,
		cartId = null,
		role,
		origin
	}: {
		firstName: string
		lastName: string
		businessName: string
		phone: string
		email: string
		password: string
		cartId?: string | null
		role: string
		origin: string
	}) {
		return this.post('/api/auth/join-as-vendor', {
			firstName,
			lastName,
			businessName,
			phone,
			email,
			password,
			cartId,
			role,
			origin
		}) as Promise<User>
	}

	async joinAsAdmin({
		firstName,
		lastName,
		businessName,
		phone,
		email,
		password,
		origin
	}: {
		firstName: string
		lastName: string
		businessName: string
		phone: string
		email: string
		password: string
		origin: string
	}) {
		return this.post('/api/auth/join-as-admin', {
			firstName,
			lastName,
			businessName,
			phone,
			email,
			password,
			origin
		}) as Promise<User>
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
		return this.post('/api/auth/login', { email, password, cartId }) as Promise<User>
	}

	async forgotPassword({ email, referrer }: { email: string; referrer: string }) {
		return this.post('/api/auth/forgot-password', { email, referrer }) as Promise<User>
	}

	async changePassword(body: { old: string; password: string }) {
		return this.post('/api/admin/auth/change-password', body) as Promise<User>
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
		return this.post('/api/auth/reset-password', {
			userId,
			token,
			password
		}) as Promise<User>
	}

	async getOtp({ phone }: { phone: string }) {
		return this.post('/api/auth/get-otp', { phone }) as Promise<User>
	}

	async verifyOtp({ phone, otp }: { phone: string; otp: string }) {
		return this.post('/api/auth/verify-otp', { phone, otp }) as Promise<User>
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
		return this.put('/api/users/' + id, {
			firstName,
			lastName,
			email,
			phone,
			avatar
		}) as Promise<User>
	}
}

// // Use singleton instance
export const authService = AuthService.getInstance()
