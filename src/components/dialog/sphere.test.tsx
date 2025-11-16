import {describe, expect, it} from 'vitest'
import {render} from 'vitest-browser-react'
import {AddObjectDropdownMenu} from './object'
import {Locator, page} from 'vitest/browser'
import {SceneObjectType} from '@/lib/objects'

describe('sphere dialog', () => {
	it('should validate that label is set', async () => {
		const result = await render(<AddObjectDropdownMenu />)
		const screen = page.elementLocator(result.baseElement)

		const dialog = await openDialog('sphere', screen)

		const labelField = dialog.getByLabelText('Label')
		await labelField.clear()

		// Since no label is typed in, dialog should not close and show an error
		const saveButton = dialog.getByRole('button', {name: 'Save sphere'})
		await saveButton.click()
		expect(dialog).toBeInTheDocument()

		const labelFieldError = dialog.getByRole('alert')
		expect(labelFieldError).toHaveTextContent('A label is required.')

		// After filling the label, the dialog should close
		await labelField.fill('My Sphere')
		await saveButton.click()
		expect(dialog).not.toBeInTheDocument()
	})
})

async function openDialog(type: SceneObjectType, screen: Locator) {
	await screen.getByRole('button', {name: 'Add'}).click()
	const sphereItem = screen.getByRole('menuitem', {name: 'Sphere'})
	await sphereItem.click()

	return screen.getByRole('dialog')
}
