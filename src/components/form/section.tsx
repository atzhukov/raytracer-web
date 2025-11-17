import {Camera, ImageIcon, Trash2} from 'lucide-react'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import CameraFieldSet, {CameraFieldProps} from './camera'
import {Button} from '@/components/ui/button'
import SceneObjectsList from './scene'
import {AddObjectDropdownMenu} from '../dialog/object'
import {useConfigurationStore} from '@/lib/store'

export function ConfigurationSections(props: Readonly<CameraFieldProps>) {
	return (
		<Accordion type='single' defaultValue='scene' collapsible>
			<CameraSection {...props} />
			<SceneSection />
		</Accordion>
	)
}

export function CameraSection(props: Readonly<CameraFieldProps>) {
	return (
		<AccordionItem value='camera-settings'>
			<AccordionTrigger icon={<Camera size={16} />}>
				Camera Settings
			</AccordionTrigger>
			<AccordionContent>
				<CameraFieldSet {...props} />
			</AccordionContent>
		</AccordionItem>
	)
}

export function SceneSection() {
	const scene = useConfigurationStore((state) => state.scene)
	const removeSceneObject = useConfigurationStore(
		(state) => state.removeSceneObject
	)
	const clearScene = useConfigurationStore((state) => state.clearScene)

	return (
		<AccordionItem value='scene'>
			<AccordionTrigger icon={<ImageIcon size={16} />}>Scene</AccordionTrigger>
			<AccordionContent>
				<SceneObjectsList scene={scene} onDelete={removeSceneObject} />
				<div className='mt-2 flex justify-between'>
					<AddObjectDropdownMenu />
					<Button
						variant='outline'
						size='sm'
						className={
							'focus-visible:ring-0 focus-visible:ring-offset-0 ' +
							'bg-red-50 hover:bg-red-100 border-red-200'
						}
						disabled={scene.length == 0}
						onClick={clearScene}
						preventDefault
					>
						<Trash2 className='text-red-500' />
						<span className='text-red-500'>Clear</span>
					</Button>
				</div>
			</AccordionContent>
		</AccordionItem>
	)
}
