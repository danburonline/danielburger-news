'use client'

import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  const handleGoHome = () => {
    router.push('/')
  }

  return (
    <main className="h-[100dvh] min-h-[300px] w-screen flex flex-col justify-center items-center p-6">
      <h1 className="text-white font-bold text-3xl text-center px-8 mb-6">Page Not Found</h1>
      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-3 text-sm font-semibold text-black shadow-sm hover:bg-primaryDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primaryLight mt-0 w-auto"
        onClick={handleGoHome}
      >
        Go to start page
      </button>
    </main>
  )
}
