import { createRouter, createWebHistory } from 'vue-router';
import PlayView from '@/views/playView.vue';
import SubmitView from '@/views/submitView.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: PlayView },
    { path: '/submit', component: SubmitView }
  ]
});
