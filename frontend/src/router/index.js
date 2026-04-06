import { createRouter, createWebHistory } from 'vue-router';
import PlayView from '@/views/playView.vue';
import SubmitView from '@/views/submitView.vue';
import homeView from '@/views/homeView.vue';
import SubmitScoreView from '@/views/submitScoreView.vue';
import AdminLogin from '@/views/adminLogin.vue';
import DashboardView from '@/views/dashboardView.vue';
export default createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/', component: homeView},
    { path: '/play/:zone', component: PlayView, props:false },
    { path: '/submit', component: SubmitView },
    {path: '/submitScore', component:SubmitScoreView},
    {path: '/admin/login', component:AdminLogin},
    {path: '/admin/dashboard', component:DashboardView}
  ]
});
