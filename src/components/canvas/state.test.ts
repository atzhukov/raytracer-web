import {beforeAll, describe, expect, it, vi} from 'vitest'
import progress, {State} from './state'

beforeAll(() => {
	vi.stubGlobal(
		'ImageData',
		class {
			width: number
			height: number
			constructor(width: number, height: number) {
				this.width = width
				this.height = height
			}
		}
	)
})

describe('progress', () => {
	it('should correctly transition to empty state', () => {
		const state: State = {
			imageData: new ImageData(0, 0),
			errorMessage: 'msg',
			state: 'error',
		}
		const newState = progress(state, {to: 'empty'})

		expect(newState.state).toBe('empty')
		expect(newState.imageData).toBeNull()
		expect(newState.errorMessage).toBeNull()
	})

	it('should correctly transition to working state', () => {
		const imageData = new ImageData(0, 0)
		const state: State = {
			imageData,
			errorMessage: null,
			state: 'done',
		}
		const newState = progress(state, {to: 'working'})

		expect(newState.state).toBe('working')
		expect(newState.imageData).toBe(imageData)
		expect(newState.errorMessage).toBeNull()
	})

	it('should correctly transition to error state', () => {
		const imageData = new ImageData(0, 0)
		const state: State = {
			imageData,
			errorMessage: null,
			state: 'working',
		}
		const newState = progress(state, {to: 'error', message: 'msg'})

		expect(newState.state).toBe('error')
		expect(newState.imageData).toBe(imageData)
		expect(newState.errorMessage).toEqual('msg')
	})

	it('should correctly transition to done state', () => {
		const imageData = new ImageData(0, 0)
		const state: State = {
			imageData,
			errorMessage: 'msg',
			state: 'working',
		}

		const newImageData = new ImageData(1, 1)
		const newState = progress(state, {to: 'done', imageData: newImageData})

		expect(newState.state).toBe('done')
		expect(newState.imageData).toBe(newImageData)
		expect(newState.errorMessage).toBeNull()
	})
})
