import {CameraSpec} from '@/lib/render/render'
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
	FieldSet,
} from '@/components/ui/field'
import {Aperture, Focus, Move3d, ScanEye} from 'lucide-react'
import {Slider} from '@/components/ui/slider'
import CoordinateInput from './coordinateInput'

const iconSize = '16'

export type CameraFieldProps = {
	camera: CameraSpec
	onChange: (changes: Partial<CameraSpec>) => void
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
		<Skeleton
			id={id}
			icon={<ScanEye size={iconSize} />}
			label='Field of View'
			description='The vertical angle visible in the rendered image.'
		>
			<CameraSlider
				id={id}
				value={camera.fov}
				displayValue={`${camera.fov}°`}
				onChange={(v) => onChange({fov: v})}
				min={1}
				max={100}
				step={1}
				ariaLabel='Field of View'
			/>
		</Skeleton>
	)
}

function ApertureField({camera, onChange}: Readonly<CameraFieldProps>) {
	const id = 'aperture'
	return (
		<Skeleton
			id={id}
			icon={<Aperture size={iconSize} />}
			label='Depth of Field'
			description='The blurriness of objects that are out of focus.'
		>
			<CameraSlider
				id={id}
				value={camera.aperture}
				onChange={(v) => onChange({aperture: v})}
				min={0}
				max={50}
				step={0.5}
				ariaLabel='Depth of Field'
			/>
		</Skeleton>
	)
}

function FocusDistanceField({camera, onChange}: Readonly<CameraFieldProps>) {
	const id = 'focus-distance'
	return (
		<Skeleton
			id={id}
			icon={<Focus size={iconSize} />}
			label='Focus Distance'
			description='The distance from the camera to the object in focus.'
		>
			<CameraSlider
				id={id}
				value={camera.focusDistance}
				onChange={(v) => onChange({focusDistance: v})}
				min={0.5}
				max={50}
				step={0.5}
				ariaLabel='Focus Distance'
			/>
		</Skeleton>
	)
}

function SourceField({camera, onChange}: Readonly<CameraFieldProps>) {
	return (
		<Skeleton
			id='source'
			icon={<Move3d size={iconSize} />}
			label='Location'
			description='The point where the camera is located.'
		>
			<CoordinateInput
				values={camera.source}
				onChange={(v) => onChange({source: v})}
			/>
		</Skeleton>
	)
}

type CameraSliderProps = {
	id: string
	value: number
	displayValue?: string
	onChange: (value: number) => void
	ariaLabel: string
	min: number
	max: number
	step: number
}
function CameraSlider(props: Readonly<CameraSliderProps>) {
	return (
		<div className='flex gap-2 align-center items-center'>
			<Slider
				id={props.id}
				value={[props.value]}
				onValueChange={(v) => props.onChange(v[0])}
				min={props.min}
				max={props.max}
				step={props.step}
				role='slider'
				aria-label={props.ariaLabel}
			/>
			<span className='w-[2em] text-right'>
				{props.displayValue || props.value}
			</span>
		</div>
	)
}

type SkeletonProps = {
	id?: string
	icon?: React.ReactNode
	label: string
	children: React.ReactNode
	description?: string
	error?: string
}
export function Skeleton(props: Readonly<SkeletonProps>) {
	return (
		<Field data-invalid={!!props.error}>
			<FieldLabel
				className='flex items-center gap-2 text-foreground'
				htmlFor={props.id}
			>
				{props.icon}
				{props.label}
			</FieldLabel>
			{props.children}
			<FieldError>{props.error}</FieldError>
			{props.description && (
				<FieldDescription>{props.description}</FieldDescription>
			)}
		</Field>
	)
}
