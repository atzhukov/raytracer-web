import {config, SceneObject, SceneObjectAny} from '@/lib/objects'
import {Vec3} from '@/lib/render/render'

import {Tag, Move3d, RulerDimensionLine} from 'lucide-react'
import {useReducer, useState} from 'react'
import CoordinateInput from '../form/coordinateInput'
import {Button} from '../ui/button'
import {
	DialogHeader,
	DialogFooter,
	DialogContent,
	DialogTitle,
	DialogDescription,
} from '../ui/dialog'
import {FieldSet, FieldGroup} from '../ui/field'
import {InputGroup, InputGroupInput} from '../ui/input-group'
import {useConfigurationStore} from '@/lib/store'
import {DialogClose} from '@radix-ui/react-dialog'
import MaterialPicker from './material'
import {FieldSkeleton} from '../ui/wrap/field'

export default function SphereDialogContent({
	editingSphere,
	onSave,
}: Readonly<{
	editingSphere?: SceneObject<'sphere'>
	onSave: (object: SceneObjectAny) => void
}>) {
	const scene = useConfigurationStore((state) => state.scene)

	// Initial sphere is either passed into the component or defined in the config.
	const sphereInitial = editingSphere ?? config('sphere').initialValue()
	// We need to patch the label though to avoid uncontrolled -> controlled input errors
	const sphereInitialPatched = {...sphereInitial}
	sphereInitialPatched.label = sphereInitialPatched.label ?? ''

	const [sphere, updateSphere] = useReducer(
		(state, changes: Partial<SceneObject<'sphere'>>) => ({
			...state,
			...changes,
		}),
		sphereInitialPatched
	)

	const [errors, setErrors] = useState({
		label: undefined as string | undefined,
	})
	const onSaveValidating = () => {
		if (!sphere.label) {
			setErrors({label: 'A label is required.'})
			return
		}
		const sameLabels = scene
			.map((object) => object.label)
			.filter((label) => label == sphere.label)
		if (sameLabels.length > 0) {
			setErrors({label: `A label '${sphere.label}' already exists.`})
			return
		}
		onSave(sphere)
	}

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle className='mb-4'>Add Sphere</DialogTitle>
				<DialogDescription asChild>
					<FieldSet>
						<FieldGroup>
							<LabelField
								value={sphere.label}
								error={errors.label}
								onChange={(v) => updateSphere({label: v})}
							/>
							<CenterField
								value={sphere.center}
								onChange={(v) => updateSphere({center: v})}
							/>
							<RadiusField
								value={sphere.radius}
								onChange={(v) => updateSphere({radius: v})}
							/>
							<MaterialPicker
								value={sphere.material}
								onChange={(v) => updateSphere({material: v})}
							/>
						</FieldGroup>
					</FieldSet>
				</DialogDescription>
			</DialogHeader>
			<DialogFooter>
				<DialogClose asChild>
					<Button
						type='button'
						variant='outline'
						onClick={onSaveValidating}
						preventDefault
						aria-label='Save sphere'
					>
						Add
					</Button>
				</DialogClose>
			</DialogFooter>
		</DialogContent>
	)
}

function LabelField({
	value,
	error,
	onChange,
}: Readonly<{
	value?: string
	error?: string
	onChange: (value: string) => void
}>) {
	const id = 'label'
	return (
		<FieldSkeleton
			id={id}
			icon={<Tag size={16} />}
			label='Label'
			description='A unique name for this sphere.'
			error={error}
		>
			<InputGroup aria-invalid>
				<InputGroupInput
					id={id}
					value={value}
					aria-label={`The label for the sphere`}
					onChange={(e) => onChange(e.target.value)}
					required
					aria-invalid={!!error}
				/>
			</InputGroup>
		</FieldSkeleton>
	)
}

function CenterField({
	value,
	onChange,
}: Readonly<{value: Vec3; onChange: (value: Vec3) => void}>) {
	return (
		<FieldSkeleton
			id='center'
			icon={<Move3d size={16} />}
			label='Center'
			description='The point where the center of the sphere is located.'
		>
			<CoordinateInput values={value} onChange={(v) => onChange(v)} />
		</FieldSkeleton>
	)
}

function RadiusField({
	value,
	onChange,
}: Readonly<{value: number; onChange: (value: number) => void}>) {
	const id = 'radius'
	return (
		<FieldSkeleton
			id={id}
			icon={<RulerDimensionLine size={16} />}
			label='Radius'
			description='The size of the sphere.'
		>
			<InputGroup>
				<InputGroupInput
					id={id}
					value={value}
					type='number'
					placeholder='0'
					aria-label={`The radius of the sphere`}
					onChange={(e) => onChange(+e.target.value)}
				/>
			</InputGroup>
		</FieldSkeleton>
	)
}
