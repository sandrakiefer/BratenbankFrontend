import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import BratenListeView from '@/views/BratenListeView.vue';
import BratenChatView from '@/views/BratenChatView.vue';

const router = new VueRouter({
  routes: [
    {
      path: '/liste',
      name: 'BratenListe',
      component: BratenListeView
    },
    {
      path: '/chat',
      name: 'BratenChat',
      component: BratenChatView
    }, 
    {
      path: '/',
      name: 'Home',
      redirect: '/liste'
    }
  ]
})

export default router
