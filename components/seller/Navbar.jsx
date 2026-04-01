'use client'
import React from 'react'
import { useAppContext } from '@/context/AppContext'

const Navbar = () => {
  const { router } = useAppContext()

  return (
    <div
      className="flex items-center px-6 md:px-10 py-4 justify-between border-b"
      style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
    >
      {/* Logo */}
      <div
        className="flex items-center gap-2 cursor-pointer group"
        onClick={() => router.push('/')}
      >
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#7c5cfc] to-[#00d4aa] flex items-center justify-center text-white font-bold text-xs font-heading">
          Q
        </div>
        <span className="font-heading font-700 text-base tracking-tight text-[var(--text-primary)] group-hover:text-[var(--accent-violet-light)] transition-colors">
          QuickCart
        </span>
        <span
          className="text-xs font-heading tracking-widest uppercase px-2 py-0.5 rounded-md ml-1"
          style={{
            background: 'var(--accent-violet-glow)',
            border: '1px solid var(--border-accent)',
            color: 'var(--accent-violet-light)',
          }}
        >
          Seller
        </span>
      </div>

      {/* Right */}
      <button
        className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-heading tracking-wide transition-all border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:border-[var(--accent-rose)] hover:text-[var(--accent-rose)]"
        style={{ background: 'var(--bg-card)' }}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
        Logout
      </button>
    </div>
  )
}

export default Navbar