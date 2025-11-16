import {describe, expect, it, vi} from 'vitest'
import {render} from 'vitest-browser-react'
import MaterialPicker from './material'
import {Material, materialTypes} from '@/lib/render/render'
import {page} from 'vitest/browser'
import {capitalize} from '@/lib/utils'

describe('material picker', () => {
	it('should include available materials', async () => {
		const material: Material = {type: 'dielectric', ridx: 0.67}

		const result = await render(
			<MaterialPicker value={material} onChange={vi.fn()} />
		)
		const screen = page.elementLocator(result.baseElement)

		const dropdown = screen.getByRole('combobox')
		await dropdown.click()

		for (const type of materialTypes) {
			const option = screen.getByRole('option', {name: capitalize(type)!})
			expect(option).toBeVisible()
		}
	})

	it('should include color picker for matte', async () => {
		const material: Material = {type: 'matte', color: [0.4, 0.5, 0.6]}

		const result = await render(
			<MaterialPicker value={material} onChange={vi.fn()} />
		)
		const screen = page.elementLocator(result.baseElement)

		const colorPicker = screen.getByLabelText('Color Picker')
		expect(colorPicker).toBeVisible()
	})

	it('should include color picker for metal', async () => {
		const material: Material = {
			type: 'metal',
			color: [0.4, 0.5, 0.6],
			fuzz: 0.3,
		}

		const result = await render(
			<MaterialPicker value={material} onChange={vi.fn()} />
		)
		const screen = page.elementLocator(result.baseElement)

		const colorPicker = screen.getByLabelText('Color Picker')
		expect(colorPicker).toBeVisible()
	})

	it('should call onChange callback when changes occur', async () => {
		const material: Material = {
			type: 'matte',
			color: [0.4, 0.5, 0.6],
		}

		const callbacks = {
			onChange: (material: Material) => {},
		}
		const onChangeSpy = vi.spyOn(callbacks, 'onChange')

		const result = await render(
			<MaterialPicker value={material} onChange={callbacks.onChange} />
		)
		const screen = page.elementLocator(result.baseElement)

		const field = screen.getByLabelText('Current color hex value')
		await field.fill('AAAAAA')

		expect(onChangeSpy).toHaveBeenCalledWith(
			expect.objectContaining({
				type: 'matte',
				color: expect.arrayContaining([170 / 255, 170 / 255, 170 / 255]),
			})
		)
	})
})
