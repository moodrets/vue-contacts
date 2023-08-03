<template>
    <AppHeader></AppHeader>
    <main class="centered">
        <router-view></router-view>
    </main>
</template>

<script lang="ts" setup>
import AppHeader from '@/components/common/AppHeader.vue'
</script>