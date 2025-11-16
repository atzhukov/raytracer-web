import {Activity, FlipVertical2, Origami, Palette} from 'lucide-react'
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
import {FieldSet} from '@/components/ui/field'
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
				{material.type == 'metal' && (
					<MetalFields material={material} onChange={setMaterial} />
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
		<FieldSkeleton
			id='color'
			icon={<Palette size={16} />}
			label='Color'
			description='The color of the matte material.'
		>
			<MaterialColorPicker
				color={material.color}
				onChange={(color) => onChange({...material, color})}
			/>
		</FieldSkeleton>
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

function MetalFields({
	material,
	onChange,
}: Readonly<{
	material: MaterialOf<'metal'>
	onChange: (material: MaterialOf<'metal'>) => void
}>) {
	return (
		<FieldSet>
			<FieldSkeleton
				id='color-metal'
				icon={<Palette size={16} />}
				label='Color'
				description='The color of the metal.'
			>
				<MaterialColorPicker
					color={material.color}
					onChange={(color) => onChange({...material, color})}
				/>
			</FieldSkeleton>

			<FieldSkeleton
				id='fuzz'
				icon={<Activity size={16} />}
				label='Fuzz'
				description='The roughness of the metal surface.'
			>
				<SliderWithDisplay
					id='fuzz'
					value={material.fuzz}
					min={0}
					max={1}
					step={0.01}
					onChange={(fuzz) => onChange({...material, fuzz})}
					ariaLabel='The fuzziness of metal'
				/>
			</FieldSkeleton>
		</FieldSet>
	)
}
