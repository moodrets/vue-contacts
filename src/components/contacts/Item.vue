<template>
    <div class="contact-item" :class="`contact-item--${props.viewType}`">
        <a class="contact-item__inset-link" href="#" @click.prevent="emits('link', props.data)"></a>
        <div class="contact-item__top">
            <div class="contact-item__name">{{ props.data.fullName }}</div>
            <div class="contact-item__email">{{ props.data.email }}</div>
            <div class="contact-item__actions">
                <span class="icon-edit material-icons-outlined" @click.stop="emits('edit', props.data)">mode_edit</span>
                <span class="icon-delete material-icons-outlined" @click.stop="emits('remove', props.data)">delete_outline</span>
            </div>
        </div>
        <div class="contact-item__phone">{{ props.data.phone }}</div>
        <div v-if="props.data.tags && props.data.tags.length" class="contact-item__tags">
            <button 
                v-for="tag in props.data.tags" 
                type="button" 
                class="app-button app-button--primary"
                @click.stop="emits('tag', tag)"
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

const emits = defineEmits(['remove', 'edit', 'link', 'tag'])
</script>

<style lang="scss">
.contact-item {
    $root: &;

    cursor: pointer;
    position: relative;
    padding: var(--spacing-md) var(--spacing-lg);
    box-shadow: var(--shadow-md);
    margin-bottom: var(--spacing-xs);
    border-radius: var(--radius-md);
    transition: box-shadow .2s;

    &:hover {
        box-shadow: var(--shadow-xl);
    }

    &__inset-link {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        z-index: 1;
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
    }
    
    &__tags {
        margin-top: var(--spacing-2xl);
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: var(--spacing-md);

        > * {
            position: relative;
            z-index: 2;
        }
    }

    &__actions {
        user-select: none;
        margin-left: auto;
        display: flex;
        align-items: center;
        gap: var(--spacing-md);
        position: relative;
        z-index: 2;

        [class*="material-icons"] {
            cursor: pointer;
        }
    }

    &--columns {
        margin: 0;
        
        #{$root}__top {
            display: block;
            padding-right: 80px;
        }

        #{$root}__name {
            margin-bottom: var(--spacing-sm);
        }

        #{$root}__actions {
            position: absolute;
            right: var(--spacing-lg);
            top: var(--spacing-lg);
        }
    }
}
</style>