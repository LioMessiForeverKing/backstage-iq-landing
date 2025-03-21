import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Backstage IQ',
  description: 'Your Music Is Blowing Up. Do You Know Where?',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
