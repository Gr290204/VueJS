import { createRouter, createWebHistory } from 'vue-router';
import Home from "@/components/Home.vue";
import Clients from '@/components/Clients.vue';
import Flowers from "@/components/Flowers.vue";
const routes   = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/clients',
        component: Clients,
    },
    {
        path: '/flowers',
        component: Flowers,
    },
];

const router  = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
