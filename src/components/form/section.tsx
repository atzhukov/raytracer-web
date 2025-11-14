import {Camera, ImageIcon, Plus, Trash2} from 'lucide-react'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import CameraFieldSet, {CameraFieldProps} from './camera'
import SceneObject from './object'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {Button} from '@/components/ui/button'

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
	return (
		<AccordionItem value='scene'>
			<AccordionTrigger icon={<ImageIcon size={16} />}>Scene</AccordionTrigger>
			<AccordionContent>
				<div className='flex flex-col gap-2'>
					<SceneObject />
					<SceneObject />
				</div>
				<div className='mt-2 flex justify-between'>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant='outline'
								size='sm'
								className='focus-visible:ring-0 focus-visible:ring-offset-0'
							>
								<Plus />
								Add
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem>Sphere</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuLabel>Presets</DropdownMenuLabel>
							<DropdownMenuItem>GitHub Demo</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					<Button
						variant='outline'
						size='sm'
						className={
							'focus-visible:ring-0 focus-visible:ring-offset-0 bg-red-50 hover:bg-red-100 ' +
							'border-red-200'
						}
					>
						<Trash2 className='text-red-500' />
						<span className='text-red-500'>Clear</span>
					</Button>
				</div>
			</AccordionContent>
		</AccordionItem>
	)
}
