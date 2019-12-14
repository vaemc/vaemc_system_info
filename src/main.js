import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import zhHans from 'vuetify/es5/locale/zh-Hans'
Vue.use(Vuetify)
Vue.config.productionTip = false
const opts = {
  lang: {
    locales: { zhHans,},
    current: 'zhHans',
  },
}
new Vue({
  router,
  store,
  vuetify: new Vuetify(opts),
  render: h => h(App)
}).$mount('#app')
