<template>
    <div class="page-layout">
        <aside class="page-layout__aside">
            <ContactFilter></ContactFilter>
        </aside>
        <main class="page-layout__content">
            <div v-if="contactList.length" class="contacts-list" :class="`contacts-list--${viewType}`">
                <div class="contacts-list__top">
                    <div class="contacts-list__top-actions">
                        <button type="button" class="app-button app-button--primary">
                            <span class="material-icons-outlined">person_add</span>
                            <span>Create Contact</span>
                        </button>
                    </div>
                    <div class="contacts-list__view-type">
                        <span 
                            :class="[
                                viewType === 'rows' ? 'material-icons-round' : 'material-icons-outlined',
                                {'is-active': viewType === 'rows'}
                            ]"
                            @click="changeViewType('rows')"
                        >view_list</span>
                        <span
                            :class="[
                                viewType === 'columns' ? 'material-icons-round' : 'material-icons-outlined',
                                {'is-active': viewType === 'columns'}
                            ]"
                            @click="changeViewType('columns')"
                        >view_module</span>
                    </div>
                </div>
                <div class="contacts-list__content">
                    <ContactItem
                        v-for="contact in contactList" 
                        :key="contact.id"
                        :data="contact" 
                        :view-type="viewType"
                    ></ContactItem>
                </div>
            </div>
            <div v-else class="not-found-text">
                <div class="app-icon material-icons-round">developer_board_off</div>
                <span>Contacts not found</span>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import ContactItem from '@/components/contacts/Item.vue'
import ContactFilter from '@/components/contacts/Filter.vue'
import { IContactItem, ContactsListViewType } from '@/types/Contacts'
import { AppStorage } from '@/helpers/common'

const storageConctactList = AppStorage.getItem<IContactItem[]>('contacts_list')
const storageConctactViewType = AppStorage.getItem<ContactsListViewType>('contacts_view_type')

const contactList = reactive<IContactItem[]>(storageConctactList || [])

const viewType = ref<ContactsListViewType>(storageConctactViewType || 'rows')

const changeViewType = (key: ContactsListViewType) => {
    viewType.value = key
    AppStorage.setItem('contacts_view_type', key)
}
</script>

<style lang="scss">
.contacts-list {
    $self: &;
    padding-bottom: var(--spacing-3xl);

    &--columns {
        #{$self}__content {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: var(--spacing-xl);
        }    
    }

    &__top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: var(--spacing-md);
    }

    &__view-type {
        color: var(--color-brand);
        display: flex;
        align-items: center;
        gap: var(--spacing-md);

        > [class*="material-icons"] {
            font-size: 30px;
            cursor: pointer;

            &.is-active {
                color: var(--color-brand-200);
            }
        }
    }
}
</style>