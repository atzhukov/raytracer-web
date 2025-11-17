import {Camera} from '@/lib/render/render'
import {FieldGroup, FieldSet} from '@/components/ui/field'
import {Aperture, Focus, Move3d, ScanEye} from 'lucide-react'
import SliderWithDisplay from '@/components/ui/wrap/slider-display'
import {FieldSkeleton} from '../ui/wrap/field'
import CoordinateInput from '../ui/wrap/coordinateInput'
import {useCallback} from 'react'
import {Vec3} from '@/lib/utils'

const iconSize = '16'

export type CameraFieldProps = {
	camera: Camera
	onChange: (changes: Partial<Camera>) => void
}

export default function CameraFieldSet(props: Readonly<CameraFieldProps>) {
	return (
		<FieldSet>
			<FieldGroup>
				<FieldOfViewField {...props} />
				<ApertureField {...props} />
				<FocusDistanceField {...props} />
				<SourceField {...props} />
			</FieldGroup>
		</FieldSet>
	)
}

function FieldOfViewField({camera, onChange}: Readonly<CameraFieldProps>) {
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

function ApertureField({camera, onChange}: Readonly<CameraFieldProps>) {
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

function FocusDistanceField({camera, onChange}: Readonly<CameraFieldProps>) {
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

function SourceField({camera, onChange}: Readonly<CameraFieldProps>) {
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

function SizeField({camera, onChange}: Readonly<CameraFieldProps>) {
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
