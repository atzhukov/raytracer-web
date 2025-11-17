import {expect, describe, it, vi, beforeEach} from 'vitest'
import {render as browserRender} from 'vitest-browser-react'
import Canvas from '@/components/canvas/canvas'
import {page} from 'vitest/browser'
import render, {Camera} from '@/lib/render/render'
import {useConfigurationStore} from '@/lib/store'
import {SceneObject} from '@/lib/objects'

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

const sphere: SceneObject<'sphere'> = {
	label: 'test sphere',
	type: 'sphere',
	center: [0, 0, 0],
	radius: 1,
	material: {
		type: 'metal',
		color: [126, 64, 32],
		fuzz: 0,
	},
}

describe('canvas', () => {
	beforeEach(() => {
		useConfigurationStore.setState({
			camera: camera,
			scene: [],
			dimensions: {width: 100, height: 50},
		})
		vi.clearAllMocks()
	})

	it('should display empty placeholder if no image is specified', async () => {
		const result = await browserRender(<Canvas />)
		const screen = page.elementLocator(result.baseElement)

		await expect
			.element(screen.getByRole('status', {name: 'Current status'}))
			.toHaveTextContent('Nothing to Render')
	})

	it('should display error placeholder with message if an error occurred', async () => {
		const errorMessage = 'mocked error in a test'
		const mockRender = vi.mocked(render)
		mockRender.mockRejectedValue(new Error(errorMessage))

		const state = useConfigurationStore.getState()
		state.addSceneObject(sphere)

		const result = await browserRender(<Canvas />)
		const screen = page.elementLocator(result.baseElement)

		await expect
			.element(screen.getByRole('status', {name: 'Current status'}))
			.toHaveTextContent('An error occurred')
		await expect
			.element(screen.getByRole('log', {name: 'Additional information'}))
			.toHaveTextContent(errorMessage)
	})

	it('should display the canvas element if rendering was successful', async () => {
		const mockRender = vi.mocked(render)
		mockRender.mockResolvedValue(new ImageData(1, 1))

		const state = useConfigurationStore.getState()
		state.addSceneObject(sphere)

		const result = await browserRender(<Canvas />)
		const screen = page.elementLocator(result.baseElement)

		await expect
			.element(
				screen.getByRole('img', {name: 'Image produced by the ray tracer'})
			)
			.toBeVisible()
	})
})
