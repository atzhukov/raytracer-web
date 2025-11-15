import {clsx, type ClassValue} from 'clsx'
import {twMerge} from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function capitalize(string?: string | null) {
	if (!string) {
		return string
	}
	const first = string.charAt(0).toUpperCase()
	return first + string.substring(1)
}
