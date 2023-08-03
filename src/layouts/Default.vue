<template>
    <AppHeader></AppHeader>
    <section class="centered">
        <router-view></router-view>
    </section>
</template>

<script lang="ts" setup>
import AppHeader from '@/components/common/AppHeader.vue'
</script>