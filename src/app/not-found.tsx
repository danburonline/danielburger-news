import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <head>
        <meta name="theme-color" content="#111827" />
        <title>Page Not Found</title>
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, interactive-widget=resizes-content"
        />
      </head>
      <body>
        <main className="h-[100dvh] min-h-[300px] w-screen flex flex-col justify-center items-center p-6">
          <h1 className="text-white font-bold text-3xl text-center px-8 mb-6">Page Not Found</h1>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-3 text-sm font-semibold text-black shadow-sm hover:bg-primaryDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryLight mt-0 w-auto"
          >
            Go to start page
          </a>
        </main>
      </body>
    </>
  )
}
