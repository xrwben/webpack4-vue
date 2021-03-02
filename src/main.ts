// import Vue from "vue";
// import App from "./App.vue";
// import router from "./router/index";
// import axios from "axios";

// // import { Component } from "vue-property-decorator";


// Vue.prototype.$axios = axios;

// Vue.config.productionTip = false;

// // 组件内路由守卫，如果要在组件内部使用路由监听，路由钩子beforeRouteEnter,beforeRouteLeave,beforeRouteUpdate不生效。所以在此注册；
// // Component.registerHooks([
// //   'beforeRouteEnter',//进入路由之前
// //   'beforeRouteLeave',//离开路由之前
// //   'beforeRouteUpdate'
// // ])

// /* eslint-disable no-new */
// new Vue({
//   router,
//   render: h => h(App)
// }).$mount("#app")

import Vue from 'vue';
import App from './App.vue';
import router from './router/index';

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app');