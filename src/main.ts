import Vue from 'vue'
import CompositionApi from '@vue/composition-api';
Vue.use(CompositionApi)

import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
