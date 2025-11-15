import {
	Card,
	CardAction,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {Pencil, Trash2} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {ButtonGroup} from '@/components/ui/button-group'
import {SceneObject} from '@/lib/render/render'
import properties from '@/lib/objects'

export default function SceneObjectCard({
	object,
}: Readonly<{object: SceneObject}>) {
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
						>
							<Trash2 className='text-red-500' />
						</Button>
					</ButtonGroup>
				</CardAction>
			</CardHeader>
		</Card>
	)
}
