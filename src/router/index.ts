import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'

import DefaultLayout from '@/layouts/Default.vue'

const routerBase = import.meta.env.MODE === 'development' ? '/' : '/vue-contacts/'

const routes: RouteRecordRaw[] = [
	{ 
        path: routerBase, 
        component: DefaultLayout,
        children: [
            { 
                path: '', 
                name: 'main', 
                component: () => import('@/views/MainPage.vue')
            },
            { 
                path: 'contacts/list',
                name: 'contacts.list',
                component: () => import('@/views/ContactsList.vue') 
            },
            { 
                path: 'contacts/create',
                name: 'contacts.create',
                component: () => import('@/views/ContactsCreate.vue') 
            },
            { 
                path: 'contacts/:id',
                name: 'contacts.view',
                component: () => import('@/views/ContactsView.vue') 
            },
            { 
                path: 'contacts/edit/:id',
                name: 'contacts.edit',
                component: () => import('@/views/ContactsEdit.vue') 
            }
        ]
    },
]

const router = createRouter({
	history: createWebHistory(),
	routes,
	linkActiveClass: 'is-active',
})

export default router