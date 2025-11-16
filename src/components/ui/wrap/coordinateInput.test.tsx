import {describe, expect, it, vi} from 'vitest'
import {render as browserRender} from 'vitest-browser-react'
import {page} from 'vitest/browser'
import CoordinateInput from './coordinateInput'
import {Vec3} from '@/lib/utils'

describe('CoordinateInput', () => {
	it('should call onChange callback with correct values', async () => {
		const props = {
			values: [0, 0, 0] as Vec3,
			onChange: () => {},
		}
		const onChangeSpy = vi.spyOn(props, 'onChange')

		const result = await browserRender(<CoordinateInput {...props} />)
		const screen = page.elementLocator(result.baseElement)

		await screen.getByLabelText('The Y coordinate').fill('-5')
		expect(onChangeSpy).toHaveBeenCalledWith(expect.arrayContaining([0, -5, 0]))
	})

	it('should treat empty input as zero', async () => {
		const props = {
			values: [1, 1, 1] as Vec3,
			onChange: () => {},
		}
		const onChangeSpy = vi.spyOn(props, 'onChange')

		const result = await browserRender(<CoordinateInput {...props} />)
		const screen = page.elementLocator(result.baseElement)

		await screen.getByLabelText('The X coordinate').fill('')
		expect(onChangeSpy).toHaveBeenCalledWith(expect.arrayContaining([0, 1, 1]))
	})
})
