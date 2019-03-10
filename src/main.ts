/* Import global assets */
import './less/common.less'

import Vue from 'vue'
import App from './app.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
// @ts-ignore
import VueViewportManager from 'vue-viewport-manager'

Vue.config.productionTip = false
// @ts-ignore
Vue.use(VueViewportManager, {store})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
