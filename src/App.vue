<template>
    <div class="app-wrapper" :class="{'is-loaded': appLoaded}">
        <router-view></router-view>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const appLoaded = ref<boolean>(false)

document.fonts.onloading = () => {
    appLoaded.value = true
}
</script>

<style lang="scss">
.app-wrapper {
    transition: opacity .3s;
    opacity: 0;
    
    &.is-loaded {
        opacity: 1;
    }
}
</style>