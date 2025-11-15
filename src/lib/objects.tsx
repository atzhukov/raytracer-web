import {Radius} from 'lucide-react'
import {capitalize} from '@/lib/utils'
import {Material, Vec3} from '@/lib/render/render'

// MARK: - Supported Scene Objects

/** An object of a scene. */
export type SceneObjectAny = _Sphere & {
	label?: string
	material: Material
}
type _Sphere = {
	type: 'sphere'
	center: Vec3
	radius: number
}

/** A type of a scene object. */
export type SceneObjectType = SceneObjectAny['type']
/** A scene object of a particular type. */
export type SceneObject<T extends SceneObjectType> = Extract<
	SceneObjectAny,
	{type: T}
>

// MARK: - Configuration for Supported Objects
// (configure here)

export const supportedObjects: SupportedObjectTypeConfigs = {
	sphere: {
		icon: <Radius size={16} />,
		description: (sphere) =>
			`${capitalize(sphere.material.type)} ${capitalize(sphere.type)} ` +
			`at (${sphere.center[0]}, ${sphere.center[1]}, ${sphere.center[2]}) ` +
			`with radius ${sphere.radius}`,
	},
}

/**
 * Returns resolved properties for a scene object instance.
 * @param object the scene object to resolve properties for.
 * @returns the object with resolved properties.
 */
export default function properties<T extends SceneObjectType>(
	object: SceneObject<T>
): ObjectTypeResolvedConfig<T> {
	const config = supportedObjects[object.type]
	return {
		...config,
		description: config.description(object),
	}
}

// MARK: - Type Definitions
// This turned into a bit of a type system practice...

/** The type that represents configurations for supported object types.
 *  The keys are the object types and the values are the respective configurations.
 */
type SupportedObjectTypeConfigs = {
	readonly [T in SceneObjectType]: ObjectTypeConfig<T>
}

/** The type that represents configuration for a particular object type `T`. */
type ObjectTypeConfig<T extends SceneObjectType> = {
	icon: React.ReactNode
	description: (object: SceneObject<T>) => string
}

/** The type that represents a resolved configuration for a particular scene object instance
 *  of type `T`.
 */
type ObjectTypeResolvedConfig<T extends SceneObjectType> =
	ReplaceFunctionsWithReturnTypes<ObjectTypeConfig<T>>

/** Helper type that replaces all function types in an object with their return types. */
type ReplaceFunctionsWithReturnTypes<T> = {
	// we do not care about the the function's arguments here at all
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	[K in keyof T]: T[K] extends (...args: any[]) => infer R ? R : T[K]
}
