import {create} from 'zustand'
import {Camera, Scene} from '@/lib/render/render'
import {github} from './presets'
import {SceneObjectAny} from './objects'
import equal from 'fast-deep-equal'

type Dimensions = {
	width: number
	height: number
}

interface ConfigurationStore {
	camera: Camera
	updateCamera: (changes: Partial<Camera>) => void

	scene: Scene
	addSceneObject: (object: SceneObjectAny) => void
	updateSceneObject: (label: string, newObject: SceneObjectAny) => void
	removeSceneObject: (object: SceneObjectAny) => void
	clearScene: () => void

	dimensions: Dimensions
	setDimensions: (dimensions: Dimensions) => void
}

export const useConfigurationStore = create<ConfigurationStore>((set) => ({
	camera: github.camera,
	updateCamera: (changes) =>
		set((state) => {
			const newCamera = {...state.camera, ...changes}
			// Refuse update if new state is unchanged to save some re-renders
			if (equal(state.camera, newCamera)) {
				return state
			}
			return {
				...state,
				camera: newCamera,
				scene: state.scene,
			}
		}),

	scene: github.scene,
	addSceneObject: (object) =>
		set((state) => ({
			...state,
			camera: state.camera,
			scene: [...state.scene, object],
		})),
	updateSceneObject: (label, newObject) =>
		set((state) => {
			const newScene = [...state.scene]
			const index = newScene.findIndex((object) => object.label == label)
			newScene[index] = newObject
			return {
				...state,
				camera: state.camera,
				scene: newScene,
			}
		}),
	removeSceneObject: (object) =>
		set((state) => ({
			...state,
			camera: state.camera,
			scene: state.scene.filter((currentObject) => currentObject != object),
		})),
	clearScene: () =>
		set((state) => ({
			...state,
			camera: state.camera,
			scene: [],
		})),

	dimensions: {width: 304, height: 171},
	setDimensions: (dimensions) =>
		set((state) => ({
			...state,
			dimensions,
		})),
}))
