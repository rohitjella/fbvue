import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { auth } from './firebase'
Vue.config.productionTip = false

let app
// auth.onAuthStateChanged(() => {
//   if (!app) {
//     new Vue({
//       router,
//       store,
//       vuetify,
//       render: h => h(App)
//     }).$mount('#app')
//   }
// })

auth.onAuthStateChanged(async (user) => {
  // console.log('user:', user)
  if (!app) {
    if (user) {
      await store.dispatch('fetchUserProfile', user)
    }
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
})