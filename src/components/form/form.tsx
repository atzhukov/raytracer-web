'use client'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import {Slider} from '@/components/ui/slider'
import {
	Field,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldSet,
} from '@/components/ui/field'
import {Button} from '../ui/button'
import {
	Camera,
	FolderGit2,
	ImageIcon,
	Play,
	RefreshCw,
	Scan,
} from 'lucide-react'
import {useConfigurationStore} from '@/lib/store'
import {useReducer, useState} from 'react'
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
	const [localCamera, update] = useReducer(
		(state: CameraSpec, changes: Partial<CameraSpec>) => {
			const newState: CameraSpec = {...state, ...changes}
			if (live) {
				updateGlobalCameraDebounced(newState)
			}
			return newState
		},
		initialCamera
	)

	const commit = (event: React.SyntheticEvent) => {
		event.preventDefault()
		updateCamera(localCamera)
	}

	const cameraSettings = (
		<FieldSet>
			<FieldGroup>
				<Field>
					<FieldLabel className='flex items-center gap-2' htmlFor='fov'>
						<Scan size='16' className='mb-0.1' />
						Field of View
					</FieldLabel>
					<div className='flex gap-2 align-center items-center'>
						<Slider
							id='fov'
							value={[localCamera.fov]}
							onValueChange={(v) => update({fov: v[0]})}
							min={0}
							max={100}
							step={1}
							aria-label='Field of View'
							role='slider'
						/>
						<span>{localCamera.fov}&deg;</span>
					</div>
					<FieldDescription>
						Describes the vertical angle visible in the rendered image.
					</FieldDescription>
				</Field>
			</FieldGroup>
		</FieldSet>
	)

	return (
		<form>
			<Card>
				<CardHeader>
					<CardTitle className='flex gap-2'>
						Online Ray Tracer{' '}
						<Link
							href='https://github.com/atzhukov/raytracer-web'
							target='_blank'
							role='link'
							aria-label='Link to the GitHub repository'
						>
							<FolderGit2 size='1em' />
						</Link>
					</CardTitle>
					<CardDescription>
						This ray tracer runs locally in your browser. Play around with the
						camera configuration or scene objects below to render new images:
					</CardDescription>
				</CardHeader>
				<CardContent className='mt-[-16]'>
					<Accordion type='single' defaultValue='camera-settings' collapsible>
						<AccordionItem value='camera-settings'>
							<AccordionTrigger icon={<Camera size={16} />}>
								Camera Settings
							</AccordionTrigger>
							<AccordionContent>{cameraSettings}</AccordionContent>
						</AccordionItem>

						<AccordionItem value='scene'>
							<AccordionTrigger icon={<ImageIcon size={16} />}>
								Scene
							</AccordionTrigger>
							<AccordionContent>
								Yes. It adheres to the WAI-ARIA design pattern.
							</AccordionContent>
						</AccordionItem>
					</Accordion>
					<Separator />
				</CardContent>
				<CardFooter>
					<div className='w-[100%] flex justify-between'>
						<div className='flex items-center gap-2'>
							<Switch
								id='live'
								checked={live}
								onCheckedChange={setLive}
								aria-label='Start ray tracing immediately'
								role='switch'
							/>
							<Label htmlFor='live' className='flex items-center gap-1.5'>
								<RefreshCw className='w-[1em]' />
								Live
							</Label>
						</div>
						<Button
							variant='outline'
							size='sm'
							disabled={live}
							onClick={(e) => commit(e)}
						>
							<Play /> Render
						</Button>
					</div>
				</CardFooter>
			</Card>
		</form>
	)
}
