import type { Init } from '../types'
import { MsSearchParams } from '../types/product-search'
import { MeilisearchResponse } from '../types/product-search'

import { BaseService } from './base.service'

export class MeilisearchService extends BaseService {
  private static instance: MeilisearchService

  /**
   * Get the singleton instance
   */
  static getInstance(): MeilisearchService {
    if (!MeilisearchService.instance) {
      MeilisearchService.instance = new MeilisearchService()
    }
    return MeilisearchService.instance
  }
  async search(params: MsSearchParams): Promise<MeilisearchResponse> {
    const {
      query,
      categories,
      price,
      keywords,
      tags,
      originCountry,
      page,
      otherParams,
      attributeParams,
      optionParams,
      sort
    } = params
    const searchParams = new URLSearchParams()

    // Add standard parameters with null/undefined checking
    const addParam = (
      key: string,
      value: string | number | undefined | null
    ) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(
          key,
          typeof value === 'string' ? value : String(value)
        )
      }
    }

    // Add all standard parameters
    addParam('search', query)
    addParam('categories', categories)
    addParam('price', price)
    addParam('keywords', keywords)
    addParam('tags', tags)
    addParam(
      'originCountry',
      originCountry ? decodeURIComponent(originCountry) : undefined
    )
    addParam('page', page)
    addParam('sort', sort)

    // Helper to process parameter groups
    const addParamGroup = (params: Record<string, string> | undefined) => {
      if (params) {
        for (const [key, value] of Object.entries(params)) {
          addParam(key, value ? decodeURIComponent(value) : undefined)
        }
      }
    }

    // Process all the dynamic parameters
    addParamGroup(otherParams)
    addParamGroup(attributeParams)
    addParamGroup(optionParams)

    return this.get<MeilisearchResponse>(
      `/api/ms/products?${searchParams?.toString()}`
    )
  }

  async searchAutoComplete(params: {
    query: string
  }): Promise<MeilisearchResponse> {
    const { query } = params
    const searchParams = new URLSearchParams()
    searchParams.append('search', query)
    return this.get<MeilisearchResponse>(
      `/api/ms-autocomplete/products?${searchParams?.toString()}`
    )
  }
}

// Use singleton instance
export const meilisearchService = MeilisearchService.getInstance()
