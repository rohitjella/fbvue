import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { auth } from '../firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/join',
    name: 'Join',
    component: () => import('../views/Join.vue')
  },
  {
    path: '/enter',
    name: 'Enter',
    component: () => import('../views/Enter.vue')
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: {
      auth: true
    }
  },
  {
    // will match everything
    path: '*',
    component: Home

  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const requireAuth = to.matched.some(x => x.meta.auth)

  if (requireAuth && !auth.currentUser) {
    next('/enter')
  } else {
    next()
  }
})
export default router
