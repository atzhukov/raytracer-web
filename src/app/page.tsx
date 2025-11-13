import Canvas from '@/components/canvas/canvas'
import Form from '@/components/form/form'

export default function Home() {
	return (
		<div className='flex flex-col sm:flex-row gap-2 max-h-full'>
			<div className='sm:w-128 max-h-full'>
				<Form />
			</div>
			<div className='size-full flex-1'>
				<div className='mb-8 sm:mb-0 grid h-full place-items-center'>
					<Canvas width={304} height={171} />
				</div>
			</div>
		</div>
	)
}
