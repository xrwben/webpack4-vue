import Vue from "vue";
import Router from "vue-router";

const Login = resolve => require(["../page/Login.vue"], resolve);

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    }
  ]
});

export default router;