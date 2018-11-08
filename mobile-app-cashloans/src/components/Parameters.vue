<template id="parameters-page">
  <v-ons-page>

    <ons-row id="parameters">
      <ons-col>
        <v-ons-button modifier="large" class="logout" @click="logout">Se déconnecter</v-ons-button>
      </ons-col>
    </ons-row>

  </v-ons-page>
</template>

<style scoped>
  #parameters {
    padding: 30px;
  }
  
  .logout {
    background: #e52d2d;
  }
</style>

<script>
import AuthService from '../services/AuthService'

export default {
  name: 'Parameters',
  template: '#parameters-page',
  methods: {
    logout() {
      AuthService.Logout()
        .then(res => {
            let response = res.data;
 
            if (response) {
              //remove jwt token
              if (localStorage.jwt_token) {
                localStorage.removeItem('jwt_token')
              }
              
              //remove jwt refresh token
              if (localStorage.jwt_refreshToken) {
                localStorage.removeItem('jwt_refreshToken')
              }

              this.$router.push({ name: 'Login'})
            } else {
              this.$ons.notification.alert('Une erreur est survenue. Veuillez réessayer svp.')
            }
        })
        // eslint-disable-next-line
        .catch(err => {
          this.$ons.notification.alert('Une erreur est survenue. Veuillez réessayer svp.')
        })
    }
  }
}
</script>