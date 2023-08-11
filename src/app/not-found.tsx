'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  useEffect(() => {
    // Always redirect to the subscribe page if the user lands on a 404
    router.push('/subscribe')
  })
}
