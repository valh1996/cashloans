import Axios from 'axios'

const API_ENDPOINT = (process.env.NODE_ENV !== 'production')
    ? process.env.VUE_APP_API_ENDPOINT_DEV
    : process.env.VUE_APP_API_ENDPOINT_PROD

export default {
    /**
     * Get all loans from API
     */
    getAll(){
      return Axios.get(`${API_ENDPOINT}/loans`)
    },

}
