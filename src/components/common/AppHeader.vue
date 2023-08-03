<template>
    <header class="app-header">
        <div class="centered">
            <router-link :to="{name: 'main'}" class="app-header__logo">
                <div class="app-icon material-icons-round">contact_phone</div>
                <div>Vue Contacts</div>
            </router-link>
            
        </div>
    </header>
</template>

<script setup lang="ts">

</script>

<style lang="scss">
.app-header {
    background: var(--color-brand);
    box-shadow: var(--shadow-md);
    padding-top: var(--spacing-md);
    padding-bottom: var(--spacing-md);
    margin-bottom: var(--spacing-xl);

    &__logo {
        display: flex;
        align-items: center;
        color: var(--color-light);
        font-weight: bold;
        text-decoration: none;

        &:hover {
            text-decoration: none;
            color: var(--color-light);
        }

        .app-icon {
            margin-right: var(--spacing-md);
            font-size: 32px;
        }
    }
}
</style>