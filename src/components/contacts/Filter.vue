<template>
    <div class="contacts-filter" :class="contacts.length === 0 ? 'contacts-filter--disabled' : ''">
        <div class="contacts-filter__header">
            <span class="material-icons-outlined">filter_list</span>
            <div>Filter contacts</div>
        </div>
        <form @submit.prevent="onSubmit">
            <label class="form-field">
                <div class="form-field__label">By name</div>
                <div class="form-field__content">
                    <input :value="fields.name" type="text" class="form-control" @input="onInput($event, 'name')">
                </div>
            </label>
            <label class="form-field">
                <div class="form-field__label">By email</div>
                <div class="form-field__content">
                    <input :value="fields.email" type="text" class="form-control" @input="onInput($event, 'email')">
                </div>
            </label>
            <label class="form-field">
                <div class="form-field__label">By phone</div>
                <div class="form-field__content">
                    <input :value="fields.phone" type="text" class="form-control" @input="onInput($event, 'phone')">
                </div>
            </label>
            <div class="form-field">
                <div class="form-field__label">By tags</div>
                <div class="form-field__content form-field__content--flex">
                    <button 
                        v-for="tag in tagList" 
                        :key="tag" 
                        type="button" 
                        class="app-button"
                        :class="fields.tag === tag ? 'app-button--primary' : 'app-button--light'"
                        @click="onSetTag(tag)"
                    >
                        {{ tag }}
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { debounce } from '@/helpers/common'
import { IConctactsFilter, IContactItem } from '@/types/Contacts'

const props = withDefaults(
    defineProps<{
        contacts: IContactItem[],
        fields: IConctactsFilter,
        tagList: string[],
    }>(),
    {
        tagList: () => [],
        contacts: () => [],
        fields: () => ({
            name: '',
            email: '',
            phone: '',
            tag: ''
        })
    }
)

const emits = defineEmits(['filter'])

const onSubmit = () => {}

const onSetTag = (tag: string) => {
    emits('filter', {
        key: 'tag',
        value: props.fields.tag === tag ? '' : tag
    })
}

const onInput = debounce((event: Event, field: keyof IConctactsFilter) => {
    emits('filter', {
        key: field,
        value: (event.target as HTMLInputElement).value
    })
}, 300)
</script>

<style lang="scss">
.contacts-filter {
    &__header {
        display: flex;
        align-items: center;
        font-size: 22px;
        font-weight: bold;
        margin-bottom: var(--spacing-xl);

        [class*="material-icons"] {
            margin-right: var(--spacing-md);
        }
    }

    &--disabled {
        opacity: .6;
        pointer-events: none;
    }
}
</style>