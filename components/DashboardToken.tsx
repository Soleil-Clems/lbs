'use client'

import { useEffect, useState } from 'react'
import { getToken } from 'next-auth/jwt'

export default function DashboardToken() {
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const fetchToken = async () => {
      const res = await fetch('/api/token') // on va créer cette route juste après
      const data = await res.json()
      setToken(data.token || 'No token found')
    }

    fetchToken()
  }, [])

  return (
    <div className="mt-10">
      <h2 className="text-lg font-semibold mb-2">Your raw JWT token:</h2>
      <textarea
        readOnly
        className="w-full text-blue-500 h-48 p-4 border font-mono text-sm rounded bg-gray-100"
        value={token || 'Loading...'}
      />
      <p className="mt-2 text-sm text-gray-600">
        📋 Copie ce token et colle-le sur <a className="underline text-blue-600" href="https://jwt.io" target="_blank">jwt.io</a> pour l’analyser.
      </p>
    </div>
  )
}
