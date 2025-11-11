'use client'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import {Slider} from '@/components/ui/slider'
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldSet,
} from '@/components/ui/field'
import {Button} from '../ui/button'
import {Play} from 'lucide-react'
import {useGlobalStore} from '@/lib/store'
import {useDebouncedCallback} from 'use-debounce'
import {CameraSpec} from '@/lib/render'
import {useReducer} from 'react'

export default function Form() {
	const globalStore = useGlobalStore()

	const debounce = useDebouncedCallback(() => {
		globalStore.setCameraSpec(cameraSpec)
	}, 500)

	const [cameraSpec, updateCameraSpec] = useReducer(
		(state: CameraSpec, change: Partial<CameraSpec>) => {
			const updated = {...state, ...change}
			debounce()
			return updated
		},
		globalStore.cameraSpec
	)

	const cameraSettings = (
		<FieldSet>
			<FieldGroup>
				<Field>
					<FieldLabel htmlFor='fov'>Field of View</FieldLabel>
					<div className='flex gap-2 align-center items-center'>
						<Slider
							id='fov'
							value={[globalStore.cameraSpec.fov]}
							onValueChange={(v) => updateCameraSpec({fov: v[0]})}
							min={0}
							max={100}
							step={1}
							aria-label='Field of View'
						/>
						<span>{globalStore.cameraSpec.fov}&deg;</span>
					</div>
					<FieldDescription>Describes the field of view</FieldDescription>
				</Field>
			</FieldGroup>
		</FieldSet>
	)

	return (
		<form>
			<Accordion type='single' defaultValue='camera-settings' collapsible>
				<AccordionItem value='camera-settings'>
					<AccordionTrigger>Camera Settings</AccordionTrigger>
					<AccordionContent>{cameraSettings}</AccordionContent>
				</AccordionItem>

				<AccordionItem value='scene'>
					<AccordionTrigger>Scene</AccordionTrigger>
					<AccordionContent>
						Yes. It adheres to the WAI-ARIA design pattern.
					</AccordionContent>
				</AccordionItem>
			</Accordion>
			<div className='flex justify-end'>
				<Button variant='outline' size='sm'>
					<Play /> Render
				</Button>
			</div>
		</form>
	)
}
