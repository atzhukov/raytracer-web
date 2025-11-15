import {SceneObject, SceneObjectType} from '@/lib/render/render'
import {Radius} from 'lucide-react'

// MARK: - Supported objects
// (configure here)
const supportedObjects: SceneObjectConfig = {
	sphere: {
		icon: <Radius size={16} />,
		description: (sphere) =>
			`${capitalize(sphere.material.type)} ${capitalize(sphere.type)} ` +
			`at (${sphere.center[0]}, ${sphere.center[1]}, ${sphere.center[2]}) ` +
			`with radius ${sphere.radius}`,
	},
}

export default function properties(object: SceneObject): SceneObjectProperties {
	const config = supportedObjects[object.type]
	return {
		...config,
		description: config.description(object),
	}
}

// MARK: - Helpers
type SceneObjectConfig = Record<SceneObjectType, SceneObjectTypeProperties>
type SceneObjectProperties =
	ReplaceFunctionsWithReturnTypes<SceneObjectTypeProperties>

type ReplaceFunctionsWithReturnTypes<T> = {
	[K in keyof T]: T[K] extends (...args: any[]) => infer R ? R : T[K]
}

type SceneObjectTypeProperties = {
	icon: React.ReactNode
	description: (object: SceneObject) => string
}

function capitalize(string: string): string {
	const first = string.charAt(0).toUpperCase()
	return first + string.substring(1)
}
