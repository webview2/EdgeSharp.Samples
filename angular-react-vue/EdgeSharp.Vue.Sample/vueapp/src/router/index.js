import { createWebHistory, createRouter } from "vue-router";
import Home from "@/components/Home.vue";
import TmdbMovies from "@/components/TmdbMovies.vue";

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/tmdbmovies",
    name: "Tmdb Movies",
    component: TmdbMovies,
  },
  {
    path: '/:pathMatch(.*)*',
    component: Home
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;