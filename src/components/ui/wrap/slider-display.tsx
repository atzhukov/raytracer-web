import {Slider} from '../slider'

type SliderWithDisplayProps = {
	id: string
	value: number
	displayValue?: string
	onChange: (value: number) => void
	ariaLabel: string
	min: number
	max: number
	step: number
}
export default function SliderWithDisplay(
	props: Readonly<SliderWithDisplayProps>
) {
	return (
		<div className='flex gap-2 align-center items-center'>
			<Slider
				id={props.id}
				value={[props.value]}
				onValueChange={(v) => props.onChange(v[0])}
				min={props.min}
				max={props.max}
				step={props.step}
				role='slider'
				aria-label={props.ariaLabel}
			/>
			<span className='w-[2.5em] text-right text-foreground'>
				{props.displayValue || props.value}
			</span>
		</div>
	)
}
