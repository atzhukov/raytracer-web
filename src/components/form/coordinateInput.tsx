import {Label} from '@radix-ui/react-label'
import {
	InputGroup,
	InputGroupInput,
	InputGroupAddon,
} from '@/components/ui/input-group'
import {Vec3} from '@/lib/utils'

type CoordinateInputProps = {
	values: Vec3
	onChange?: (value: Vec3) => void
}

type Coordinate = {
	x: number | ''
	y: number | ''
	z: number | ''
}

export default function CoordinateInput({
	values,
	onChange,
}: Readonly<CoordinateInputProps>) {
	function emitChange(changedIndex: 0 | 1 | 2, newValue: number) {
		if (!onChange) {
			return
		}
		const updatedCoordinates: Vec3 = [...values]
		updatedCoordinates[changedIndex] = newValue || 0
		onChange(updatedCoordinates)
	}

	// Display coordinates with string keys, so that input can be erased
	// (using numbers with undefined causes controlled => uncontrolled input errors)
	const coordinate: Coordinate = {
		x: values[0] == 0 ? '' : values[0],
		y: values[1] == 0 ? '' : values[1],
		z: values[2] == 0 ? '' : values[2],
	}

	return (
		<div className='flex gap-2'>
			<CoordinateInputField
				value={coordinate.x}
				label='x'
				onChange={(v) => emitChange(0, v)}
			/>
			<CoordinateInputField
				value={coordinate.y}
				label='y'
				onChange={(v) => emitChange(1, v)}
			/>
			<CoordinateInputField
				value={coordinate.z}
				label='z'
				onChange={(v) => emitChange(2, v)}
			/>
		</div>
	)
}

function CoordinateInputField({
	value,
	label,
	onChange,
}: Readonly<{
	value: number | ''
	label: keyof Coordinate
	onChange: (value: number) => void
}>) {
	const upperLabel = label.toUpperCase()
	return (
		<InputGroup>
			<InputGroupInput
				id={label}
				value={value}
				type='number'
				placeholder='0'
				onChange={(e) => onChange(+e.target.value)}
				className='placeholder:text-foreground'
				aria-label={`The ${upperLabel} coordinate`}
			/>
			<InputGroupAddon>
				<Label htmlFor={label}>{upperLabel}</Label>
			</InputGroupAddon>
		</InputGroup>
	)
}
