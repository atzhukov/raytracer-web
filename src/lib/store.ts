import {create} from 'zustand'
import {CameraSpec, SceneObject} from '@/lib/render/render'
import {github} from './demo'

interface GlobalStore {
	cameraSpec: CameraSpec
	scene: SceneObject[]
	setCameraSpec: (spec: Partial<CameraSpec>) => void
	addSceneObject: (object: SceneObject) => void
}

export const useGlobalStore = create<GlobalStore>((set) => ({
	cameraSpec: github.camera,
	scene: [],
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
