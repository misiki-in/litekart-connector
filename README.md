# LiteKart Utility NPM Package

[![npm version](https://litekart.in/logo-litekart.png)](https://litekart.in)

This npm package provides functionality to connect with the LiteKart backend API and can be used as services.

## Installation

You can install the LiteKart utility npm package using npm:

```bash
npm i @misiki/litekart-connector
```

You can install the LiteKart npm package using pnpm:

```bash
pnpm i @misiki/litekart-connector
```

## Usages

you can use this by importing services and then using the functions as needed

```bash
import {services} from '@misiki/litekart-connector'
```

```bash
const data = await services.CartServices.fetchCart(
    ...
)
```

## Documentation

The package includes comprehensive JSDoc documentation for all services and types. This documentation provides:

- Detailed descriptions of each service and its purpose
- Complete parameter and return type documentation for all methods
- API endpoint information for reference
- Example usage for each method
- Type definitions with property descriptions

### Services Documentation

All services follow a consistent singleton pattern and extend the BaseService class. Key services include:

#### Search Services

```typescript
// Import and use the search service
import { searchService } from '@misiki/litekart-connector'

// Perform a simple search
const results = await searchService.searchWithQuery('red shoes')

// Perform a search with URL parameters
const url = new URL(
  'https://example.com/search?search=shoes&priceFrom=50&priceTo=200'
)
const urlResults = await searchService.searchWithUrl(url)
```

#### Authentication Services

```typescript
// Import and use the auth service
import { authService } from '@misiki/litekart-connector'

// Login a user
const user = await authService.login({
  email: 'user@example.com',
  password: 'SecurePassword123'
})

// Register a new user
const newUser = await authService.signup({
  firstName: 'John',
  lastName: 'Doe',
  phone: '+1234567890',
  email: 'john.doe@example.com',
  password: 'SecurePassword123',
  passwordConfirmation: 'SecurePassword123'
})
```

#### Product Services

```typescript
// Import and use the product service
import { productService } from '@misiki/litekart-connector'

// Get product details
const product = await productService.getOne('red-running-shoes')

// Get featured products
const featuredProducts = await productService.listFeaturedProducts({})
```

### Documentation Script

A script is included to help maintain documentation standards. You can run it to generate basic JSDoc templates for any new service files:

```bash
node scripts/generate-jsdoc.js
```

## Contributions

We are in early phase of this npm package and needs contribution from the community.

# Litekart Connector

API Connector for Litekart e-commerce platform.

## Installation

```bash
npm install @misiki/litekart-connector
```

## Search Service Documentation

The `SearchService` provides a high-level API for product search operations, making it easy to integrate product search into your application.

### Features

- Convert URL search parameters into Meilisearch queries
- Process and format search results into a consistent structure
- Handle search errors gracefully with fallback values
- Support for faceted search (filtering by categories, tags, price ranges, etc.)
- Support for pagination and sorting

### Basic Usage

```typescript
import { searchService } from '@misiki/litekart-connector'

// Simple text search
const results = await searchService.searchWithQuery('red shoes')
console.log(`Found ${results.count} products`)
console.log(results.data) // Array of product objects

// Search using URL parameters
const searchUrl = new URL(
  'https://example.com/search?search=shoes&categories=footwear&priceFrom=50&priceTo=200'
)
const urlResults = await searchService.searchWithUrl(searchUrl)

// Access facet data for filtering UI
const priceRange = urlResults.facets.priceStat
const categories = urlResults.facets.categories
const tags = urlResults.facets.tags
```

### Search Methods

#### `searchWithQuery(query: string): Promise<ProductSearchResult>`

Performs a simple product search using a single query string.

**Parameters:**

- `query` (string): The search query text

**Returns:** Promise resolving to a `ProductSearchResult` object

**Example:**

```typescript
const results = await searchService.searchWithQuery('red shoes')
```

#### `searchWithUrl(url: URL, slug?: string): Promise<ProductSearchResult>`

Performs a product search using URL search parameters.

**Parameters:**

- `url` (URL): The URL containing search parameters in its query string
- `slug` (string, optional): Optional category slug that overrides the one in URL params

**Returns:** Promise resolving to a `ProductSearchResult` object

**Example:**

```typescript
const url = new URL(
  'https://example.com/search?search=shoes&priceFrom=50&priceTo=200'
)
const results = await searchService.searchWithUrl(url)
```

### Supported URL Parameters

The following parameters are supported in URL-based searches:

| Parameter       | Description                   | Example                |
| --------------- | ----------------------------- | ---------------------- |
| `search`        | Main search query text        | `search=red+shoes`     |
| `categories`    | Category slug(s) to filter by | `categories=footwear`  |
| `priceFrom`     | Minimum price filter          | `priceFrom=50`         |
| `priceTo`       | Maximum price filter          | `priceTo=200`          |
| `tags`          | Tag names to filter by        | `tags=sale,new`        |
| `originCountry` | Country of origin filter      | `originCountry=US`     |
| `keywords`      | Additional keywords           | `keywords=comfortable` |
| `page`          | Page number for pagination    | `page=2`               |
| `sort`          | Sort order                    | `sort=price:asc`       |
| `attributes.*`  | Dynamic attribute filters     | `attributes.color=red` |
| `option.*`      | Dynamic option filters        | `option.size=42`       |

### Result Structure

The search methods return a `ProductSearchResult` object with the following structure:

```typescript
{
  // Array of product objects matching the search
  data: Product[];

  // Total number of matching products
  count: number;

  // Total number of pages available
  totalPages: number;

  // Array of category objects showing hierarchy
  categoryHierarchy: Record<string, any>[];

  // Filter options derived from the result set
  facets: {
    // Price range statistics
    priceStat: {
      min?: number;
      max?: number
    };

    // Available category filters
    categories: {
      name: string;
      count: number
    }[];

    // Available tag filters
    tags: {
      name: string;
      count: number
    }[];

    // All available filters
    allFilters?: Record<string, Record<string, number>>;
  }
}
```
