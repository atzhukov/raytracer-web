import {Label} from '@radix-ui/react-label'
import {
	InputGroup,
	InputGroupInput,
	InputGroupAddon,
} from '@/components/ui/input-group'
import {Vec3} from '@/lib/render/render'

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
			<InputGroup>
				<InputGroupInput
					id='x'
					value={coordinate.x}
					type='number'
					aria-label='The X coordinate'
					placeholder='0'
					onChange={(e) => emitChange(0, +e.target.value)}
					className='placeholder:text-foreground'
				/>
				<InputGroupAddon>
					<Label htmlFor='x'>X</Label>
				</InputGroupAddon>
			</InputGroup>
			<InputGroup>
				<InputGroupInput
					id='y'
					value={coordinate.y}
					type='number'
					aria-label='The Y coordinate'
					placeholder='0'
					onChange={(e) => emitChange(1, +e.target.value)}
					className='placeholder:text-foreground'
				/>
				<InputGroupAddon>
					<Label htmlFor='y'>Y</Label>
				</InputGroupAddon>
			</InputGroup>
			<InputGroup>
				<InputGroupInput
					id='z'
					value={coordinate.z}
					type='number'
					aria-label='The Z coordinate'
					placeholder='0'
					onChange={(e) => emitChange(2, +e.target.value)}
					className='placeholder:text-foreground'
				/>
				<InputGroupAddon>
					<Label htmlFor='z'>Z</Label>
				</InputGroupAddon>
			</InputGroup>
		</div>
	)
}
