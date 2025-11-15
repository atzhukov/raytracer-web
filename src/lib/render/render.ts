import {SceneObjectAny} from '@/lib/objects'
import {RequestMessage, ResponseMessage} from './worker'
import {workerManager} from './manager'

/*** The input type for the WASM raytracer module. */
export type RaytracerInput = {
	camera: CameraSpec
	scene: Scene
}

/*** The camera configuration. */
export type CameraSpec = {
	fov: number
	source: Vec3
	target: Vec3
	aperture: number
	focusDistance: number
}

/** The scene to be rendered. */
export type Scene = SceneObjectAny[]

/** A material of an object. */
export type Material =
	| {
			type: 'matte'
			color: Vec3
	  }
	| {
			type: 'dielectric'
			ridx: number
	  }
	| {
			type: 'metal'
			color: Vec3
			fuzz: number
	  }

/**
 * A vector of three numeric values.
 */
export type Vec3 = [number, number, number]

/**
 * Renders a specified scene using the WASM raytracer module.
 * @param input the camera and scene configuration.
 * @returns a promise containing the image data.
 */
export default async function render(
	input: RaytracerInput,
	width: number,
	height: number
): Promise<ImageData> {
	return new Promise((resolve, reject) => {
		const worker = workerManager.createNew()

		worker.onmessage = (event: MessageEvent<ResponseMessage>) => {
			if (event.data.tag == 'success') {
				const pixels = event.data.pixels as ImageDataArray
				const imageData = new ImageData(pixels, width, height)
				workerManager.finished()
				resolve(imageData)
			} else if (event.data.tag == 'error') {
				workerManager.finished()
				reject(new Error(event.data.message))
			}
		}

		worker.postMessage({input, width, height} satisfies RequestMessage)
	})
}
