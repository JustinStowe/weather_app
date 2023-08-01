import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "SearchPage",
    component: () => import("../views/SearchPage.vue"),
  },
  {
    path: "/city",
    name: "MainPage",
    component: () => import("../views/MainPage.vue"),
  },
];
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
export default router;
