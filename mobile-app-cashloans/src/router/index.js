import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Auth/Login'
import Register from '@/components/Auth/Register'

Vue.use(Router)

export default new Router({
    routes: [
      {
        path: '/',
        redirect: '/signin',
        name: 'Home',
        component: {
          template: '<router-view/>',
        },
      },
      {
        path: '/signin',
        name: 'Login',
        component: Login
      },
      {
        path: '/signup',
        name: 'Register',
        component: Register
      }
    ]
})