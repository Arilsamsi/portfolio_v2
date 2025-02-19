import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../pages/About.vue";
import Projects from "../pages/Projects.vue";
import Contact from "../pages/Contact.vue";
import MoreAbout from "../pages/MoreAbout.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/about",
      name: "About",
      component: About,
    },
    {
      path: "/projects",
      name: "Projects",
      component: Projects,
    },
    {
      path: "/contact",
      name: "Contact",
      component: Contact,
    },
    {
      path: "/moreabout",
      name: "MoreAbout",
      component: MoreAbout,
    },
  ],
});

export default router;
