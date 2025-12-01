import { createRouter, createWebHistory } from 'vue-router';
import Home from "@/components/Home.vue";
import Flowers from "@/components/Flowers.vue";
import ClientsPrime from "@/components/ClientsPrime.vue";
import CreateFlower from "@/components/CreateFlower.vue";
const routes   = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/clients',
        component: ClientsPrime,
    },
    {
        path: '/flowers',
        component: Flowers,
    },
    {
        path: '/createFlower',
        component: CreateFlower,
    },

];

const router  = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
