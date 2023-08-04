import { ref } from "vue"
import { AppStorage } from "@/helpers/common"
import { RDToast } from "@/libs/toast"
import { IContactItem } from "@/types/Contacts"

const storageConctactList = AppStorage.getItem<IContactItem[]>('contacts_list')

export const contactList = ref<IContactItem[]>(storageConctactList || [])

export const onRemoveItem = (contactItem: IContactItem, toast: RDToast | null, callback?: () => void) => {
    if (window.confirm(`Are you sure to delete "${contactItem.fullName}"?`) && contactItem.id) {
        toast?.show('success', 'Сontact deleted')
        contactList.value = contactList.value.filter(item => item.id !== contactItem.id)
        AppStorage.setItem('contacts_list', contactList.value)
        callback && callback()
    }
}