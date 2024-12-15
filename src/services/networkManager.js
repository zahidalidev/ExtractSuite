import { instance } from './instance'

class NetworkManager {
  constructor() {
    this.networkStatus = {
      isConnected: true,
    }
  }

  async makeRequest(requestConfig) {
    const startTime = Date.now()
    const { method, url, data, params, successMessage } = requestConfig

    try {
      const response = await instance[method](url, {
        ...(data && { json: data }),
        ...(params && { searchParams: params }),
      }).json()

      const endTime = Date.now()
      const requestTime = endTime - startTime

      if (successMessage) {
        console.log('Success:', successMessage)
        // You can integrate a toast notification library here if needed
      }

      return response
    } catch (error) {
      const errorMessage = error.message || 'Something went wrong'
      console.error(
        `API Error - ${method.toUpperCase()} ${url}:`,
        errorMessage
      )

      // You can integrate error notifications here
      return null
    }
  }

  get(url, params, successMessage) {
    return this.makeRequest({ method: 'get', url, params, successMessage })
  }

  post(url, data, successMessage) {
    return this.makeRequest({ method: 'post', url, data, successMessage })
  }

  put(url, data, successMessage) {
    return this.makeRequest({ method: 'put', url, data, successMessage })
  }

  delete(url, successMessage) {
    return this.makeRequest({ method: 'delete', url, successMessage })
  }
}

export const networkManager = new NetworkManager()
