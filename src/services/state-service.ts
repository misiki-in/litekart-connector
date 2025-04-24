import type { State } from './../types'

import { BaseService } from './base.service'

export class StateService extends BaseService {
  private static instance: StateService

  /**
   * Get the singleton instance
   */
  static getInstance(): StateService {
    if (!StateService.instance) {
      StateService.instance = new StateService()
    }
    return StateService.instance
  }
  async list() {
    return this.get<State[]>('/api/states')
  }
}

// Use singleton instance
export const stateService = StateService.getInstance()
