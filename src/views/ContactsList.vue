<template>
    <div class="page-layout">
        <aside class="page-layout__aside">
            <ContactFilter 
                :contacts="contactList"
                :fields="filterData"
                :tag-list="tagList"
                @filter="onEmitFilter($event)"
            ></ContactFilter>
        </aside>
        <main class="page-layout__content">
            <div v-if="filteredContactList.length" class="contacts-list" :class="`contacts-list--${viewType}`">
                <div class="contacts-list__top">
                    <div></div>
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
                        v-for="contact in filteredContactList" 
                        :key="contact.id"
                        :data="contact" 
                        :view-type="viewType"
                        @link="onOpenItem($event)"
                        @edit="onEditItem($event)"
                        @remove="onRemoveItem($event, toast)"
                        @tag="onClickTag($event)"
                    ></ContactItem>
                </div>
            </div>
            <div v-else class="not-found-text">
                <div class="material-icons-round">developer_board_off</div>
                <span>Contacts not found</span>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import ContactItem from '@/components/contacts/Item.vue'
import ContactFilter from '@/components/contacts/Filter.vue'
import { ref, reactive, computed, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { IContactItem, ContactsListViewType, IConctactsFilter } from '@/types/Contacts'
import { AppStorage, phoneTrim } from '@/helpers/common'
import { contactList, onRemoveItem } from '@/reactive/useContacts'
import { useToast } from '@/plugins/useToastPlugin'

const toast = useToast()

const router = useRouter()

const filterData = reactive<IConctactsFilter>({
    name: '',
    email: '',
    phone: '',
    tag: ''
})

const storageConctactViewType = AppStorage.getItem<ContactsListViewType>('contacts_view_type')

const viewType = ref<ContactsListViewType>(storageConctactViewType || 'rows')

const tagList = computed<string[]>(() => {
    let resultTags: string[] = []

    contactList.value.forEach(item => {
        if (item.tags) {
            resultTags.push(...item.tags)
        }
    })

    return [...new Set(resultTags)]
})

const filteredContactList = computed<IContactItem[]>(() => {
    let resultList: IContactItem[] = [...contactList.value]

	if (filterData.name) {
		resultList = resultList.filter((item) => {
			const fullNameLowercase = item.fullName.toLocaleLowerCase()
			const filterFullNameLowercase = filterData.name.toLocaleLowerCase()
			if (fullNameLowercase.includes(filterFullNameLowercase)) {
				return item
			}
		})
	}

	if (filterData.email) {
		resultList = resultList.filter((item) => {
			if (item.email.includes(filterData.email)) {
				return item
			}
		})
	}

	if (filterData.phone) {
		resultList = resultList.filter((item) => {
			const itemPhoneFormat = phoneTrim(item.phone)
			const filterPhoneFormat = phoneTrim(filterData.phone)
			if (itemPhoneFormat.includes(filterPhoneFormat)) {
				return item
			}
		})
	}

	if (filterData.tag) {
		resultList = resultList.filter((item) => item.tags?.includes(filterData.tag))
	}

	return resultList
})

const changeViewType = (key: ContactsListViewType) => {
    viewType.value = key
    AppStorage.setItem('contacts_view_type', key)
}

const onOpenItem = (contactItem: IContactItem) => {
    router.push({
        name: 'contacts.view',
        params: {
            id: contactItem.id
        },
    })
}

const onEditItem = (contactItem: IContactItem) => {
    router.push({
        name: 'contacts.edit',
        params: {
            id: contactItem.id
        },
    })
}

const updateRouterQuery = () => {
    let query: Record<string, string> = {}

    for (const key in filterData) {
        let value = filterData[key as keyof IConctactsFilter] 
        if (value !== '') {
            query[key] = value
        }
    }

    router.push({
        name: 'contacts.list',
        query: query
    })
}

const onClickTag = (tag: string) => {
    filterData.tag = tag
    updateRouterQuery()
}

const onEmitFilter = (data: {key: keyof IConctactsFilter, value: string}) => {
    filterData[data.key] = data.value
    updateRouterQuery()
}

onBeforeMount(() => {
    const urlSearchParams = new URLSearchParams(document.location.search)
    urlSearchParams.forEach((value, key) => {
        if (key in filterData) {
            filterData[key as keyof IConctactsFilter] = value
        }
    })
})
</script>

<style lang="scss">
.contacts-list {
    $root: &;
    padding-bottom: var(--spacing-3xl);

    &--columns {
        #{$root}__content {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
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