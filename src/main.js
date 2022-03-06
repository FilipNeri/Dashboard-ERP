import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './routers/index'
import { BootstrapVue} from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
Vue.use(VueRouter)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
