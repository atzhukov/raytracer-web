import {Scene} from '@/lib/render/render'
import properties, {SceneObjectAny} from '@/lib/objects'
import {Pencil, Trash2} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {
	Card,
	CardAction,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {ButtonGroup} from '../ui/button-group'

export default function SceneObjectsList({
	scene,
	onDelete,
}: Readonly<{
	scene: Scene
	onDelete: (object: SceneObjectAny) => void
}>) {
	return (
		<div className='flex flex-col gap-2'>
			{scene.map((object) => (
				<SceneObjectCard
					key={object.label}
					object={object}
					onDelete={() => onDelete(object)}
				/>
			))}
		</div>
	)
}

function SceneObjectCard({
	object,
	onDelete,
}: Readonly<{
	object: SceneObjectAny
	onDelete: () => void
}>) {
	return (
		<Card className='py-3'>
			<CardHeader className='px-3'>
				<CardTitle className='flex gap-2 items-center'>
					{properties(object).icon}
					{object.label}
				</CardTitle>
				<CardDescription className='mt-[-6]'>
					{properties(object).description}
				</CardDescription>
				<CardAction className='inline'>
					<ButtonGroup>
						<Button variant='outline' size='icon-sm' aria-label='Submit'>
							<Pencil />
						</Button>
						<Button
							variant='outline'
							size='icon-sm'
							aria-label='Submit'
							className='bg-red-50 hover:bg-red-100'
							onClick={onDelete}
							preventDefault
						>
							<Trash2 className='text-red-500' />
						</Button>
					</ButtonGroup>
				</CardAction>
			</CardHeader>
		</Card>
	)
}
