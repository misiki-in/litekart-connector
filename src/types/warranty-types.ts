export type Warranty = {
	id: string
	storeId: string
	fullName: string
	email: string
	phone: string
	orderId: string
	purchaseDate: string
	addressLine1?: string
	addressLine2?: string
	city?: string
	state?: string
	zipCode?: string
	country?: string
	notes?: string
	status?: string
	createdAt?: string
	updatedAt?: string
}

export type WarrantyRegistrationInput = {
	fullName: string
	email: string
	phone: string
	orderId: string
	purchaseDate: string
	addressLine1?: string
	addressLine2?: string
	city?: string
	state?: string
	zipCode?: string
	country?: string
	notes?: string
}
