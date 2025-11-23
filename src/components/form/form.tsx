'use client'

import {Button} from '@/components/ui/button'
import {FolderGit2, Play} from 'lucide-react'
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
import {useConfigurationStore} from '@/lib/store'
import {useShallow} from 'zustand/shallow'

export default function Form() {
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
					<ConfigurationSections />
					<Separator />
				</CardContent>
				<CardFooter>
					<div className='w-[100%] flex justify-between'>
						<LiveSwitch />
						<RenderButton />
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

function LiveSwitch() {
	const [live, setLive] = useConfigurationStore(
		useShallow((state) => [state.live, state.setLive])
	)
	return (
		<div className='flex items-center gap-2'>
			<Switch
				id='live'
				checked={live}
				onCheckedChange={setLive}
				aria-label='Start ray tracing immediately'
				role='switch'
			/>
			<Label htmlFor='live' className='flex items-center gap-1.5'>
				Live
			</Label>
		</div>
	)
}

function RenderButton() {
	const {disabled, commit} = useConfigurationStore(
		useShallow((state) => ({
			disabled: state.live || state.queued.scene.length == 0,
			commit: state.commit,
		}))
	)
	return (
		<Button
			variant='outline'
			size='sm'
			disabled={disabled}
			onClick={commit}
			preventDefault
		>
			<Play /> Render
		</Button>
	)
}
