import {Dialog} from '@/components/ui/dialog'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import {Button} from '../ui/button'
import {Plus} from 'lucide-react'
import {SceneObjectAny, SceneObjectType, supportedObjects} from '@/lib/objects'
import {capitalize} from '@/lib/utils'
import {DialogTrigger} from '@radix-ui/react-dialog'
import SphereDialogContent from './sphere'
import {useState} from 'react'
import {useConfigurationStore} from '@/lib/store'

export function AddObjectDropdownMenu() {
	const addSceneObject = useConfigurationStore((state) => state.addSceneObject)
	const [type, setType] = useState<SceneObjectType | null>(null)

	const save = (object: SceneObjectAny) => {
		addSceneObject(object)
		setType(null)
	}

	return (
		<Dialog open={!!type} onOpenChange={(open) => !open && setType(null)}>
			<AddToSceneDropdownMenu onClick={setType} />
			{type == 'sphere' && <SphereDialogContent onSave={save} />}
		</Dialog>
	)
}

function AddToSceneDropdownMenu({
	onClick,
}: Readonly<{onClick: (type: SceneObjectType) => void}>) {
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
				<ObjectTypeDropdownMenuItems onClick={onClick} />
				<DropdownMenuSeparator />
				<DropdownMenuLabel>Presets</DropdownMenuLabel>
				<DropdownMenuItem>GitHub Demo</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

function ObjectTypeDropdownMenuItems({
	onClick,
}: Readonly<{onClick: (type: SceneObjectType) => void}>) {
	return (
		<>
			{Object.entries(supportedObjects).map(([type, config]) => {
				return (
					<DialogTrigger key={type} asChild>
						<DropdownMenuItem onClick={() => onClick(type as SceneObjectType)}>
							{config.icon}
							{capitalize(type)}
						</DropdownMenuItem>
					</DialogTrigger>
				)
			})}
		</>
	)
}
