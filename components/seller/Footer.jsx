import React from 'react'

const Footer = () => {
  return (
    <div
      className="flex flex-col md:flex-row items-center justify-between px-8 py-4 border-t gap-2"
      style={{ borderColor: 'var(--border-subtle)', background: 'var(--bg-surface)' }}
    >
      <div className="flex items-center gap-3">
        <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#7c5cfc] to-[#00d4aa] flex items-center justify-center text-white font-bold text-xs">
          Q
        </div>
        <span
          className="w-px h-4"
          style={{ background: 'var(--border-soft)' }}
        />
        <p className="text-xs text-[var(--text-muted)]">
          © 2025 QuickCart. All rights reserved.
        </p>
      </div>
      <div className="flex items-center gap-4">
        {['Facebook', 'Twitter', 'Instagram'].map(social => (
          <a
            key={social}
            href="#"
            className="text-xs text-[var(--text-muted)] hover:text-[var(--accent-violet-light)] transition-colors"
          >
            {social}
          </a>
        ))}
      </div>
    </div>
  )
}

export default Footer