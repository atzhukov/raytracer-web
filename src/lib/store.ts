import {create} from 'zustand'
import {CameraSpec} from '@/lib/render'
import {github} from './demo'

interface GlobalStore {
	// input: RaytracerInput | null
	cameraSpec: CameraSpec
	// setInput: (newInput: RaytracerInput) => void
	setCameraSpec: (spec: Partial<CameraSpec>) => void
	// updateCamera: (camera: Partial<CameraSpec>) => void
}

export const useGlobalStore = create<GlobalStore>((set) => ({
	// input: github,
	cameraSpec: github.camera,
	setCameraSpec: (spec) =>
		set((state) => ({cameraSpec: {...state.cameraSpec, ...spec}})),
}))
