<template id="loan-login-page">
  <v-ons-page>
    <v-ons-toolbar>
      <div class="center">Connexion</div>
    </v-ons-toolbar>

    <ons-row id="login-form">
      <ons-col>
        <v-ons-list>
          <v-ons-list-item>
            <div class="left">
              <v-ons-icon icon="fa-at" class="list-item__icon"></v-ons-icon>
            </div>
            <label class="center">
              <v-ons-input type="email" placeholder="Adresse e-mail" float v-model="email"></v-ons-input>
            </label>
          </v-ons-list-item>
          <v-ons-list-item>
            <div class="left">
              <v-ons-icon icon="fa-lock" class="list-item__icon"></v-ons-icon>
            </div>
            <label class="center">
              <v-ons-input type="password" placeholder="Mot de passe" float v-model="password"></v-ons-input>
            </label>
          </v-ons-list-item>
          <v-ons-list-item>
            <v-ons-button class="btn login" @click="login">Se connecter</v-ons-button>
            <v-ons-button modifier="outline" class="btn register" @click="pushRegisterPage">Pas encore inscrit ?</v-ons-button>
          </v-ons-list-item>
        </v-ons-list>
      </ons-col>
    </ons-row>

  </v-ons-page>
</template>

<style scoped>
  #login-form {
    padding: 30px;
  }

  .btn {
    width: 100%;
    min-width: 100%;
    text-align: center;
  }

  .btn.login {
    
  }

  .btn.register {
    margin-top: 5px;
  }
</style>

<script>
import AuthService from '../../services/AuthService'

export default {
  name: 'Login',
  key: 'loan-login-page',
  template: '#loan-login-page',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    pushRegisterPage() {
      this.$router.push({ name: 'Register'})
    },
    login() {
      AuthService.SignIn(this.email, this.password)
          .then(res => {
              let response = res.data;

              if (response.token && response.refreshToken) {
                localStorage.setItem('jwt_token', response.token)
                localStorage.setItem('jwt_refreshToken', response.refreshToken)

                this.$router.push({ name: 'Layout'})
              } else {
                this.$ons.notification.alert('Une erreur est survenue. Merci de réessayer.')
              }
          })
          .catch(err => {
              let response = err.response;
              
              if (response.status && response.status === 401) {
                  //Wrong credentials
                  if (response.data.error) {
                    this.$ons.notification.alert(response.data.error)
                  }

                  //validation rules error
                  let rule = response.data[0];
                  if (rule) {
                    this.$ons.notification.alert(`${rule.message} !`)
                  }
              }
          })
    }
  }
}
</script>