'use client'

import {
	Empty,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from '@/components/ui/empty'
import render from '@/lib/render/render'
import {Loader, Settings, TriangleAlert} from 'lucide-react'
import {JSX, useEffect, useReducer, useRef} from 'react'
import progress from './state'
import {useConfigurationStore} from '@/lib/store'

export default function Canvas() {
	const {camera, scene, dimensions} = useConfigurationStore(
		(state) => state.committed
	)

	const canvasRef = useRef<HTMLCanvasElement>(null)

	const [state, transition] = useReducer(progress, {
		imageData: null,
		errorMessage: null,
		state: 'empty',
	})

	// Re-render the image and set state.imageData when the props change
	useEffect(() => {
		async function getImageData() {
			if (scene.length == 0) {
				transition({to: 'empty'})
				return
			}

			try {
				transition({to: 'working'})
				const ratio = window.devicePixelRatio || 1
				const imageData = await render(
					camera,
					scene,
					dimensions.width * ratio,
					dimensions.height * ratio
				)
				transition({to: 'done', imageData})
			} catch (error) {
				console.log(error)
				transition({to: 'error', message: errorMessage(error)})
			}
		}
		getImageData()
	}, [camera, scene, dimensions.width, dimensions.height])

	// Fill canvas when state.imageData changes
	useEffect(() => {
		if (!state.imageData) {
			return
		}
		if (!canvasRef.current) {
			transition({to: 'error', message: 'Could not retrieve a canvas ref'})
			return
		}

		const canvas = canvasRef.current
		const context = canvas.getContext('2d')!

		// Scale for retina displays
		const ratio = window.devicePixelRatio || 1
		canvas.style.width = dimensions.width + 'px'
		canvas.style.height = dimensions.height + 'px'
		canvas.width = dimensions.width * ratio
		canvas.height = dimensions.height * ratio

		try {
			context.scale(ratio, ratio)
			context.putImageData(state.imageData, 0, 0)
		} catch (error) {
			transition({to: 'error', message: errorMessage(error)})
		}
	}, [state.imageData, dimensions.width, dimensions.height])

	return (
		<>
			<canvas // NOSONAR - ts:S6819 - this canvas is non-interactive
				role='img' // NOSONAR - ts:S6843 - this canvas is non-interactive
				aria-label='Image produced by the ray tracer'
				ref={canvasRef}
				style={{
					display: state.state == 'done' ? 'block' : 'none',
				}}
			/>

			{state.state == 'working' &&
				empty(<Loader className='animate-spin' />, 'Rendering...', <></>)}

			{state.state == 'error' &&
				empty(
					<TriangleAlert />,
					'An error occurred',
					<div>
						<p>Your scene could not be rendered</p>
						<p>{state.errorMessage}</p>
					</div>
				)}

			{state.state == 'empty' &&
				empty(
					<Settings />,
					'Nothing to Render',
					<>Configure the camera and scene</>
				)}
		</>
	)
}

/**
 * Constructs the empty element (https://ui.shadcn.com/docs/components/empty).
 * @param icon the icon displayed at the top.
 * @param title the string displayed under the icon.
 * @param description the string providing more details under the title.
 * @returns the JSX element containing the empty element.
 */
function empty(
	icon: JSX.Element,
	title: string,
	description: JSX.Element
): JSX.Element {
	return (
		<Empty>
			<EmptyHeader>
				<EmptyMedia variant='icon'>{icon}</EmptyMedia>
				<EmptyTitle role='status' aria-label='Current status'>
					{title}
				</EmptyTitle>
				<EmptyDescription role='log' aria-label='Additional information'>
					{description}
				</EmptyDescription>
			</EmptyHeader>
		</Empty>
	)
}

/**
 * Constructs an error message from a caught error object.
 * @param error a caught error object.
 * @returns a string containing the error message.
 */
function errorMessage(error: unknown): string {
	return error instanceof Error
		? `${error.name}: ${error.message}`
		: 'Unknown error'
}
