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