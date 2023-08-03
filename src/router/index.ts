import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'

import DefaultLayout from '@/layouts/Default.vue'

const routes: RouteRecordRaw[] = [
	{ 
        path: '/', component: DefaultLayout, 
        children: [
            { name: 'main', path: '', component: () => import('@/pages/MainPage.vue') }
        ] 
    },
]

const router = createRouter({
	history: createWebHistory(),
	routes,
	linkActiveClass: 'is-active',
})

export default router