import {clsx, type ClassValue} from 'clsx'
import {twMerge} from 'tailwind-merge'

/** A vector of three numeric values. */
export type Vec3 = [number, number, number]

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
