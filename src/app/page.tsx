import Canvas from '@/components/canvas/canvas'
import {github} from '@/lib/demo'

export default function Home() {
	return (
		<div>
			<Canvas width={600} height={300} image={github} />
		</div>
	)
}
