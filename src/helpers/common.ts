export class AppStorage {
	public static setItem<T>(key: string, data: T): void {
		localStorage.setItem(key, JSON.stringify(data))
	}

	public static getItem<T>(key: string): T | null {
		const storageData = localStorage.getItem(key)
		return storageData ? JSON.parse(storageData) as T : null
	}

	public static removeItem(key: string): void {
		localStorage.removeItem(key)
	}

	public static clear(): void {
		localStorage.clear()
	}
}

export const debounce = (fn: any, delay = 0, immediate = false) => {
	let timeout: any
	return (...args: any) => {
		if (immediate && !timeout) fn(...args)
		clearTimeout(timeout)

		timeout = setTimeout(() => {
			fn(...args)
		}, delay)
	}
}

export const phoneTrim = (phone: string): string => {
	let formatedPhone = phone.trim()
	formatedPhone = formatedPhone.replace(/\s/g, '')
	formatedPhone = formatedPhone.replace(/[()\-+]/g, '')
	return formatedPhone
}