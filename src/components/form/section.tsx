import {Camera, ImageIcon, Plus, Trash2} from 'lucide-react'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import CameraFieldSet, {CameraFieldProps} from './camera'
import SceneObjectCard from './object'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {Button} from '@/components/ui/button'
import useConfiguration from '@/lib/store'
import {supportedObjects} from '@/lib/objects'
import {capitalize} from '@/lib/utils'
import {Scene} from '@/lib/render/render'

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
	const {scene} = useConfiguration()
	return (
		<AccordionItem value='scene'>
			<AccordionTrigger icon={<ImageIcon size={16} />}>Scene</AccordionTrigger>
			<AccordionContent>
				<SceneObjectsList scene={scene} />
				<div className='mt-2 flex justify-between'>
					<AddToSceneDropdownMenu />
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

function SceneObjectsList({scene}: Readonly<{scene: Scene}>) {
	return (
		<div className='flex flex-col gap-2'>
			{scene.map((object) => (
				<SceneObjectCard key={object.label} object={object} />
			))}
		</div>
	)
}

function AddToSceneDropdownMenu() {
	return (
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
				<ObjectTypeDropdownMenuItems />
				<DropdownMenuSeparator />
				<DropdownMenuLabel>Presets</DropdownMenuLabel>
				<DropdownMenuItem>GitHub Demo</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

function ObjectTypeDropdownMenuItems() {
	return (
		<>
			{Object.entries(supportedObjects).map(([type, config]) => {
				return (
					<DropdownMenuItem key={type}>
						{config.icon}
						{capitalize(type)}
					</DropdownMenuItem>
				)
			})}
		</>
	)
}
