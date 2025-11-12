'use client'

import {Button} from '../ui/button'
import {FolderGit2, Play} from 'lucide-react'
import {useConfigurationStore} from '@/lib/store'
import {SyntheticEvent, useReducer, useState} from 'react'
import {useDebouncedCallback} from 'use-debounce'
import {CameraSpec} from '@/lib/render/render'
import {Switch} from '../ui/switch'
import {Label} from '../ui/label'
import {Separator} from '../ui/separator'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../ui/card'
import Link from 'next/link'
import {ConfigurationSections} from './section'

export default function Form() {
	const initialCamera = useConfigurationStore.getState().cameraSpec
	const updateCamera = useConfigurationStore((state) => state.setCameraSpec)

	const [live, setLive] = useState(true)

	// Keep a local camera spec object and debounce changes to the configuration store,
	// so that the UI updates immediately but ray tracing only starts after a delay
	const updateGlobalCameraDebounced = useDebouncedCallback(
		(newState: CameraSpec) => updateCamera(newState),
		500
	)
	const [localCamera, updateLocalCamera] = useReducer(
		(state: CameraSpec, changes: Partial<CameraSpec>) => {
			const newState: CameraSpec = {...state, ...changes}
			if (live) {
				updateGlobalCameraDebounced(newState)
			}
			return newState
		},
		initialCamera
	)

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
					<ConfigurationSections
						camera={localCamera}
						onChange={updateLocalCamera}
					/>
					<Separator />
				</CardContent>
				<CardFooter>
					<div className='w-[100%] flex justify-between'>
						<LiveSwitch checked={live} onChange={setLive} />
						<RenderButton
							disabled={live}
							onClick={() => updateCamera(localCamera)}
						/>
					</div>
				</CardFooter>
			</Card>
		</form>
	)
}

function Title() {
	return (
		<>
			Online Ray Tracer{' '}
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
