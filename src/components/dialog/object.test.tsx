import {describe, expect, it} from 'vitest'
import {render} from 'vitest-browser-react'
import {AddObjectDropdownMenu} from './object'
import {page} from 'vitest/browser'

describe('add objects dropdown', () => {
	it('should open sphere dialog when clicking on sphere', async () => {
		const result = await render(<AddObjectDropdownMenu />)
		const screen = page.elementLocator(result.baseElement)

		await screen.getByRole('button', {name: 'Add'}).click()

		const sphereItem = screen.getByRole('menuitem', {name: 'Sphere'})
		expect(sphereItem).toBeInTheDocument()

		await sphereItem.click()
		const sphereDialogTitle = screen.getByRole('dialog', {name: 'Add Sphere'})
		expect(sphereDialogTitle).toBeInTheDocument()
	})
})
