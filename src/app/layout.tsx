import Head from 'next/head'
import '../styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Daniel Burger’s Newsletter',
  description: 'Official newsletter of Daniel Burger'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className="bg-dark h-full overscroll-none selection:bg-magenta selection:text-dark"
    >
      <Head>
        <meta name="theme-color" content="#1A001A" />
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, interactive-widget=resizes-content"
        />
      </Head>
      <body className="overscroll-none">{children}</body>
    </html>
  )
}
