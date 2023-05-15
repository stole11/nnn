import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import HomeView from '../views/HomeView.vue'
import Proizvodi from '../views/Proizvodi.vue'
import Cart from '../views/Cart.vue'
import ThanksPage from '../views/ThanksPage.vue'
import {auth} from '@/firebase.js'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: HomeView,
    meta: {
      needAuth: true,
    }
  },
  {
    path: '/proizvodi/:id',
    name: 'Proizvodi',
    component: Proizvodi,
    meta: {
      needAuth: true,
    }
  },
  {
    path: '/kosarica',
    name: 'Kosarica',
    component: Cart,
    meta: {
      needAuth: true,
    }
  },
  {
    path: '/thanks',
    name: 'Thanks',
    component: ThanksPage,
    meta: {
      needAuth: true,
    }
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isUser = auth.currentUser;
  if(!isUser && to.meta.needAuth) {
    next({name: "Login"})
  } else if(isUser && !to.meta.needAuth) {
    next({name: 'Home'})
  } else {
    next()
  }
})

export default router
