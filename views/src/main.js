// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.css'
import 'font-awesome/css/font-awesome.css'

Vue.use(VueRouter)

Vue.use(VueMaterial)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App)
});
