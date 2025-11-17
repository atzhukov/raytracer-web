import {Vec3} from './utils'

/** A material of an object. */
export type MaterialAny = _Matte | _Dielectric | _Metal
type _Matte = {
	type: 'matte'
	color: Vec3
}
type _Dielectric = {
	type: 'dielectric'
	ridx: number
}
type _Metal = {
	type: 'metal'
	color: Vec3
	fuzz: number
}

/** A factory for new materials with initial values. */
export const initialMaterials: MaterialConfig = {
	matte: () => ({
		type: 'matte',
		color: [0.16, 0.37, 0.3],
	}),
	dielectric: () => ({
		type: 'dielectric',
		ridx: 1.5,
	}),
	metal: () => ({
		type: 'metal',
		color: [0.37, 0.32, 0.16],
		fuzz: 0,
	}),
}

/** Returns a list of available material types. */
export function materialTypes(): MaterialType[] {
	return Object.entries(initialMaterials).map(([type]) => type as MaterialType)
}

/** A type of a material. */
export type MaterialType = MaterialAny['type']
/** A material of a specific type. */
export type Material<T extends MaterialType> = Extract<MaterialAny, {type: T}>

type MaterialConfig = {
	readonly [T in MaterialAny['type']]: () => Extract<MaterialAny, {type: T}>
}
