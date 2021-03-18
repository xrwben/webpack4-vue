import Vue from "vue";
import App from "./App.vue";
import router from './router/index.js'
// import iView from 'iview';
// import 'iview/dist/styles/iview.css';
import aa from "dll"
console.log(">>>", aa)


// Vue.use(iView);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render:h=>h(App)
})