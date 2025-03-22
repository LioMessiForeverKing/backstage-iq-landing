import type { Metadata } from 'next'
import './globals.css'
import { CustomCursor } from '@/components/CustomCursor'

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
      <body>
        {children}
        <CustomCursor />
      </body>
    </html>
  )
}
