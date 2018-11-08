import Axios from 'axios';

const API_ENDPOINT = (process.env.NODE_ENV !== 'production')
    ? process.env.VUE_APP_API_ENDPOINT_DEV
    : process.env.VUE_APP_API_ENDPOINT_PROD

export default {
    /**
     * SignIn from API
     */
    SignIn(email, password){
      return Axios.post(`${API_ENDPOINT}/user/login`, {
            headers: {
                'Content-Type': 'application/json',
            },
            email: email,
            password: password,
        })
    },
    /**
     * Logout from API
     */
    Logout(){
        return Axios.post(`${API_ENDPOINT}/user/logout`, {
              headers: {
                  'Content-Type': 'application/json',
              }
          })
      },
   

}
