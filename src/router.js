import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Protected from '@/components/Protected'
import store from './store'

Vue.use(Router)

// https://router.vuejs.org/guide/advanced/navigation-guards.html
function requireAuth(to, from, next) {
  // Testing authentication state of the user
  if (!store.state.user.logged) {
    // Not sure if user is logged in yet, testing their login
    const isLoggedUrl = "http://localhost:3000/auth/logged"
    fetch(isLoggedUrl, {credentials: 'include'}).then(res => res.json()).then(isLogged => {
      if (isLogged.logged) {
        // User is already logged in, storing
        store.commit("setUser", isLogged)
        next()
      } else {
        // User is not logged in, redirecting to App ID
        window.location.href=`http://localhost:3000/auth/login?redirect=${to.fullPath}`
      }
    }).catch(e => {
      // TODO: do something sensible here so the user sees their login has failed
      console.log("Testing user login failed - D'oh!")
    })
  } else {
    // User already logged in
    next()
  }
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/protected',
      name: 'protected',
      beforeEnter: requireAuth,
      component: Protected
    }
  ]
})
