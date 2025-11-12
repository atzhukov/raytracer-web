import {create} from 'zustand'
import {CameraSpec, RaytracerInput, SceneObject} from '@/lib/render/render'
import {github} from './demo'
import {useDebouncedCallback} from 'use-debounce'
import {useReducer} from 'react'

interface ConfigurationStore {
	cameraSpec: CameraSpec
	scene: SceneObject[]
	setCameraSpec: (spec: Partial<CameraSpec>) => void
	addSceneObject: (object: SceneObject) => void
}

const useConfigurationStore = create<ConfigurationStore>((set) => ({
	cameraSpec: github.camera,
	scene: github.scene,
	setCameraSpec: (spec) =>
		set((state) => ({
			cameraSpec: {...state.cameraSpec, ...spec},
			scene: state.scene,
		})),
	addSceneObject: (object) =>
		set((state) => ({
			cameraSpec: state.cameraSpec,
			scene: [...state.scene, object],
		})),
}))

/**
 * A hook that provides subscriptions to the current configuration.
 * @returns an object containing the camera state.
 */
export default function useConfiguration(): RaytracerInput {
	return {
		camera: useConfigurationStore((state) => state.cameraSpec),
		scene: useConfigurationStore((state) => state.scene),
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
	const initialCamera = useConfigurationStore.getState().cameraSpec
	const updateCamera = useConfigurationStore((state) => state.setCameraSpec)

	// Keep a local camera spec object and debounce changes to the configuration store,
	// so that the UI updates immediately but ray tracing only starts after a delay
	const updateGlobalCameraDebounced = useDebouncedCallback(
		(newState: CameraSpec) => updateCamera(newState),
		500
	)
	const [localCamera, updateLocalCamera] = useReducer(
		(state: CameraSpec, changes: Partial<CameraSpec>) => {
			const newState: CameraSpec = {...state, ...changes}
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
