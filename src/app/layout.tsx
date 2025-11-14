import type {Metadata} from 'next'
import {Figtree} from 'next/font/google'
import './globals.css'

export const metadata: Metadata = {
	title: 'Web Ray Tracer',
}

const figtree = Figtree({
	variable: '--font-figtree',
	weight: ['300', '400', '500', '600'],
	subsets: ['latin'],
})

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body
				className={`${figtree.className} antialiased bg-(--color-background)`}
				style={{
					scrollbarWidth: 'thin',
					scrollbarColor: 'var(--color-muted) var(--color-background)',
				}}
			>
				<main className='flex flex-col justify-center h-screen max-h-screen p-4'>
					{children}
				</main>
			</body>
		</html>
	)
}
