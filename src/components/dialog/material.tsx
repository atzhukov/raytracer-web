import {FlipVertical2, Origami} from 'lucide-react'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import {
	initialMaterials,
	Material,
	MaterialOf,
	materialTypes,
} from '@/lib/render/render'
import {capitalize} from '@/lib/utils'
import {useCallback, useEffect, useState} from 'react'
import {Field} from '@/components/ui/field'
import SliderWithDisplay from '@/components/ui/wrap/slider-display'
import MaterialColorPicker from '../ui/wrap/material-color-picker'
import {FieldSkeleton} from '../ui/wrap/field'

export default function MaterialPicker({
	value,
	onChange,
}: Readonly<{value: Material; onChange: (value: Material) => void}>) {
	const [material, setMaterial] = useState(value)

	const changeType = (type: string) => {
		setMaterial(initialMaterials[type as Material['type']])
	}

	// Cache onChange to prevent infinite re-renders
	// Call onChange when material changes
	const onChangeCached = useCallback(onChange, [value])
	useEffect(() => {
		onChangeCached(material)
	}, [onChangeCached, material])

	return (
		<>
			<FieldSkeleton
				id='material'
				icon={<Origami size={16} />}
				label='Material'
			>
				<Select value={material.type} onValueChange={changeType}>
					<SelectTrigger className='w-[180px]'>
						<SelectValue placeholder='Choose a material' />
					</SelectTrigger>
					<SelectContent>
						{materialTypes.map((type) => (
							<SelectItem key={type} value={type}>
								<span className='text-foreground'>{capitalize(type)}</span>
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</FieldSkeleton>
			<div>
				{material.type == 'matte' && (
					<MatteFields material={material} onChange={setMaterial} />
				)}
				{material.type == 'dielectric' && (
					<DielectricFields material={material} onChange={setMaterial} />
				)}
			</div>
		</>
	)
}

function MatteFields({
	material,
	onChange,
}: Readonly<{
	material: MaterialOf<'matte'>
	onChange: (material: MaterialOf<'matte'>) => void
}>) {
	return (
		<Field>
			<Field id='color'>
				<MaterialColorPicker
					color={material.color}
					onChange={(color) => onChange({...material, color})}
				/>
			</Field>
		</Field>
	)
}

function DielectricFields({
	material,
	onChange,
}: Readonly<{
	material: MaterialOf<'dielectric'>
	onChange: (material: MaterialOf<'dielectric'>) => void
}>) {
	const id = 'refractive-index'
	const description =
		'For solid glass, choose 1.5. For hollow glass, additionally create a ' +
		'slightly smaller object with refractive index of 0.67.'
	return (
		<FieldSkeleton
			id={id}
			icon={<FlipVertical2 size={16} />}
			label='Refractive Index'
			description={description}
		>
			<SliderWithDisplay
				id={id}
				value={material.ridx}
				min={0}
				max={10}
				step={0.01}
				onChange={(v) => onChange({...material, ridx: v})}
				ariaLabel='The refractive index'
			/>
		</FieldSkeleton>
	)
}

function MetalFields() {}
