import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'

import DefaultLayout from '@/layouts/Default.vue'

const routes: RouteRecordRaw[] = [
	{ 
        path: '/', component: DefaultLayout,
        children: [
            { name: 'main', path: '', component: () => import('@/views/MainPage.vue')},
            { name: 'contacts.list', path: '/contacts/list', component: () => import('@/views/ContactsList.vue') },
            { name: 'contacts.create', path: '/contacts/create', component: () => import('@/views/ContactsCreate.vue') },
            { name: 'contacts.view', path: '/contacts/:id', component: () => import('@/views/ContactsView.vue') },
            { name: 'contacts.edit', path: '/contacts/edit/:id', component: () => import('@/views/ContactsEdit.vue') }
        ]
    },
]

const router = createRouter({
	history: createWebHistory(),
	routes,
	linkActiveClass: 'is-active',
})

export default router