import {Camera} from '@/lib/render/render'
import {FieldGroup, FieldSet} from '@/components/ui/field'
import {Aperture, Focus, Move3d, Scaling, ScanEye} from 'lucide-react'
import SliderWithDisplay from '@/components/ui/wrap/slider-display'
import {FieldSkeleton} from '../ui/wrap/field'
import CoordinateInput from '../ui/wrap/coordinateInput'
import {useCallback, useEffect, useState} from 'react'
import {Vec3} from '@/lib/utils'
import {Input} from '../ui/input'
import {Dimensions} from '@/lib/store'

const iconSize = '16'

export type CameraFieldProps = {
	camera: Camera
	onCameraChange: (changes: Partial<Camera>) => void
}
export type SizeFieldProps = {
	dimensions: Dimensions
	onDimensionsChange: (dimensions: Dimensions) => void
}

export default function CameraFieldSet(
	props: Readonly<CameraFieldProps & SizeFieldProps>
) {
	return (
		<FieldSet>
			<FieldGroup>
				<FieldOfViewField {...props} />
				<ApertureField {...props} />
				<FocusDistanceField {...props} />
				<SourceField {...props} />
				<SizeField {...props} />
			</FieldGroup>
		</FieldSet>
	)
}

function FieldOfViewField({
	camera,
	onCameraChange: onChange,
}: Readonly<CameraFieldProps>) {
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
				value={camera.fov}
				displayValue={(v) => `${v}°`}
				onChange={(v) => onChange({fov: v})}
				min={1}
				max={100}
				step={1}
				ariaLabel='Field of View'
			/>
		</FieldSkeleton>
	)
}

function ApertureField({
	camera,
	onCameraChange: onChange,
}: Readonly<CameraFieldProps>) {
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
				value={camera.aperture}
				onChange={(v) => onChange({aperture: v})}
				min={0}
				max={50}
				step={0.1}
				ariaLabel='Depth of Field'
			/>
		</FieldSkeleton>
	)
}

function FocusDistanceField({
	camera,
	onCameraChange: onChange,
}: Readonly<CameraFieldProps>) {
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
				value={camera.focusDistance}
				onChange={(v) => onChange({focusDistance: v})}
				min={0.1}
				max={50}
				step={0.1}
				ariaLabel='Focus Distance'
			/>
		</FieldSkeleton>
	)
}

function SourceField({
	camera,
	onCameraChange: onChange,
}: Readonly<CameraFieldProps>) {
	const onChangeMemoized = useCallback(
		(v: Vec3) => onChange({source: v}),
		[onChange]
	)
	return (
		<FieldSkeleton
			id='source'
			icon={<Move3d size={iconSize} />}
			label='Location'
			description='The point where the camera is located.'
		>
			<CoordinateInput values={camera.source} onChange={onChangeMemoized} />
		</FieldSkeleton>
	)
}

function SizeField({dimensions, onDimensionsChange}: Readonly<SizeFieldProps>) {
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
		onDimensionsChange(newDimensions)
	}, [onDimensionsChange, width, height])

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
