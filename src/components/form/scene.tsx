import {Scene} from '@/lib/render/render'
import SceneObjectCard from './object'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import {supportedObjects} from '@/lib/objects'
import {capitalize} from '@/lib/utils'
import {Plus} from 'lucide-react'
import {Button} from '../ui/button'

export function SceneObjectsList({scene}: Readonly<{scene: Scene}>) {
	return (
		<div className='flex flex-col gap-2'>
			{scene.map((object) => (
				<SceneObjectCard key={object.label} object={object} />
			))}
		</div>
	)
}

export function AddToSceneDropdownMenu() {
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
