import {FieldGroup, FieldSet} from '@/components/ui/field'
import {Aperture, Focus, Move3d, Scaling, ScanEye} from 'lucide-react'
import SliderWithDisplay from '@/components/ui/wrap/slider-display'
import {FieldSkeleton} from '../ui/wrap/field'
import CoordinateInput from '../ui/wrap/coordinateInput'
import {useEffect, useState} from 'react'
import {Vec3} from '@/lib/utils'
import {Input} from '../ui/input'
import {useConfigurationStore} from '@/lib/store'
import {useShallow} from 'zustand/shallow'
import useCommit from '@/lib/hooks/use-commit'

const iconSize = '16'

export default function CameraFieldSet() {
	return (
		<FieldSet>
			<FieldGroup>
				<FieldOfViewField />
				<ApertureField />
				<FocusDistanceField />
				<SourceField />
				<SizeField />
			</FieldGroup>
		</FieldSet>
	)
}

function FieldOfViewField() {
	const {fov, updateCamera} = useConfigurationStore(
		useShallow((state) => ({
			fov: state.queued.camera.fov,
			updateCamera: state.updateCamera,
		}))
	)
	const commitFov = useCommit((fov: number) => updateCamera({fov}))

	const id = 'fov'
	return (
		<FieldSkeleton
			id={id}
			icon={<ScanEye size={iconSize} />}
			label='Field of View'
			description='The vertical angle visible in the rendered image.'
		>
			<SliderWithDisplay
				id={id}
				value={fov}
				displayValue={(v) => `${v}°`}
				onChange={commitFov}
				min={1}
				max={100}
				step={1}
				ariaLabel='Field of View'
			/>
		</FieldSkeleton>
	)
}

function ApertureField() {
	const {aperture, updateCamera} = useConfigurationStore(
		useShallow((state) => ({
			aperture: state.queued.camera.aperture,
			updateCamera: state.updateCamera,
		}))
	)
	const commitAperture = useCommit((aperture: number) =>
		updateCamera({aperture})
	)

	const id = 'aperture'
	return (
		<FieldSkeleton
			id={id}
			icon={<Aperture size={iconSize} />}
			label='Depth of Field'
			description='The blurriness of objects that are out of focus.'
		>
			<SliderWithDisplay
				id={id}
				value={aperture}
				onChange={commitAperture}
				min={0}
				max={50}
				step={0.1}
				ariaLabel='Depth of Field'
			/>
		</FieldSkeleton>
	)
}

function FocusDistanceField() {
	const {focusDistance, updateCamera} = useConfigurationStore(
		useShallow((state) => ({
			focusDistance: state.queued.camera.focusDistance,
			updateCamera: state.updateCamera,
		}))
	)
	const commitFocusDistance = useCommit((focusDistance: number) =>
		updateCamera({focusDistance})
	)

	const id = 'focus-distance'
	return (
		<FieldSkeleton
			id={id}
			icon={<Focus size={iconSize} />}
			label='Focus Distance'
			description='The distance from the camera to the object in focus.'
		>
			<SliderWithDisplay
				id={id}
				value={focusDistance}
				onChange={commitFocusDistance}
				min={0.1}
				max={50}
				step={0.1}
				ariaLabel='Focus Distance'
			/>
		</FieldSkeleton>
	)
}

function SourceField() {
	const {source, updateCamera} = useConfigurationStore(
		useShallow((state) => ({
			source: state.queued.camera.source,
			updateCamera: state.updateCamera,
		}))
	)
	const commitSource = useCommit((source: Vec3) => updateCamera({source}))

	return (
		<FieldSkeleton
			id='source'
			icon={<Move3d size={iconSize} />}
			label='Location'
			description='The point where the camera is located.'
		>
			<CoordinateInput values={source} onChange={commitSource} />
		</FieldSkeleton>
	)
}

function SizeField() {
	const [dimensions, setDimensions] = useConfigurationStore(
		useShallow((state) => [state.queued.dimensions, state.setDimensions])
	)
	const commitDimensions = useCommit(setDimensions)

	const [width, setWidth] = useState(dimensions.width.toString())
	const [height, setHeight] = useState(dimensions.height.toString())

	useEffect(() => {
		const newDimensions = {
			width: Number.parseInt(width),
			height: Number.parseInt(height),
		}
		if (
			Number.isNaN(newDimensions.width) ||
			Number.isNaN(newDimensions.height)
		) {
			return
		}
		if (newDimensions.width <= 0 || newDimensions.height <= 0) {
			return
		}
		commitDimensions(newDimensions)
	}, [commitDimensions, width, height])

	return (
		<FieldSkeleton
			id='size'
			icon={<Scaling size={iconSize} />}
			label='Size'
			description='The size of the resulting image. Affects performance.'
		>
			<div className='flex gap-2'>
				<Input
					type='number'
					value={width}
					onChange={(e) => setWidth(e.target.value)}
				/>
				<Input
					type='number'
					value={height}
					onChange={(e) => setHeight(e.target.value)}
				/>
			</div>
		</FieldSkeleton>
	)
}
