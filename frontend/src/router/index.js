import { createRouter, createWebHistory } from 'vue-router';
import PlayView from '@/views/playView.vue';
import SubmitView from '@/views/submitView.vue';
import homeView from '@/views/homeView.vue';
export default createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/', component: homeView},
    { path: '/play', component: PlayView },
    { path: '/submit', component: SubmitView }
  ]
});
