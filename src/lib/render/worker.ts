import {RaytracerInput} from './render'

export type RequestMessage = {
	input: RaytracerInput
	width: number
	height: number
}

export type ResponseMessage =
	| {
			tag: 'success'
			pixels: Uint8ClampedArray
	  }
	| {
			tag: 'error'
			message: string
	  }

function postImage(pixels: Uint8ClampedArray) {
	const response = {
		tag: 'success',
		pixels,
	} satisfies ResponseMessage
	self.postMessage(response)
}

function postError(message: string) {
	const response = {
		tag: 'error',
		message,
	} satisfies ResponseMessage
	self.postMessage(response)
}

globalThis.onmessage = async (event: MessageEvent<RequestMessage>) => {
	try {
		const {input, width, height} = event.data

		const raytracer = await import('@/../pkg/raytracer.js')
		await raytracer.default({
			module_or_path: `${self.location.origin}/raytracer_bg.wasm`,
		})

		const pixels = raytracer.render(input, width, height)
		const imageDataArray = new Uint8ClampedArray(pixels)
		postImage(imageDataArray)
	} catch (error) {
		postError(error instanceof Error ? error.message : 'Unknown error')
	}
}
