import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../App.vue'), 
  },
  {
    path: '/about',
    name: 'About',
    // component: () => import('../views/AboutView.vue'), 
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
