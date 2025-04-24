/**
 * Base service class with fetch functionality
 * This can be easily moved to another project
 */
export class BaseService {
	private _fetch: typeof fetch

	constructor(fetchFn?: typeof fetch) {
		// Use provided fetch or global fetch as fallback
		this._fetch = fetchFn || fetch
	}

	/**
	 * Set the fetch instance to be used by this service
	 */
	setFetch(fetchFn: typeof fetch) {
		this._fetch = fetchFn
		return this
	}

	/**
	 * Get the current fetch instance
	 */
	getFetch(): typeof fetch {
		return this._fetch
	}

	/**
	 * Perform a GET request
	 */
	async get<T>(url: string): Promise<T> {
		const response = await this._fetch(url)
		return (await response.json()) as T
	}

	/**
	 * Perform a POST request
	 */
	async post<T>(url: string, data: any): Promise<T> {
		const response = await this._fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		return (await response.json()) as T
	}

	/**
	 * Perform a PUT request
	 */
	async put<T>(url: string, data: any): Promise<T> {
		const response = await this._fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		return (await response.json()) as T
	}

	/**
	 * Perform a PATCH request
	 */
	async patch<T>(url: string, data: any): Promise<T> {
		const response = await this._fetch(url, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})
		return (await response.json()) as T
	}

	/**
	 * Perform a DELETE request
	 */
	async delete<T>(url: string): Promise<T> {
		const response = await this._fetch(url, {
			method: 'DELETE'
		})
		return (await response.json()) as T
	}
}
