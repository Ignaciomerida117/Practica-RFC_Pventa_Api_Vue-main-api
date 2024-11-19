//Aqui puedo mandar a llamra otras clases que puedo crear

import AppLayout from '@/layout/AppLayout.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
                {
                    path: '/formClientes',
                    name: 'formClientes',
                    component: () => import('@/views/uikit/formClientes.vue')
                },
                {
                    path: '/puntoVenta',
                    name: 'puntoVenta',
                    component: () => import('@/views/uikit/puntoVenta.vue')
                },
                {
                    path: '/apiConsumir',
                    name: 'apiConsumir',
                    component: () => import('@/views/uikit/apiConsumir.vue')
                }
            ]
        }
    ]
});

export default router;
