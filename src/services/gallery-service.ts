import type { Gallery, PaginatedResponse } from './../types'

import { BaseService } from './base.service'

export class GalleryService extends BaseService {
  private static instance: GalleryService

  /**
   * Get the singleton instance
   */
  static getInstance(): GalleryService {
    if (!GalleryService.instance) {
      GalleryService.instance = new GalleryService()
    }
    return GalleryService.instance
  }
  async fetchGallery() {
    return this.get<Gallery[]>('/api/gallery')
  }
}

// // Use singleton instance
export const galleryService = GalleryService.getInstance()
