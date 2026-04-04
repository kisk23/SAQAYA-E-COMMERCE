import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@fortawesome/fontawesome-free/css/all.min.css'

Vue.config.productionTip = false // Disable the production tip on Vue startup

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
