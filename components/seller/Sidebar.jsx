'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menuItems = [
  {
    name: 'Add Product',
    path: '/seller',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
  {
    name: 'Product List',
    path: '/seller/product-list',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    ),
  },
  {
    name: 'Orders',
    path: '/seller/orders',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
]

const Sidebar = () => {
  const pathname = usePathname()

  return (
    <div
      className="md:w-56 w-16 min-h-screen border-r flex flex-col py-4 gap-1 flex-shrink-0"
      style={{ background: 'var(--bg-surface)', borderColor: 'var(--border-subtle)' }}
    >
      {menuItems.map((item) => {
        const isActive = pathname === item.path
        return (
          <Link href={item.path} key={item.name}>
            <div
              className="flex items-center gap-3 mx-2 px-3 py-3 rounded-xl transition-all cursor-pointer"
              style={{
                background: isActive ? 'var(--accent-violet-glow)' : 'transparent',
                borderLeft: isActive ? '3px solid var(--accent-violet)' : '3px solid transparent',
                color: isActive ? 'var(--accent-violet-light)' : 'var(--text-muted)',
              }}
              onMouseEnter={e => {
                if (!isActive) {
                  e.currentTarget.style.background = 'var(--bg-card-hover)'
                  e.currentTarget.style.color = 'var(--text-secondary)'
                }
              }}
              onMouseLeave={e => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color = 'var(--text-muted)'
                }
              }}
            >
              <span className="flex-shrink-0">{item.icon}</span>
              <span className="hidden md:block text-sm font-heading tracking-wide">
                {item.name}
              </span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default Sidebar