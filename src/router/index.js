import Vue from 'vue'
import Router from 'vue-router'
import Form from '@/views/Form'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Form
    }
  ]
})

export default router
