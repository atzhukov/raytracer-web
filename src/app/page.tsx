import Canvas from '@/components/canvas/canvas'
import Form from '@/components/form/form'

export default function Home() {
	return (
		<div className='flex justify-between ml-2 mr-2'>
			<div className='w-128'>
				<Form />
			</div>
			<div className='w-[100%] h-[100%] flex-1'>
				<div className='grid place-items-center'>
					<Canvas width={300} height={150} />
				</div>
			</div>
		</div>
	)
}
