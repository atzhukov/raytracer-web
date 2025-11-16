import {Field, FieldDescription, FieldError, FieldLabel} from '../field'

type FieldSkeletonProps = {
	id?: string
	icon?: React.ReactNode
	label?: string
	children: React.ReactNode
	description?: string
	error?: string
}
export function FieldSkeleton(props: Readonly<FieldSkeletonProps>) {
	return (
		<Field id={props.id} data-invalid={!!props.error}>
			<FieldLabel
				className='flex items-center gap-2 text-foreground'
				htmlFor={props.id}
			>
				{props.icon}
				{props.label}
			</FieldLabel>
			{props.children}
			<FieldError>{props.error}</FieldError>
			{props.description && (
				<FieldDescription>{props.description}</FieldDescription>
			)}
		</Field>
	)
}
