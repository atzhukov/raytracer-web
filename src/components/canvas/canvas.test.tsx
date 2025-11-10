import {expect, describe, it, vi} from 'vitest'
import {render as brender} from 'vitest-browser-react'
import Canvas from '@/components/canvas/canvas'
import {page} from 'vitest/browser'
import render, {RaytracerInput} from '@/lib/render'
import {beforeEach} from 'node:test'

vi.mock(import('@/lib/render'), () => {
	return {
		default: vi.fn(),
	}
})

const testImage: RaytracerInput = {
	camera: {fov: 45},
	scene: [
		{
			label: 'test sphere',
			type: 'sphere',
			center: [0, 0, 0],
			radius: 1,
			material: {
				type: 'metal',
				color: [126, 64, 32],
				fuzz: 0,
			},
		},
	],
}

describe('canvas', () => {
	beforeEach(() => vi.clearAllMocks())

	it('should display empty placeholder if no image is specified', async () => {
		const result = await brender(
			<Canvas width={100} height={50} image={null} />
		)
		const screen = page.elementLocator(result.baseElement)

		await expect
			.element(screen.getByRole('status', {name: 'Current status'}))
			.toHaveTextContent('Nothing to Render')
	})

	it('should display error placeholder with message if an error occurred', async () => {
		const errorMessage = 'mocked error in a test'
		const mockRender = vi.mocked(render)
		mockRender.mockRejectedValue(new Error(errorMessage))

		const result = await brender(
			<Canvas width={100} height={50} image={testImage} />
		)
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

		const result = await brender(
			<Canvas width={100} height={50} image={testImage} />
		)
		const screen = page.elementLocator(result.baseElement)

		await expect
			.element(
				screen.getByRole('img', {name: 'Image produced by the ray tracer'})
			)
			.toBeVisible()
	})
})
