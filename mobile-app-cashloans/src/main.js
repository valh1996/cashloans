import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';

import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueOnsen from 'vue-onsenui';

import "./filters/index"

Vue.config.productionTip = false

Vue.use(VueAxios, axios)
Vue.use(VueOnsen)

new Vue({
  render: h => h(App)
}).$mount('#app')
