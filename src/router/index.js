import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue';
import Fase1 from '../components/Fase1.vue';
import Fase2 from '../components/Fase2.vue';
import Fase3 from '../components/Fase3.vue';

const routes = [
  { path: '/', component: HelloWorld },
  { path: '/fase1', component: Fase1, name: "fase-uno", },
  { path: '/fase2', component: Fase2, name: "fase-dos", },
  { path: '/fase3', component: Fase3, name: "fase-tres", },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
