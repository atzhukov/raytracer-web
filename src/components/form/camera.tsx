import {CameraSpec} from '@/lib/render/render'
import {
	Field,
	FieldDescription,
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
			<div className='flex gap-2 align-center items-center'>
				<Slider
					id={id}
					value={[camera.fov]}
					onValueChange={(v) => onChange({fov: v[0]})}
					min={1}
					max={100}
					step={1}
					aria-label='Field of View'
					role='slider'
				/>
				<span className='w-[2em] text-right'>{camera.fov}&deg;</span>
			</div>
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
			<div className='flex gap-2 align-center items-center'>
				<Slider
					id={id}
					value={[camera.aperture]}
					onValueChange={(v) => onChange({aperture: v[0]})}
					min={0}
					max={50}
					step={0.5}
					aria-label='Depth of Field'
					role='slider'
				/>
				<span className='w-[2em] text-right'>{camera.aperture}</span>
			</div>
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
			<div className='flex gap-2 align-center items-center'>
				<Slider
					id={id}
					value={[camera.focusDistance]}
					onValueChange={(v) => onChange({focusDistance: v[0]})}
					min={0.5}
					max={50}
					step={0.5}
					aria-label='Focus Distance'
					role='slider'
				/>
				<span className='w-[2em] text-right'>{camera.focusDistance}</span>
			</div>
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

type SkeletonProps = {
	id?: string
	icon?: React.ReactNode
	label: string
	children: React.ReactNode
	description?: string
}
function Skeleton(props: Readonly<SkeletonProps>) {
	return (
		<Field>
			<FieldLabel className='flex items-center gap-2' htmlFor={props.id}>
				{props.icon}
				{props.label}
			</FieldLabel>
			{props.children}
			{props.description && (
				<FieldDescription>{props.description}</FieldDescription>
			)}
		</Field>
	)
}
