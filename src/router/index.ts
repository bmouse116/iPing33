import LKPage from "@/pages/LK/LKPage.vue";
import Login from "@/pages/Login.vue";
import MainPage from "@/pages/MainPage/MainPage.vue";
import Register from "@/pages/Register.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "MainPage",
    component: MainPage,
  },
  {
    path: '/register',
    name: "Register",
    component: Register
  },
  {
    path: '/login',
    name: "Login",
    component: Login
  },
  {
    path: '/lk',
    name: 'LKPage',
    component: LKPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
