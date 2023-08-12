'use client'

import { useEffect, useState } from 'react'
import { verifyAction } from '../actions'
import { useSearchParams } from 'next/navigation'

export default function VerifyPage() {
  const emailParams = useSearchParams()
  const email = emailParams.get('email')

  const [verificationStatus, setVerificationStatus] = useState('Verification in progress...')
  const [message, setMessage] = useState('')

  useEffect(() => {
    async function verifyEmail() {
      let serverResponse = await verifyAction({ email } as { email: string })

      if (serverResponse.statusCode === 200) {
        setVerificationStatus('Email verified!')
        setMessage(serverResponse.body)
      }
    }

    if (email) {
      verifyEmail()
    }
  }, [email])

  return (
    <>
      <head>
        <meta name="theme-color" content="#1A001A" />
        <title>{verificationStatus}</title>
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, interactive-widget=resizes-content"
        />
      </head>
      <body>
        <main className="h-[100dvh] min-h-[300px] w-screen flex flex-col justify-center items-center p-6">
          <h1 className="text-bright font-bold text-3xl text-center px-8 mb-6">
            {verificationStatus}
          </h1>
          <p className="text-bright text-m text-center">{message}</p>
        </main>
      </body>
    </>
  )
}
