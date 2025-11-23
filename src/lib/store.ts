import {create} from 'zustand'
import {Camera, Scene} from '@/lib/render/render'
import {github} from './presets'
import {SceneObjectAny} from './objects'
import equal from 'fast-deep-equal'

export type CurrentState = {
	camera: Camera
	scene: Scene
	dimensions: Dimensions
}
export type Dimensions = {
	width: number
	height: number
}

export interface ConfigurationStore {
	queued: CurrentState
	committed: CurrentState
	live: boolean

	commit: () => void
	setLive: (live: boolean) => void

	updateCamera: (changes: Partial<Camera>) => void
	addSceneObject: (object: SceneObjectAny) => void
	updateSceneObject: (label: string, newObject: SceneObjectAny) => void
	removeSceneObject: (object: SceneObjectAny) => void
	clearScene: () => void
	setDimensions: (dimensions: Dimensions) => void
}

const initialState = {
	camera: github.camera,
	scene: github.scene,
	dimensions: {width: 300, height: 300},
}

export const useConfigurationStore = create<ConfigurationStore>()((set) => ({
	queued: {...initialState},
	committed: {...initialState},
	live: true,

	commit: () =>
		set((state) => {
			if (equal(state.queued, state.committed)) {
				return state
			}
			return {
				...state,
				committed: state.queued,
			}
		}),

	setLive: (live) => set((state) => ({...state, live})),

	updateCamera: (changes) =>
		set((state) => ({
			...state,
			queued: {...state.queued, camera: {...state.queued.camera, ...changes}},
		})),

	addSceneObject: (object) =>
		set((state) => ({
			...state,
			queued: {...state.queued, scene: [...state.queued.scene, object]},
		})),

	updateSceneObject: (label, newObject) =>
		set((state) => {
			const scene = state.queued.scene.map((object) =>
				object.label == label ? newObject : object
			)
			return {
				...state,
				queued: {...state.queued, scene},
			}
		}),

	removeSceneObject: (object) =>
		set((state) => {
			const scene = state.queued.scene.filter(
				(currentObject) => currentObject != object
			)
			return {...state, queued: {...state.queued, scene}}
		}),

	clearScene: () =>
		set((state) => ({
			...state,
			queued: {...state.queued, scene: []},
		})),

	setDimensions: (dimensions) =>
		set((state) => ({
			...state,
			queued: {...state.queued, dimensions},
		})),
}))
