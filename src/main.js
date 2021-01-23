import Vue from 'vue'
import App from './App.vue'
window.$ = window.jQuery = require('jquery')
require('../semantic/dist/semantic.min.css')
require('../semantic/dist/semantic.min.js')

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
