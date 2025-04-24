import { ProductSearchResult } from '../types/product-search'
import { BaseService } from './base.service'
import { MeilisearchService } from './meilisearch-service'

export class SearchService extends BaseService {
  private static instance: SearchService
  private meilisearchService: MeilisearchService
  /**
   * Get the singleton instance
   */
  static getInstance(): SearchService {
    this.meilisearchService = new MeilisearchService()
    if (!SearchService.instance) {
      SearchService.instance = new SearchService()
    }
    return SearchService.instance
  }

  async searchWithUrl(url: URL, slug?: string): Promise<ProductSearchResult> {
    try {
      const searchParams = new URLSearchParams(url.search)

      // Standard search parameters with default values
      const standardParams = {
        query: searchParams.get('search') || '',
        categories: slug || searchParams.get('categories') || '',
        tags: searchParams.get('tags') || '',
        originCountry: searchParams.get('originCountry') || '',
        keywords: searchParams.get('keywords') || '',
        page: Number(searchParams.get('page') || 1),
        sort: searchParams.get('sort') || ''
      }

      // Handle price range specially
      const price =
        searchParams.get('priceFrom') || searchParams.get('priceTo')
          ? `${searchParams.get('priceFrom') || ''},${
              searchParams.get('priceTo') || ''
            }`
          : ''

      // Reserved parameter names that shouldn't be included in the dynamic params
      const reservedParams = [
        'search',
        'categories',
        'priceFrom',
        'priceTo',
        'tags',
        'originCountry',
        'keywords',
        'page',
        'sort'
      ]

      // Dynamic parameters sorted by type
      const attributeParams: Record<string, string> = {}
      const optionParams: Record<string, string> = {}
      const otherParams: Record<string, string> = {}

      // Process all non-reserved parameters
      for (const key of [...searchParams.keys()]) {
        if (!reservedParams.includes(key)) {
          const value = searchParams.get(key) || ''

          if (key.startsWith('attributes.')) {
            attributeParams[key] = value
          } else if (key.startsWith('option.')) {
            optionParams[key] = value
          } else {
            otherParams[key] = value
          }
        }
      }

      const res = await this.meilisearchService.search({
        ...standardParams,
        price,
        otherParams,
        attributeParams,
        optionParams
      })

      return {
        data: res?.hits || [],
        count: res?.totalHits || res?.estimatedTotalHits || 0,
        totalPages: res?.totalPages || 0,
        categoryHierarchy: res?.categoryHierarchy || [],
        facets: {
          priceStat: {
            min: res?.allfacetStats?.price?.min,
            max: res?.allfacetStats?.price?.max
          },
          categories: Object.entries(
            res?.facetDistribution?.['categories.category.slug'] || {}
          ).map(([key, value]) => ({
            name: key,
            count: value
          })),
          tags: Object.entries(res?.facetDistribution?.['tags.name'] || {}).map(
            ([key, value]) => ({
              name: key,
              count: value
            })
          ),
          allFilters: res?.facetDistribution
        }
      }
    } catch (error) {
      console.error(error)
      // Return a valid empty result object that matches the expected type
      return {
        data: [],
        count: 0,
        totalPages: 0,
        facets: {
          priceStat: { min: undefined, max: undefined },
          categories: [],
          tags: [],
          allFilters: {}
        }
      }
    }
  }

  /**
   * Search through Meilisearch with a simple query string
   *
   * @param query - The search query string
   * @returns A structured ProductSearchResult object
   */
  async searchWithQuery(query: string): Promise<ProductSearchResult> {
    try {
      const res = await this.meilisearchService.search({
        query: query || ''
      })

      return {
        data: res?.hits || [],
        count: res?.totalHits || res?.estimatedTotalHits || 0,
        totalPages: res?.totalPages || 0,
        facets: {
          priceStat: {
            min: res?.allfacetStats?.price?.min,
            max: res?.allfacetStats?.price?.max
          },
          categories: Object.entries(
            res?.facetDistribution?.['categories.category.slug'] || {}
          ).map(([key, value]) => ({
            name: key,
            count: value
          })),
          tags: Object.entries(res?.facetDistribution?.['tags.name'] || {}).map(
            ([key, value]) => ({
              name: key,
              count: value
            })
          ),
          allFilters: res?.facetDistribution
        }
      }
    } catch (error) {
      console.error(error)
      // Return a valid empty result object
      return {
        data: [],
        count: 0,
        totalPages: 0,
        facets: {
          priceStat: { min: undefined, max: undefined },
          categories: [],
          tags: [],
          allFilters: {}
        }
      }
    }
  }

  /**
   * Create an empty product search result
   *
   * @returns An empty ProductSearchResult object with default values
   */
  emptyResult(): ProductSearchResult {
    return {
      data: [],
      count: 0,
      totalPages: 0,
      facets: {
        priceStat: { min: undefined, max: undefined },
        categories: [],
        tags: [],
        allFilters: {}
      }
    }
  }
}

// Use singleton instance
export const searchService = SearchService.getInstance()
