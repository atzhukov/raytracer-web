import {existsSync, copyFileSync, mkdirSync} from 'node:fs'
import {join} from 'node:path'

function main() {
	const wasmSourceLocation = join(
		process.cwd(),
		'node_modules',
		'@atzhukov',
		'raytracer',
		'raytracer_bg.wasm'
	)
	if (!existsSync(wasmSourceLocation)) {
		console.error('raytracer_bg.wasm not found.')
		return
	}
	console.log(`.wasm location: ${wasmSourceLocation}`)

	const publicDir = join(process.cwd(), 'public')
	if (!existsSync(publicDir)) {
		mkdirSync(publicDir, {recursive: true})
	}

	const wasmTargetLocation = join(publicDir, 'raytracer_bg.wasm')
	copyFileSync(wasmSourceLocation, wasmTargetLocation)

	console.log(`.wasm copied to: ${wasmTargetLocation}`)
}

main()
