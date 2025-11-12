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

export type CameraFieldProps = {
	camera: CameraSpec
	onChange: (changes: Partial<CameraSpec>) => void
}

export default function CameraFieldSet({
	camera,
	onChange,
}: Readonly<CameraFieldProps>) {
	return (
		<FieldSet>
			<FieldGroup>
				<FieldOfViewField camera={camera} onChange={onChange} />
				<ApertureField camera={camera} onChange={onChange} />
				<FocusDistanceField camera={camera} onChange={onChange} />
				<SourceField camera={camera} onChange={onChange} />
			</FieldGroup>
		</FieldSet>
	)
}

function FieldOfViewField({camera, onChange}: Readonly<CameraFieldProps>) {
	return (
		<Field>
			<FieldLabel className='flex items-center gap-2' htmlFor='fov'>
				<ScanEye size='16' />
				Field of View
			</FieldLabel>
			<div className='flex gap-2 align-center items-center'>
				<Slider
					id='fov'
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
			<FieldDescription>
				The vertical angle visible in the rendered image.
			</FieldDescription>
		</Field>
	)
}

function ApertureField({camera, onChange}: Readonly<CameraFieldProps>) {
	return (
		<Field>
			<FieldLabel className='flex items-center gap-2' htmlFor='fov'>
				<Aperture size='16' />
				Depth of Field
			</FieldLabel>
			<div className='flex gap-2 align-center items-center'>
				<Slider
					id='fov'
					value={[camera.aperture]}
					onValueChange={(v) => onChange({aperture: v[0]})}
					min={0}
					max={50}
					step={0.5}
					aria-label='Field of View'
					role='slider'
				/>
				<span className='w-[2em] text-right'>{camera.aperture}</span>
			</div>
			<FieldDescription>
				The blurriness of objects that are out of focus.
			</FieldDescription>
		</Field>
	)
}

function FocusDistanceField({camera, onChange}: Readonly<CameraFieldProps>) {
	return (
		<Field>
			<FieldLabel className='flex items-center gap-2' htmlFor='fov'>
				<Focus size='16' />
				Focus Distance
			</FieldLabel>
			<div className='flex gap-2 align-center items-center'>
				<Slider
					id='fov'
					value={[camera.focusDistance]}
					onValueChange={(v) => onChange({focusDistance: v[0]})}
					min={0.5}
					max={50}
					step={0.5}
					aria-label='Field of View'
					role='slider'
				/>
				<span className='w-[2em] text-right'>{camera.focusDistance}</span>
			</div>
			<FieldDescription>
				The distance from the camera to the object in focus.
			</FieldDescription>
		</Field>
	)
}

function SourceField({camera, onChange}: Readonly<CameraFieldProps>) {
	return (
		<Field className='overflow-visible'>
			<FieldLabel className='flex items-center gap-2' htmlFor='fov'>
				<Move3d size='16' />
				Location
			</FieldLabel>
			<CoordinateInput
				values={camera.source}
				onChange={(v) => onChange({source: v})}
			/>
			<FieldDescription>
				The point where the camera is located.
			</FieldDescription>
		</Field>
	)
}
