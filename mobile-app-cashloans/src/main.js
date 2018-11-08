import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueOnsen from 'vue-onsenui';

import "./filters/index"

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(VueOnsen)

const jwt_token = localStorage.jwt_token
if (jwt_token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + jwt_token
}

new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')
