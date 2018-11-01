import axios from 'axios'

export default {
    /**
     * Get all loans from API
     */
    getAll(){
      return axios.get(`${process.env.VUE_APP_API_ENDPOINT}/loans`, {
        headers: {
          'Authorization': 'Bearer ' + ''
        }
      })
    },

}
