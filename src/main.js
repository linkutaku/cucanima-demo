// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Rem from './rem.js'
import ElementUI from 'element-ui'
import '../theme/index.css'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './store/'
import axios from './http'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
Vue.use(Vuex)
Vue.use(ElementUI)
Vue.config.productionTip = false
axios.defaults.withCredentials=true;
axios.defaults.baseURL = '/api';


/* eslint-disable no-new */
new Vue({
  el: '#app',
  axios,
  router,
  store,
  template: '<App/>',
  components: { App },
})
