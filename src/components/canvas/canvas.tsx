'use client'

import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from '@/components/ui/empty'
import render, {RaytracerInput} from '@/lib/render'
import {Settings, TriangleAlert} from 'lucide-react'
import {useEffect, useReducer, useRef} from 'react'
import progress from './state'

type CanvasProps = {
	width: number
	height: number
	image: RaytracerInput | null
}

export default function Canvas(props: Readonly<CanvasProps>) {
	const canvasRef = useRef<HTMLCanvasElement>(null)

	const [state, transition] = useReducer(progress, {
		imageData: null,
		errorMessage: null,
		state: 'empty',
	})

	// Re-render the image and set state.imageData when the props change
	useEffect(() => {
		async function getImageData() {
			if (!props.image) {
				transition({to: 'empty'})
				return
			}

			try {
				const imageData = await render(props.image)
				transition({to: 'done', imageData})
			} catch (error) {
				const message =
					error instanceof Error
						? `${error.name}: ${error.message}`
						: 'Unknown error'
				transition({to: 'error', message})
			}
		}

		getImageData()
	}, [props.image, props.width, props.height])

	// Fill canvas when state.imageData changes
	useEffect(() => {
		if (!state.imageData || !canvasRef.current) {
			return
		}

		const canvas = canvasRef.current
		const context = canvas.getContext('2d')
		if (!context) {
			return
		}

		// Adjust for retina displays
		const ratio = window.devicePixelRatio || 1
		canvas.style.width = props.width + 'px'
		canvas.style.height = props.height + 'px'
		canvas.width = props.width * ratio
		canvas.height = props.height * ratio
		context.scale(ratio, ratio)

		context.putImageData(state.imageData, 0, 0)
	}, [state.imageData])

	return (
		<>
			<canvas
				ref={canvasRef}
				style={{
					display: state.state == 'done' ? 'block' : 'none',
				}}
			/>

			{state.state == 'error' && (
				<Empty>
					<EmptyHeader>
						<EmptyMedia variant='icon'>
							<TriangleAlert />
						</EmptyMedia>
						<EmptyTitle>An error occurred</EmptyTitle>
						<EmptyDescription>
							<p>Your scene could not be rendered</p>
							<p>{state.errorMessage}</p>
						</EmptyDescription>
					</EmptyHeader>
				</Empty>
			)}

			{state.state == 'empty' && (
				<Empty>
					<EmptyHeader>
						<EmptyMedia variant='icon'>
							<Settings />
						</EmptyMedia>
						<EmptyTitle>Nothing to Render</EmptyTitle>
						<EmptyDescription>Configure the camera and scene</EmptyDescription>
					</EmptyHeader>
				</Empty>
			)}
		</>
	)
}
