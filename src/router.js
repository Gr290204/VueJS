import { createRouter, createWebHistory } from 'vue-router';
import Home from "@/components/Home.vue";
import Clients from '@/components/Clients.vue';

import Flowers from "@/components/Flowers.vue";
import ClientsPrime from "@/components/ClientsPrime.vue";
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
];

const router  = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
