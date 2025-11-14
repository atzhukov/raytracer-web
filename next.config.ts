import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
	headers: async () => [
		{
			source: '/raytracer_bg.wasm',
			headers: [
				{
					key: 'Cache-Control',
					value: 'public, max-age=216000, immutable',
				},
			],
		},
	],
}

export default nextConfig
