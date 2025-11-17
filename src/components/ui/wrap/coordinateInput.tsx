import {Label} from '@radix-ui/react-label'
import {
	InputGroup,
	InputGroupInput,
	InputGroupAddon,
} from '@/components/ui/input-group'
import {Vec3} from '@/lib/utils'
import {useEffect, useState} from 'react'

type CoordinateInputProps = {
	values: Vec3
	onChange?: (value: Vec3) => void
}

export default function CoordinateInput({
	values,
	onChange,
}: Readonly<CoordinateInputProps>) {
	const [x, setX] = useState(-values[0])
	const [y, setY] = useState(values[1])
	const [z, setZ] = useState(values[2])

	useEffect(() => {
		onChange?.([-x, y, z])
	}, [onChange, x, y, z])

	return (
		<div className='flex gap-2'>
			<CoordinateInputField value={x} label='x' onChange={setX} />
			<CoordinateInputField value={y} label='y' onChange={setY} />
			<CoordinateInputField value={z} label='z' onChange={setZ} />
		</div>
	)
}

function CoordinateInputField({
	value,
	label,
	onChange,
}: Readonly<{
	value: number | ''
	label: 'x' | 'y' | 'z'
	onChange: (value: number) => void
}>) {
	const [valueString, setValueString] = useState(value.toString())
	useEffect(() => {
		const newValue = Number.parseFloat(valueString)
		if (Number.isNaN(newValue)) {
			onChange(0)
		} else {
			onChange(newValue)
		}
	}, [onChange, valueString])

	const upperLabel = label.toUpperCase()
	return (
		<InputGroup>
			<InputGroupInput
				id={label}
				value={valueString}
				type='number'
				placeholder='0'
				onChange={(e) => setValueString(e.target.value)}
				className='placeholder:text-foreground'
				aria-label={`The ${upperLabel} coordinate`}
			/>
			<InputGroupAddon>
				<Label htmlFor={label}>{upperLabel}</Label>
			</InputGroupAddon>
		</InputGroup>
	)
}
