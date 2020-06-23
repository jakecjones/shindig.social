import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router'

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

import Vuex from 'vuex'
import { store } from './store'
Vue.use(Vuex)

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
