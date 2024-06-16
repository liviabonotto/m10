import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export type PullRequestTypes = {
  name: string
  type: 'feature' | 'hotifx' | 'release'
}

const SalesforceService = {
  getChanges: async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/compareChanges`)
      return response.data
    } catch (error) {
      return error
    }
  },
  createPackage: async (data: any) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/create-package`, data)
      return response.data
    } catch (error) {
      return error
    }
  }
}

export default SalesforceService
