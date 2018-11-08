import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Auth/Login'
import Register from '@/components/Auth/Register'
import Loans from '@/components/Loans'
import LoanDetail from '@/components/LoanDetail'
import Layout from '@/components/Layout/Page'

Vue.use(Router)

//Verifies that the user is authenticated before accessing the route, otherwise its redirects to the login form
const ifAuthenticated = (to, from, next) => {
  if (localStorage.jwt_token && localStorage.jwt_refreshToken) {
    router.push({ name: 'Layout'})
  } else {
    next()
    return
  }
}

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/signin',
      name: 'Home',
      component: {
        template: '<router-view/>',
      },
      beforeEnter: ifAuthenticated,
      meta: {
        requiresAuth: false
      },
    },
    {
      path: '/signin',
      name: 'Login',
      component: Login,
      beforeEnter: ifAuthenticated,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/signup',
      name: 'Register',
      component: Register,
      beforeEnter: ifAuthenticated,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/layout',
      name: 'Layout',
      component: Layout,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/loans',
      name: 'Loans',
      component: Loans,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/loans/:id',
      name: 'LoanDetail',
      component: LoanDetail,
      props: true,
      meta: {
        requiresAuth: true
      },
    }
  ]
})

/**
 * Navigation guards
 */
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth) {
    if (localStorage.jwt_token && localStorage.jwt_refreshToken) {
      next()
      return
    }
    next('/signin')
  } else {
    next()
    return
  }
})

export default router