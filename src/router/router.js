import Main from "@/pages/Main.vue";
import User from "@/pages/User.vue";
import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    component: Main,
  },
  {
    path: "/user",
    component: User,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
