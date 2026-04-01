'use client'
import { useAppContext } from '@/context/AppContext'
import { useEffect, useRef, useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function OrderPlaced() {
  const { router } = useAppContext()
  const [countdown, setCountdown] = useState(5)
  const [orderSaved, setOrderSaved] = useState(false)
  const [error, setError] = useState(null)
  const routerRef = useRef(router)
  const searchParams = useSearchParams()
  const hasSaved = useRef(false) // prevent double-save

  useEffect(() => {
    routerRef.current = router
  }, [router])

  // ✅ Save the order when page loads
  useEffect(() => {
    const saveOrder = async () => {
      if (hasSaved.current) return
      hasSaved.current = true

      const sessionId = searchParams.get('session_id')
      if (!sessionId) {
        setError('No session ID found')
        return
      }

      try {
        const res = await fetch('/api/order/save-stripe-order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        })
        const data = await res.json()
        if (!data.success) throw new Error(data.message)
        setOrderSaved(true)
      } catch (err) {
        console.error('Failed to save order:', err)
        setError(err.message)
      }
    }

    saveOrder()
  }, [searchParams])

  // ✅ Only start countdown after order is saved
  useEffect(() => {
    if (!orderSaved) return

    let count = 5
    const t = setInterval(() => {
      count -= 1
      setCountdown(count)
      if (count <= 0) {
        clearInterval(t)
        routerRef.current.push('/my-orders')
      }
    }, 1000)
    return () => clearInterval(t)
  }, [orderSaved])

  return (
    <div className="h-screen flex flex-col items-center justify-center gap-8 px-6"
      style={{ background: 'var(--bg-void)' }}>

      {/* Show error state */}
      {error && (
        <div className="rounded-xl px-6 py-4 text-sm"
          style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171' }}>
          ⚠️ {error}
        </div>
      )}

      {/* Show saving state */}
      {!orderSaved && !error && (
        <p className="text-sm animate-pulse" style={{ color: 'var(--text-secondary)' }}>
          Confirming your order...
        </p>
      )}

      {/* Animated success ring */}
      <div className="relative flex items-center justify-center">
        <div className="absolute w-40 h-40 rounded-full animate-ping opacity-10"
          style={{ background: 'var(--emerald)' }} />
        <div className="absolute w-32 h-32 rounded-full animate-ping opacity-15"
          style={{ background: 'var(--emerald)', animationDelay: '0.3s' }} />
        <div className="relative w-28 h-28">
          <div
            className="absolute inset-0 rounded-full animate-spin"
            style={{ border: '2px solid transparent', borderTopColor: 'var(--emerald)', borderRightColor: 'var(--violet)' }}
          />
          <div
            className="absolute inset-1 rounded-full flex items-center justify-center"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-dim)' }}
          >
            <svg className="w-12 h-12" fill="none" stroke="var(--emerald)" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="text-center space-y-3">
        <h1 className="font-display font-600"
          style={{ fontSize: 'clamp(2rem,4vw,3rem)', color: 'var(--text-bright)' }}>
          Order <span className="grad-text-violet">Confirmed!</span>
        </h1>
        <p className="text-base" style={{ color: 'var(--text-secondary)' }}>
          Thank you for your purchase. We're preparing your order!
        </p>
      </div>

      {orderSaved && (
        <div
          className="flex flex-col items-center gap-3 rounded-2xl px-10 py-5"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border-dim)' }}
        >
          <p className="eyebrow">Redirecting to orders in</p>
          <div
            className="font-ui font-700"
            style={{
              fontSize: '3rem',
              background: 'linear-gradient(135deg, var(--violet-light), var(--cyan-light))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {countdown}
          </div>
          <div className="h-1 rounded-full overflow-hidden w-full"
            style={{ background: 'var(--bg-elevated)' }}>
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${(countdown / 5) * 100}%`,
                background: 'linear-gradient(90deg, var(--violet), var(--cyan))',
              }}
            />
          </div>
        </div>
      )}

      <button
        onClick={() => router.push('/my-orders')}
        className="rounded-full px-10 py-3 text-sm font-ui font-500 tracking-wide"
        style={{
          background: 'linear-gradient(135deg, #8b5cf6, #06b6d4)',
          color: '#fff',
          border: 'none',
          boxShadow: '0 4px 20px rgba(139,92,246,0.35)',
          cursor: 'pointer',
        }}
      >
        View My Orders →
      </button>
    </div>
  )
}