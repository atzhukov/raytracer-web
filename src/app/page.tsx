import Canvas from '@/components/canvas/canvas'
import Form from '@/components/form/form'

export default function Home() {
	return (
		<div className='flex gap-2 max-h-full'>
			<div className='w-128 max-h-full'>
				<Form />
			</div>
			<div className='size-full flex-1'>
				<div className='grid h-full place-items-center'>
					<Canvas width={304} height={171} />
				</div>
			</div>
		</div>
	)
}
