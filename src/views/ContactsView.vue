<template>
    <div class="contact-view" v-if="contactData">
        <div class="contact-view__top">
            <h1>{{ contactData.fullName }}</h1>
            <div class="contact-view__actions">
                <div class="icon-back material-icons-round" @click="goBack">arrow_back</div>
                <div class="icon-edit material-icons-outlined" @click="onEdit">mode_edit</div>
                <div class="icon-delete material-icons-outlined" @click="onRemoveItem(contactData, toast, goBack)">delete_outline</div>
            </div>
        </div>
        <div class="contact-view__email">
            <a :href="`mailto:${contactData.email}`">{{ contactData.email }}</a>
        </div>
        <div class="contact-view__phone">{{ contactData.phone }}</div>
        <div class="contact-view__tags" v-if="contactData.tags && contactData.tags.length">
            <button 
                v-for="tag in contactData.tags" 
                :key="tag" 
                type="button" 
                class="app-button app-button--primary"
                @click="onSetTag(tag)"
            >{{ tag }}</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { IContactItem } from '@/types/Contacts'
import { useRoute, useRouter } from 'vue-router'
import { contactList, onRemoveItem } from '@/reactive/useContacts'
import { useToast } from '@/plugins/useToastPlugin'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const itemId = +route.params.id

const contactData = ref<IContactItem | null>()

if (itemId) {
    const foundContact = contactList.value.find(item => item.id === itemId)

    if (foundContact) {
        contactData.value = foundContact
    } else {
        router.push({name: 'contacts.list'})
        toast?.show('error', 'Contact not found')
    }
}

const goBack = () => {
    router.go(-1)
}

const onSetTag = (tag: string) => {
    router.push({
        name: 'contacts.list',
        query: {
            tag: tag
        }
    })
}

const onEdit = () => {
    router.push({
        name: 'contacts.edit',
        params: {
            id: itemId
        }
    })
}
</script>

<style lang="scss">
.contact-view {
    max-width: 640px;
    margin-left: auto;
    margin-right: auto;

    &__top {
        display: flex;
        align-items: center;
    }

    &__actions {
        margin-left: auto;
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
    }

    &__email {
        font-weight: 500;
        font-size: 18px;
        margin-bottom: var(--spacing-xl);
        color: var(--color-brand);
    }
    
    &__phone {
        font-weight: 500;
        font-size: 18px;
        margin-bottom: var(--spacing-xl);
    }

    &__tags {
        margin-top: var(--spacing-xl);
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: var(--spacing-md);
    }
}
</style>