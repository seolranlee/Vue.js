// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import reset from 'reset-css'
import App from './App'
import axios from 'axios'
/*import router from './router'*/

require('es6-promise').polyfill();
Vue.config.productionTip = false;
Vue.prototype.$http = axios;

Vue.prototype.$eventHub = new Vue(); // Global event bus
/* eslint-disable no-new */
new Vue({
  el: '#app',
  /*router,*/
  components: { App },
  template: '<App/>'
});
