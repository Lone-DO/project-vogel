import HomeView from '@/views/HomeView.vue'
import VogelView from '@/views/VogelView.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
    },
    {
      path: '/page/:id',
      component: VogelView,
    },
  ],
})

export default router
