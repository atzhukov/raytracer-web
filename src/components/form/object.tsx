import {
	Card,
	CardAction,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {Pencil, Radius, Trash2} from 'lucide-react'
import {Button} from '@/components/ui/button'
import {ButtonGroup} from '@/components/ui/button-group'

export default function SceneObject() {
	return (
		<Card className='py-3'>
			<CardHeader className='px-3'>
				<CardTitle className='flex gap-2 items-center'>
					<Radius size={16} />
					Label
				</CardTitle>
				<CardDescription className='mt-[-6]'>
					Metal Sphere at (0, 0, 0) with radius 1
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
