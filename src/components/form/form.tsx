'use client'

import {Button} from '@/components/ui/button'
import {FolderGit2, Play} from 'lucide-react'
import {useCamera} from '@/lib/store'
import {SyntheticEvent, useState} from 'react'
import {Switch} from '@/components/ui/switch'
import {Label} from '@/components/ui/label'
import {Separator} from '@/components/ui/separator'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'
import {ConfigurationSections} from '@/components/form/section'

export default function Form() {
	const [live, setLive] = useState(true)
	const {camera, updateCamera, flushCamera} = useCamera(live)

	return (
		<form className='h-full'>
			<Card className='h-full'>
				<CardHeader>
					<CardTitle className='flex gap-2'>
						<Title />
					</CardTitle>
					<CardDescription>
						This ray tracer runs locally in your browser. Play around with the
						camera configuration or scene objects below to render new images:
					</CardDescription>
				</CardHeader>
				<CardContent className='mt-[-16] overflow-y-auto overscroll-y-auto'>
					<ConfigurationSections camera={camera} onChange={updateCamera} />
					<Separator />
				</CardContent>
				<CardFooter>
					<div className='w-[100%] flex justify-between'>
						<LiveSwitch checked={live} onChange={setLive} />
						<RenderButton disabled={live} onClick={flushCamera} />
					</div>
				</CardFooter>
			</Card>
		</form>
	)
}

function Title() {
	return (
		<>
			Web Ray Tracer{' '}
			<Link
				href='https://github.com/atzhukov/raytracer-web'
				target='_blank'
				role='link'
				aria-label='Link to the GitHub repository'
			>
				<FolderGit2 size='1em' />
			</Link>
		</>
	)
}

function LiveSwitch({
	checked,
	onChange,
}: Readonly<{checked: boolean; onChange: (value: boolean) => void}>) {
	return (
		<div className='flex items-center gap-2'>
			<Switch
				id='live'
				checked={checked}
				onCheckedChange={onChange}
				aria-label='Start ray tracing immediately'
				role='switch'
			/>
			<Label htmlFor='live' className='flex items-center gap-1.5'>
				Live
			</Label>
		</div>
	)
}

function RenderButton({
	disabled,
	onClick,
}: Readonly<{disabled: boolean; onClick: () => void}>) {
	const onClickPreventingDefault = (e: SyntheticEvent) => {
		e.preventDefault()
		onClick()
	}
	return (
		<Button
			variant='outline'
			size='sm'
			disabled={disabled}
			onClick={onClickPreventingDefault}
		>
			<Play /> Render
		</Button>
	)
}
