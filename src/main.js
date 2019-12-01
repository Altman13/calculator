import Vue from 'vue'
import App from './App.vue'
import store from './components/store.js';

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { firestorePlugin } from 'vuefire'
Vue.use(firestorePlugin)

import firebase from 'firebase/app'
import 'firebase/firestore'

firebase.initializeApp({
 projectId: 'calc-39e7d', 
 databaseURL: 'https://calc-39e7d.firebaseio.com'
})
export const db = firebase.firestore()

Vue.config.productionTip = false
Vue.use(BootstrapVue)
new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
