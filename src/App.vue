<template>
    <div class="app-wrapper" :class="{'is-loaded': appLoaded}">
        <router-view></router-view>
    </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from 'vue'
import { AppStorage } from '@/helpers/common'
import { defaultContactsList } from '@/helpers/initialData'
import { IContactItem } from '@/types/Contacts'

const appLoaded = ref<boolean>(false)

document.fonts.onloading = () => {
    appLoaded.value = true
}

onBeforeMount(() => {
    if (!AppStorage.getItem<IContactItem>('contacts_list')) {
        AppStorage.setItem('contacts_list', defaultContactsList)
    }
})
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