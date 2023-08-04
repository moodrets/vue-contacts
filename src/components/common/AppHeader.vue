<template>
    <header class="app-header">
        <div class="centered">
            <router-link :to="{name: 'main'}" class="app-header__logo">
                <div class="app-icon material-icons-round">contact_phone</div>
                <div>Vue Contacts</div>
            </router-link>
            <div class="app-header__menu">
                <router-link v-for="item in menuItems" :to="{name: item.routerName}" class="app-button app-button--light">
                    <span class="material-icons-outlined">{{ item.icon }}</span>
                    <span>{{ item.label }}</span>
                </router-link>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { ITopMenuItem } from '@/types/TopMenu'

const menuItems = reactive<ITopMenuItem[]>([
    {
        label: 'Contact list',
        icon: 'list_alt',
        routerName: 'contacts.list'
    },
    {
        label: 'Create contact',
        icon: 'person_add',
        routerName: 'contacts.create'
    }
])
</script>

<style lang="scss">
.app-header {
    background: var(--color-brand);
    box-shadow: var(--shadow-md);
    padding-top: var(--spacing-md);
    padding-bottom: var(--spacing-md);
    margin-bottom: var(--spacing-xl);
    background-image: linear-gradient(to right, var(--color-brand) 0%, var(--color-brand-200) 100%);

    .centered {
        display: flex;
        align-items: center;
    }

    &__logo {
        flex: none;
        display: flex;
        align-items: center;
        color: var(--color-light);
        font-weight: bold;
        text-decoration: none;
        font-size: 22px;

        &:hover {
            text-decoration: none;
            color: var(--color-light);
        }

        .app-icon {
            margin-right: var(--spacing-md);
            font-size: 32px;
        }
    }

    &__menu {
        margin-left: auto;
        display: flex;
        align-items: center;
        gap: var(--spacing-lg)
    }
}
</style>