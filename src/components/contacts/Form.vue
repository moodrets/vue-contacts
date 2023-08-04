<template>
    <div class="contact-form">
        <h1 v-if="formMode === 'edit'">Edit contact <strong>{{ contactName }}</strong></h1>
        <h1 v-if="formMode === 'create'">Create contact</h1>
        <form @submit.prevent="onSubmit">
            <div class="form-field">
                <div class="form-field__content">
                    <input type="text" required class="form-control" placeholder="Name" v-model="contactModel.fullName">
                </div>
            </div>
            <div class="form-field">
                <div class="form-field__content">
                    <input type="email" required class="form-control" placeholder="Email" v-model="contactModel.email">
                </div>
            </div>
            <div class="form-field">
                <div class="form-field__content">
                    <input type="tel" required class="form-control" placeholder="Phone" v-model="contactModel.phone">
                </div>
            </div>
            <div class="form-field">
                <div class="form-field__content">
                    <ContactTags :tags="contactModel.tags || []"></ContactTags>
                </div>
            </div>
            <div class="form-field">
                <div class="form-field__content form-field__content--flex">
                    <button type="submit" class="app-button app-button--primary">
                        <div class="material-icons-round">{{ formMode === 'edit' ? 'save_as' : 'save' }}</div>
                        <span>{{ formMode === 'edit' ? 'Save contact' : 'Create contact' }}</span>
                    </button>
                    <div class="contact-form__actions">
                        <div class="icon-delete material-icons-round" @click="onRemoveItem(contactModel, toast, goToList)">delete_outline</div>
                        <div class="icon-back material-icons-round" @click="goBack">arrow_back</div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import ContactTags from '@/components/contacts/Tags.vue'
import { useRoute, useRouter } from 'vue-router'
import { contactList, onRemoveItem } from '@/reactive/useContacts'
import { IContactItem } from '@/types/Contacts'
import { useToast } from '@/plugins/useToastPlugin'
import { AppStorage } from '@/helpers/common'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const itemId = +route.params.id

const formMode = computed<'edit' | 'create'>(() => {
    return itemId ? 'edit' : 'create'
})

const contactModel = ref<IContactItem>({
    email: '',
    fullName: '',
    phone: '',
    tags: []
})

const contactName = ref<string>(contactModel.value.fullName)

if (itemId) {
    const contactItemData = contactList.value.find(item => item.id === itemId)
    
    if (contactItemData) {
        contactName.value = contactItemData.fullName
        contactModel.value = {...contactItemData}
    }
}

const goBack = () => {
    router.go(-1)
}

const goToList = () => {
    router.push({name: 'contacts.list'})
}

const onSubmit = () => {
    if (formMode.value === 'edit') {
        if (window.confirm(`Are you sure to edit "${contactName.value}"?`)) {
            let findIndex = contactList.value.findIndex(item => item.id === itemId)
            if (findIndex !== -1) {
                contactList.value[findIndex] = contactModel.value
                toast?.show('success', 'Сontact edited')
                AppStorage.setItem('contacts_list', contactList.value)
                goBack()
            }
        }
    }

    if (formMode.value === 'create') {
        contactList.value.unshift({
            id: Date.now(),
            ...contactModel.value
        })
        AppStorage.setItem('contacts_list', contactList.value)
        router.push({name: 'contacts.list'})
    }
}
</script>

<style lang="scss">
.contact-form {
    max-width: 640px;
    margin-left: auto;
    margin-right: auto;

    h1 {
        strong {
            color: var(--color-success);
        }
    }

    &__actions {
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
        margin-left: auto;
    }
}
</style>