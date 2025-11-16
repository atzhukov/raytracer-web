import {Vec3} from '@/lib/render/render'
import {
	hexToRgb,
	rgbToHex,
} from '../external/shadcn-input-color/color-converter'
import InputColor from '../external/shadcn-input-color/input-color'
import {Palette} from 'lucide-react'

export default function MaterialColorPicker({
	color,
	onChange,
}: Readonly<{color: Vec3; onChange: (color: Vec3) => void}>) {
	const hex = rgbToHex(
		Math.round(color[0] * 255),
		Math.round(color[1] * 255),
		Math.round(color[2] * 255)
	)

	const onChangeConverting = (hex: string) => {
		const rgb = hexToRgb(hex)
		onChange([rgb.r / 255, rgb.g / 255, rgb.b / 255])
	}

	return (
		<InputColor
			label='Color'
			icon={<Palette size={16} />}
			value={hex}
			onChange={onChangeConverting}
			className='mt-0'
		/>
	)
}
