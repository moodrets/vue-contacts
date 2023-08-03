<template>
    <div class="contact-item" :class="`contact-item--${props.viewType}`">
        <div class="contact-item__top">
            <div class="contact-item__name">{{ props.data.fullName }}</div>
            <div class="contact-item__email">{{ props.data.email }}</div>
        </div>
        <div class="contact-item__phone">{{ props.data.phone }}</div>
        <div v-if="props.data.tags && props.data.tags.length" class="contact-item__tags">
            <button 
                v-for="tag in props.data.tags" 
                type="button" 
                class="app-button app-button--primary"
            >{{ tag }}</button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { IContactItem, ContactsListViewType } from '@/types/Contacts'

const props = withDefaults(
    defineProps<{
        data: IContactItem,
        viewType?: ContactsListViewType 
    }>(),
    {
        viewType: 'columns'
    }
)
</script>

<style lang="scss">
.contact-item {
    $self: &;

    padding: var(--spacing-md) var(--spacing-lg);
    box-shadow: var(--shadow-md);
    margin-bottom: var(--spacing-xs);
    border-radius: var(--radius-md);
    transition: box-shadow .2s;

    &:hover {
        box-shadow: var(--shadow-xl);
    }

    &__top {
        display: flex;
        align-items: center;
        gap: var(--spacing-lg);
        margin-bottom: var(--spacing-md);
    }

    &__name {
        font-weight: bold;
        font-size: 18px;
    }

    &__email {
        font-weight: 500;
        color: var(--color-brand);
    }

    &__phone {
        font-weight: 500;
        font-size: 18px;
        margin-bottom: var(--spacing-2xl);
    }

    &__tags {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: var(--spacing-md);
    }

    &--columns {
        margin: 0;

        #{$self}__top {
            display: block;
        }

        #{$self}__name {
            margin-bottom: var(--spacing-sm);
        }
    }
}
</style>