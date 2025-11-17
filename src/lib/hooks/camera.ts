'use client'

import {useDebouncedCallback} from 'use-debounce'
import {useConfigurationStore} from '../store'
import {Camera} from '../render/render'
import {useReducer} from 'react'

/**
 * A hook that provides a local camera state and functions to change state.
 * This is useful for UI to prevent blocking the main thread.
 * Changes are committed to a global store after a delay.
 * @param live - determines whether changes are committed to the global camera state automatically (default: false).
 * @returns an object containing the current camera state and functions to change state.
 */
export default function useCamera(live = false) {
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
