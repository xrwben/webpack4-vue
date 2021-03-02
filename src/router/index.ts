import Vue from "vue";
import VueRouter from "vue-router";

// const Login = resolve => require(["../page/Login.vue"], resolve);
const Login = () => import(/* webpackChunkName: "login" */"../page/Login.vue");
import About from "../page/About.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/about",
      name: "About",
      component: About
    }
  ]
});

export default router;
