import Vue from 'vue'
import VueRouter from 'vue-router'
import Form from '@/views/Form.vue'
import Navigation from '@/views/Navigation.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/contact',
    name: 'Home',
    component: Form
  },
  {
    path: '/',
    name: 'navigation',
    component: Navigation
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
