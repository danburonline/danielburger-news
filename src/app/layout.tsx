import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Daniel Burger’s Newsletter',
  description: 'Official newsletter of Daniel Burger',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang='en'
      className='bg-gray-900 h-full overscroll-none selection:bg-primary selection:text-black'
    >
      <head>
        <meta name='theme-color' content='#111827' />
        <link rel='manifest' href='/manifest.json' />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, interactive-widget=resizes-content'
        ></meta>
      </head>
      <body className='overscroll-none'>{children}</body>
    </html>
  )
}
