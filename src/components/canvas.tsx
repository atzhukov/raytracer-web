'use client'
import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from '@/components/ui/empty'
import {Settings, TriangleAlert} from 'lucide-react'
import {useEffect, useRef, useState} from 'react'

interface CanvasProps {
	width: number
	height: number
	rgbaPixels?: Uint8ClampedArray | null
}

enum CanvasState {
	Empty,
	Failed,
	Rendered,
}

export default function Canvas(props: Readonly<CanvasProps>) {
	const canvasRef = useRef<HTMLCanvasElement>(null)

	const [error, setError] = useState<string | null>(null)
	const [canvasState, setCanvasState] = useState(CanvasState.Empty)

	useEffect(() => {
		if (!props.rgbaPixels) {
			return
		}

		if (!canvasRef.current) {
			setError('could not obtain a reference to the canvas')
			setCanvasState(CanvasState.Failed)
			return
		}

		const canvas = canvasRef.current
		const context = canvas.getContext('2d')
		if (!context) {
			setError('could not obtain a canvas context')
			setCanvasState(CanvasState.Failed)
			return
		}

		// Adjust for retina displays
		const ratio = window.devicePixelRatio || 1
		canvas.style.width = props.width + 'px'
		canvas.style.height = props.height + 'px'
		canvas.width = props.width * ratio
		canvas.height *= props.height * ratio
		context.scale(ratio, ratio)

		try {
			const imageData = context.createImageData(props.width, props.height)
			imageData.data.set(props.rgbaPixels)
			context.putImageData(imageData, 0, 0)
			setCanvasState(CanvasState.Rendered)
		} catch (error) {
			setError(
				error instanceof Error
					? `${error.name}: ${error.message}`
					: 'Unknown error'
			)
			setCanvasState(CanvasState.Failed)
		}
	}, [])

	return (
		<>
			<canvas
				ref={canvasRef}
				style={{
					display: canvasState == CanvasState.Rendered ? 'block' : 'none',
				}}
			/>
			{canvasState == CanvasState.Failed && (
				<Empty>
					<EmptyHeader>
						<EmptyMedia variant='icon'>
							<TriangleAlert />
						</EmptyMedia>
						<EmptyTitle>An error occurred</EmptyTitle>
						<EmptyDescription>
							<p>Your scene could not be rendered</p>
							<p>{error}</p>
						</EmptyDescription>
					</EmptyHeader>
				</Empty>
			)}
			{canvasState == CanvasState.Empty && (
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
