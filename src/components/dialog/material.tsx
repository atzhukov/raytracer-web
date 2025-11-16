import {Origami} from 'lucide-react'
import {Skeleton} from '@/components/form/camera'
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
import {useEffect, useState} from 'react'
import {Field, FieldDescription, FieldLabel} from '@/components/ui/field'
import SliderWithDisplay from '@/components/ui/wrap/slider-display'
import MaterialColorPicker from '../ui/wrap/material-color-picker'

export default function MaterialPicker({
	value,
	onChange,
}: Readonly<{value: Material; onChange: (value: Material) => void}>) {
	const [material, setMaterial] = useState(value)

	const changeType = (type: string) => {
		setMaterial(initialMaterials[type as Material['type']])
	}

	useEffect(() => {
		onChange(material)
	}, [onChange, material])

	return (
		<>
			<Skeleton id='material' icon={<Origami size={16} />} label='Material'>
				<Select value={material.type} onValueChange={changeType}>
					<SelectTrigger className='w-[180px]'>
						<SelectValue placeholder='Choose a material' />
					</SelectTrigger>
					<SelectContent>
						{materialTypes.map((type) => (
							<SelectItem key={type} value={type}>
								{capitalize(type)}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</Skeleton>
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
	return (
		<Field id='refractive-index'>
			<FieldLabel htmlFor='refractive-index'>Refractive Index</FieldLabel>
			<SliderWithDisplay
				id='refractive-index'
				value={material.ridx}
				min={0}
				max={10}
				step={0.01}
				onChange={(v) => onChange({...material, ridx: v})}
				ariaLabel='The refractive index'
			/>
			<FieldDescription>
				For solid glass, choose 1.5. For hollow glass, additionally create a
				slightly smaller object with refractive index of 0.67.
			</FieldDescription>
		</Field>
	)
}

function MetalFields() {}


