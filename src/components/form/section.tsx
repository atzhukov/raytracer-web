import {Camera, ImageIcon} from 'lucide-react'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import CameraFieldSet, {CameraFieldProps} from './camera'

export function ConfigurationSections({
	camera,
	onChange,
}: Readonly<CameraFieldProps>) {
	return (
		<Accordion type='single' defaultValue='camera-settings' collapsible>
			<CameraSection camera={camera} onChange={onChange} />
			<SceneSection />
		</Accordion>
	)
}

export function CameraSection({camera, onChange}: Readonly<CameraFieldProps>) {
	return (
		<AccordionItem value='camera-settings'>
			<AccordionTrigger icon={<Camera size={16} />}>
				Camera Settings
			</AccordionTrigger>
			<AccordionContent className='overflow-visible'>
				<CameraFieldSet camera={camera} onChange={onChange} />
			</AccordionContent>
		</AccordionItem>
	)
}

export function SceneSection() {
	return (
		<AccordionItem value='scene'>
			<AccordionTrigger icon={<ImageIcon size={16} />}>Scene</AccordionTrigger>
			<AccordionContent>TODO</AccordionContent>
		</AccordionItem>
	)
}
