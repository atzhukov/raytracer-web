import {Dialog} from '@/components/ui/dialog'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
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

export function EditDialogContent({
	object,
}: Readonly<{object: SceneObjectAny}>) {
	if (!object.label) {
		throw new Error('Editing an object requires a label')
	}

	const updateSceneObject = useConfigurationStore(
		(state) => state.updateSceneObject
	)
	return (
		<>
			{object.type == 'sphere' && (
				<SphereDialogContent
					editingSphere={object}
					onSave={(newObject) => updateSceneObject(object.label!, newObject)}
				/>
			)}
		</>
	)
}

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
