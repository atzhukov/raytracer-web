import type {Metadata} from 'next'
import {Figtree} from 'next/font/google'
import './globals.css'

export const metadata: Metadata = {
	title: 'Raytracer',
}

const figtree = Figtree({
	variable: '--font-figtree',
	weight: ['300', '400', '500', '600'],
	subsets: ['latin'],
})

const info = {
	header: 'Raytracer',
	footer: <a href='https://github.com/atzhukov/raytracer-web'>GitHub</a>,
} as const

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body
				className={`${figtree.className} antialiased bg-(--color-background)`}
			>
				<div className='flex flex-col justify-between min-h-screen p-2'>
					<header className='flex justify-center bg-amber-800 rounded-lg'>
						{info.header}
					</header>
					<main>{children}</main>
					<footer className='flex justify-center bg-amber-800 rounded-lg'>
						{info.footer}
					</footer>
				</div>
			</body>
		</html>
	)
}
