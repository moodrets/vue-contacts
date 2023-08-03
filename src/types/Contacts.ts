export interface IContactItem {
    fullName: string
	phone: string
	email: string
	id?: number
	tags?: string[]
}

export interface IConctactsFilter {
	name: string
	email: string
	phone: string
	tag: string
}

export type ContactsListViewType = 'rows' | 'columns'