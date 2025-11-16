import {create} from 'zustand'
import {Camera, Scene} from '@/lib/render/render'
import {github} from './presets'
import {useDebouncedCallback} from 'use-debounce'
import {useReducer} from 'react'
import {SceneObjectAny} from './objects'

interface ConfigurationStore {
	camera: Camera
	updateCamera: (changes: Partial<Camera>) => void

	scene: Scene
	addSceneObject: (object: SceneObjectAny) => void
	removeSceneObject: (object: SceneObjectAny) => void
	clearScene: () => void
}

export const useConfigurationStore = create<ConfigurationStore>((set) => ({
	camera: github.camera,
	updateCamera: (changes) =>
		set((state) => ({
			camera: {...state.camera, ...changes},
			scene: state.scene,
		})),

	scene: github.scene,
	addSceneObject: (object) =>
		set((state) => ({
			camera: state.camera,
			scene: [...state.scene, object],
		})),
	removeSceneObject: (object) =>
		set((state) => ({
			camera: state.camera,
			scene: state.scene.filter((currentObject) => currentObject != object),
		})),
	clearScene: () =>
		set((state) => ({
			camera: state.camera,
			scene: [],
		})),
}))

/**
 * A hook that provides subscriptions to the current configuration.
 * @returns an object containing the camera state.
 */
export default function useConfiguration() {
	return {
		camera: useConfigurationStore((state) => state.camera),
		scene: useConfigurationStore((state) => state.scene),
		removeSceneObject: useConfigurationStore(
			(state) => state.removeSceneObject
		),
		clearScene: useConfigurationStore((state) => state.clearScene),
	}
}

/**
 * A hook that provides a local camera state and functions to change state.
 * This is useful for UI to prevent blocking the main thread.
 * Changes are committed to a global store after a delay.
 * @param live - determines whether changes are committed to the global camera state automatically (default: false).
 * @returns an object containing the current camera state and functions to change state.
 */
export function useCamera(live = false) {
	const initialCamera = useConfigurationStore.getState().camera
	const updateCamera = useConfigurationStore((state) => state.updateCamera)

	// Keep a local camera spec object and debounce changes to the configuration store,
	// so that the UI updates immediately but ray tracing only starts after a delay
	const updateGlobalCameraDebounced = useDebouncedCallback(
		(newState: Camera) => updateCamera(newState),
		500
	)
	const [localCamera, updateLocalCamera] = useReducer(
		(state: Camera, changes: Partial<Camera>) => {
			const newState: Camera = {...state, ...changes}
			if (live) {
				updateGlobalCameraDebounced(newState)
			}
			return newState
		},
		initialCamera
	)

	return {
		/** The current camera state. */
		camera: localCamera,
		/** Updates the camera state, and flushes changes to the global store after a delay. */
		updateCamera: updateLocalCamera,
		/** Immediately flushes camera changes to the global store. */
		flushCamera: () => updateCamera(localCamera),
	}
}
