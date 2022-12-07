import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes.js'
import Pinia from './pinia'
import { useLogin } from '@/stores/login.js'
import { storeToRefs } from 'pinia'

const store = useLogin(Pinia)
const { cookie } = storeToRefs(store)
const { changeVisible } = store

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})


router.beforeEach((to, form, next) => {
  if (to.meta.auth) {
    if (cookie.value.length) {
      next()
    } else {
      changeVisible(true)
      next()
    }
  } else {
    next()
  }
})


export default router

