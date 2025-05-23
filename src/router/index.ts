import ChatRoom from '@/pages/ChatRoom.vue'
import Home from '@/pages/Home.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routers = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/chat/:roomId',
    name: 'ChatRoom',
    component: ChatRoom,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routers,
})

export default router