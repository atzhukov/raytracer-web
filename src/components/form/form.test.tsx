import render, {Camera} from '@/lib/render/render'
import {useConfigurationStore} from '@/lib/store'
import {beforeEach, describe, it, vi} from 'vitest'
// import {render as browserRender} from 'vitest-browser-react'
// import {page} from 'vitest/browser'
// import CameraFieldSet from './camera'

vi.mock(import('@/lib/render/render'), () => {
	return {
		default: vi.fn(),
	}
})

const camera: Camera = {
	fov: 45,
	source: [0, 0, -1],
	target: [0, 0, 0],
	aperture: 0,
	focusDistance: 1,
}

const initial = {
	camera: camera,
	scene: [],
	dimensions: {width: 100, height: 50},
}

describe('Form', () => {
	beforeEach(() => {
		useConfigurationStore.setState({
			queued: initial,
			committed: initial,
			live: false,
		})
		vi.clearAllMocks()
	})

	// there seems to be a bug in next or vitest:
	// rendering <Form /> causes 'ReferenceError: process is not defined'
	it.skip('should update global state on changes in live mode', async () => {
		const mockRender = vi.mocked(render)
		mockRender.mockResolvedValue(new ImageData(1, 1))

		// const result = await browserRender(<Form />)
		// const screen = page.elementLocator(result.baseElement)

		// const xCoordinateInput = screen.getByLabelText('The X coordinate')
		// await xCoordinateInput.fill('10')
	})
})
