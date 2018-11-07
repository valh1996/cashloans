import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Auth/Login'
import Register from '@/components/Auth/Register'
import Loans from '@/components/Loans'
import LoanDetail from '@/components/LoanDetail'
import Layout from '@/components/Layout/Page'

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
      },
      {
        path: '/layout',
        name: 'Layout',
        component: Layout
      },
      {
        path: '/loans',
        name: 'Loans',
        component: Loans
      },
      {
        path: '/loans/:id',
        name: 'LoanDetail',
        component: LoanDetail,
        props: true
      }
    ]
})