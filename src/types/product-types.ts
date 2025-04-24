export type Product = {
	id: string
	active: boolean
	status: ProductStatus
	type: string
	vendorId: string
	categoryId: string | null
	currency: string | null
	instructions: string | null
	description: string | null
	hsnCode: string | null
	images: string | null
	featuredImage: string | null
	thumbnail: string | null
	keywords: string | null
	link: string | null
	metaTitle: string | null
	metaDescription: string | null
	title: string
	subtitle: string | null
	popularity: number
	rank: number
	slug: string | null

	// Dates and Measurements
	expiryDate: string | null
	weight: number | null
	mfgDate: string | null

	// Pricing and Inventory
	mrp: number
	price: number
	costPerItem: number
	sku: string | null
	stock: number
	allowBackorder: boolean
	manageInventory: boolean

	// Shipping Dimensions
	shippingWeight: number | null
	shippingHeight: number | null
	shippingLen: number | null
	shippingWidth: number | null

	// Product Dimensions
	height: number | null
	width: number | null
	len: number | null

	// Additional Details
	barcode: string | null
	shippingCost: number | null
	returnAllowed: boolean
	replaceAllowed: boolean

	// Metadata and References
	originCountry: string | null
	weightUnit: string
	dimensionUnit: string
	metadata: Record<string, unknown> | null
	collectionId: string | null

	// Variants
	options?: { id: string; title: string; type: string; values: { id: string; value: string }[] }[]
	variants?: Variant[]
}

// Enums
export enum ProductStatus {
	DRAFT = 'draft',
	PROPOSED = 'proposed',
	PUBLISHED = 'published',
	REJECTED = 'rejected'
}

export type Variant = {
	id: string
	title: string
	productId: string
	sku: string | null
	barcode: string | null
	batchNo: string | null
	stock: number
	allowBackorder: boolean
	manageInventory: boolean
	hsCode: string | null
	originCountry: string | null
	midCode: string | null
	material: string | null
	weight: number | null
	length: number | null
	height: number | null
	width: number | null
	price: number
	costPerItem: number
	mfgDate: string | null
	expiryDate: string | null
	returnAllowed: boolean
	replaceAllowed: boolean
	mrp: number
	img: string | null
	description: string | null
	storeId: string | null
	len: number | null
	rank: number
	shippingWeight: number | null
	shippingHeight: number | null
	shippingLen: number | null
	shippingWidth: number | null
	shippingCost: number | null
	metadata: Record<string, unknown> | null
	variantRank: number
	options: { id: string; optionId: string; value: string; variantId: string }[]
}

export type ProductAttribute = {
	id: string
	productId: string
	title: string
	value: string
	rank: number
	createdAt: Date
	updatedAt: Date
}

export type Category = {
	id: string // Unique identifier for the category
	isActive: boolean // Indicates if the category is active
	isInternal: boolean // Indicates if the category is internal
	isMegamenu: boolean // Indicates if the category is part of a megamenu
	thumbnail: string | null // Optional thumbnail image URL
	path: string | null // Optional URL path for the category
	level: number | null // Optional level in the category hierarchy
	description: string | null // Optional description of the category
	isFeatured: boolean // Indicates if the category is featured
	keywords: string | null // Optional keywords for SEO
	rank: number // Rank for sorting, defaulting to 0
	link: string | null // Optional link associated with the category
	metaDescription: string | null // Optional meta description for SEO
	metaKeywords: string | null // Optional meta keywords for SEO
	metaTitle: string | null // Optional meta title for SEO
	name: string // Name of the category
	parentCategoryId: string | null // Optional reference to the parent category
	store: string | null // Optional store associated with the category
	slug: string | null // Optional URL-friendly name
	userId: string // User ID of the creator or owner
	activeProducts: number // Count of active products, defaults to 0
	inactiveProducts: number // Count of inactive products, defaults to 0
	createdAt: string // Timestamp of creation
	updatedAt: string // Timestamp of last update
}

export type Collection = {
	id: string // Unique identifier for the collection
	name: string // Name of the collection
	slug: string // URL-friendly slug for the collection
	description: string | null // Optional description of the collection
	isActive: boolean // Indicates if the collection is active
	isFeatured: boolean // Indicates if the collection is featured
	userId: string // User ID of the creator or owner
	productCount: number // Number of products in the collection, defaults to 0
	thumbnail: string | null // Optional thumbnail image URL
	metaTitle: string | null // Optional meta title for SEO
	metaDescription: string | null // Optional meta description for SEO
	createdAt: string // Timestamp of when the collection was created
	updatedAt: string // Timestamp of last update to the collection
}

export type Tag = {
	id: string
	name: string
	description: string
	type: string
	colorCode: string
	slug: string
	userId: string
	rank: number
	createdAt: string
	updatedAt: string
}

export type Review = {
	rating: number
	comment: string
	date: string
	reviewerName: string
	reviewerEmail: string
}

export type Dimensions = {
	width: number
	height: number
	depth: number
}

export type InventoryItem = {
	id: string
	name: string
	description: string | null
	type: string
	productId: string
	location: string
	stock: number
	sku: string
	barcode: string
	batchNo: string
	allowBackorder: boolean
	manageInventory: boolean
	minStockLevel: number
	reorderQuantity: number
	active: boolean
	createdAt: string
	updatedAt: string
}

export type PopularSearch = {
	id: string // Unique identifier for the popular search entry
	searchTerm: string // The search term that is popular
	popularityScore: number // Score indicating how popular the search term is
	createdAt: string // Timestamp for when the popular search entry was created
	updatedAt: string // Timestamp for when the popular search entry was last updated
}

export type AutoComplete = {
	id: string // Unique identifier for the autocomplete entry
	text: string // Text for the autocomplete suggestion
	type: string // Type/category of the suggestion (e.g., "product", "category")
	popularity: number // Popularity score, used for ranking
	createdAt: string // Timestamp of when the entry was created
	updatedAt: string // Timestamp of the last update to the entry
}

// The following interfaces are lightweight versions or additional interfaces
// that may be used in some parts of the application

// Product related additional types
export interface ProductVariant {
	id: string
	title: string
	price: number
	mrp?: number
	thumbnail?: string
	stock?: number
	sku?: string
	options?: VariantOption[]
}

export interface ProductOption {
	id: string
	name: string
	values: OptionValue[]
}

export interface OptionValue {
	value: string
	available?: boolean
	selected?: boolean
}

export interface VariantOption {
	optionId: string
	value: string
}
