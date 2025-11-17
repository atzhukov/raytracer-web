'use client'

import {useDebouncedCallback} from 'use-debounce'
import {Slider} from '../slider'
import {useEffect, useState} from 'react'

type SliderWithDisplayProps = {
	id: string
	value: number
	displayValue?: (value: number) => string
	onChange: (value: number) => void
	ariaLabel: string
	min: number
	max: number
	step: number
}
export default function SliderWithDisplay(
	props: Readonly<SliderWithDisplayProps>
) {
	const [value, setValue] = useState(props.value)

	// Debounce onChange events
	const onChangeDebounced = useDebouncedCallback(() => {
		props.onChange(value)
	}, 200)
	useEffect(() => {
		onChangeDebounced()
	}, [onChangeDebounced, value])

	return (
		<div className='flex gap-2 align-center items-center'>
			<Slider
				id={props.id}
				value={[value]}
				onValueChange={(v) => setValue(v[0])}
				min={props.min}
				max={props.max}
				step={props.step}
				role='slider'
				aria-label={props.ariaLabel}
			/>
			<span className='w-[2.5em] text-right text-foreground'>
				{props.displayValue ? props.displayValue(value) : value}
			</span>
		</div>
	)
}
