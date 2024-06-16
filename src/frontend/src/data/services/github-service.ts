import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export type PullRequestTypes = {
  name: string
  type: 'feature' | 'hotifx' | 'release'
}

const GithubService = {
  getAllBranches: async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}/branches`)
      return response.data
    } catch (error) {
      return error
    }
  },
  createPullRequest: async (data: PullRequestTypes) => {
    try {
      const response = await axios.post(`${BACKEND_URL}/pr`, data)
      return response.data
    } catch (error) {
      return error
    }
  }
}

export default GithubService
