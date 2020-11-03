import Vue from 'vue'
import VueRouter from 'vue-router'
import Admin from '@/views/admin/Admin.vue'
import EditProduct from '@/views/admin/EditProduct.vue'
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
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/admin/product/:id',
    name: 'product',
    component: EditProduct,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
