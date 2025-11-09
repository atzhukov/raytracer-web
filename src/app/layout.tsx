import type {Metadata} from 'next'
import {Aleo} from 'next/font/google'
import './globals.css'

export const metadata: Metadata = {
	title: 'Raytracer',
}

const aleo = Aleo({
	variable: '--font-aleo',
	weight: ['200', '400', '600'],
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
			<body className={`${aleo.className} antialiased bg-(--color-background)`}>
				<div className='flex flex-col justify-between min-h-screen p-2'>
					<header className='flex justify-center bg-amber-800 rounded-lg'>
						{info.header}
					</header>
					<main className='h-auto'>{children}</main>
					<footer className='flex justify-center bg-amber-800 rounded-lg'>
						{info.footer}
					</footer>
				</div>
			</body>
		</html>
	)
}
