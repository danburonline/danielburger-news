import Head from 'next/head'

export default function NotFound() {
  return (
    <>
      <Head>
        <meta name="theme-color" content="#1A001A" />
        <title>Page Not Found</title>
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, interactive-widget=resizes-content"
        />
      </Head>
      <body>
        <main className="h-[100dvh] min-h-[300px] w-screen flex flex-col justify-center items-center p-6">
          <h1 className="text-bright font-bold text-3xl text-center px-8 mb-6">Page Not Found</h1>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-magenta px-4 py-3 text-sm font-semibold text-dark shadow-sm hover:bg-magentaDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-magentaLight mt-0 w-auto"
          >
            Go to start page
          </a>
        </main>
      </body>
    </>
  )
}
