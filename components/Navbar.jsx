"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import { useUser, SignInButton, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  const { isSeller, router, getCartCount } = useAppContext();
  const { user } = useUser();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/all-products' },
    { label: 'About', href: '/' },
    { label: 'Contact', href: '/' },
  ];

  const iconBtnStyle = {
    width: 38,
    height: 38,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid var(--border-ghost)',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    color: 'var(--text-secondary)',
    flexShrink: 0,
  };

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? 'rgba(8,8,8,0.90)' : 'transparent',
          backdropFilter: scrolled ? 'blur(28px) saturate(160%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(28px) saturate(160%)' : 'none',
          borderBottom: scrolled ? '1px solid var(--border-ghost)' : '1px solid transparent',
          padding: scrolled ? '10px 0' : '18px 0',
        }}
      >
        {/* Top ice line on scroll */}
        {scrolled && (
          <div
            className="absolute top-0 left-0 right-0 h-px pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(232,244,255,0.25), transparent)' }}
          />
        )}

        <div className="px-6 md:px-16 lg:px-32 flex items-center justify-between">

          {/* ── Logo ── */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => router.push('/')}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #d4d4d4 0%, #888 50%, #d4d4d4 100%)',
                boxShadow: '0 0 20px rgba(232,244,255,0.25), 0 4px 12px rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                fontFamily: "'Clash Display', sans-serif",
                fontWeight: 700,
                fontSize: '0.9rem',
                color: '#080808',
                letterSpacing: '-0.02em',
              }}
              className="group-hover:scale-110 group-hover:shadow-[0_0_28px_rgba(232,244,255,0.4)]"
            >
              Q
            </div>
            <span
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontWeight: 700,
                fontSize: '1.1rem',
                letterSpacing: '-0.02em',
                color: 'var(--text-bright)',
              }}
            >
              Quick<span style={{ color: 'var(--chrome)' }}>Cart</span>
            </span>
          </div>

          {/* ── Desktop Links ── */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <Link key={l.label} href={l.href} className="nav-link">{l.label}</Link>
            ))}
            {isSeller && (
              <button
                onClick={() => router.push('/seller')}
                className="badge badge-silver px-4 py-1.5 rounded-full cursor-pointer transition-all text-xs hover:border-[var(--border-ice)] hover:text-[var(--ice)]"
                style={{ fontFamily: "'Clash Display', sans-serif" }}
              >
                Seller Panel
              </button>
            )}
          </div>

          {/* ── Right Icons ── */}
          <div className="hidden md:flex items-center gap-2">

            {/* Search */}
            <button
              style={iconBtnStyle}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--border-ice)';
                e.currentTarget.style.color = 'var(--ice)';
                e.currentTarget.style.boxShadow = '0 0 14px var(--ice-glow-dim)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border-ghost)';
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Cart */}
            <button
              onClick={() => router.push('/cart')}
              style={{ ...iconBtnStyle, position: 'relative' }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--border-ice)';
                e.currentTarget.style.color = 'var(--ice)';
                e.currentTarget.style.boxShadow = '0 0 14px var(--ice-glow-dim)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--border-ghost)';
                e.currentTarget.style.color = 'var(--text-secondary)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {getCartCount() > 0 && (
                <span className="cart-count">{getCartCount()}</span>
              )}
            </button>

            {/* Auth */}
            {user ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => router.push('/my-orders')}
                  style={{
                    ...iconBtnStyle,
                    width: 'auto',
                    padding: '0 14px',
                    fontSize: '0.75rem',
                    fontFamily: "'Clash Display', sans-serif",
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--border-ice)';
                    e.currentTarget.style.color = 'var(--ice)';
                    e.currentTarget.style.boxShadow = '0 0 14px var(--ice-glow-dim)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border-ghost)';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  My Orders
                </button>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-9 h-9 rounded-xl",
                      userButtonPopoverCard: "bg-[#161616] border border-[rgba(232,244,255,0.12)]",
                      userButtonPopoverText: "text-[#f0f0f0]",
                    }
                  }}
                />
              </div>
            ) : (
              <SignInButton mode="modal">
                <button
                  className="btn-secondary btn-sm"
                  style={{ borderRadius: 10 }}
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Sign In
                </button>
              </SignInButton>
            )}
          </div>

          {/* ── Mobile Right ── */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => router.push('/cart')}
              style={{ ...iconBtnStyle, position: 'relative' }}
            >
              <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {getCartCount() > 0 && <span className="cart-count">{getCartCount()}</span>}
            </button>

            {user ? (
              <UserButton appearance={{ elements: { avatarBox: "w-9 h-9 rounded-xl" } }} />
            ) : (
              <SignInButton mode="modal">
                <button style={iconBtnStyle}>
                  <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
              </SignInButton>
            )}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={iconBtnStyle}
            >
              <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        {menuOpen && (
          <div
            className="md:hidden mx-4 mt-2 rounded-2xl px-6 py-5 anim-fade-down"
            style={{
              background: 'rgba(14,14,14,0.96)',
              backdropFilter: 'blur(28px)',
              border: '1px solid var(--border-soft)',
              borderTopColor: 'var(--border-ice)',
            }}
          >
            {/* Top glow line */}
            <div
              className="absolute top-0 left-6 right-6 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(232,244,255,0.4), transparent)' }}
            />
            <div className="flex flex-col gap-1">
              {navLinks.map(l => (
                <Link
                  key={l.label}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: "'Satoshi', sans-serif",
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    color: 'var(--text-secondary)',
                    padding: '10px 0',
                    borderBottom: '1px solid var(--border-ghost)',
                    transition: 'color 0.2s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--text-bright)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                >
                  {l.label}
                </Link>
              ))}
              {user && (
                <button
                  onClick={() => { router.push('/my-orders'); setMenuOpen(false); }}
                  style={{
                    fontFamily: "'Satoshi', sans-serif",
                    fontSize: '0.9rem',
                    color: 'var(--text-secondary)',
                    padding: '10px 0',
                    textAlign: 'left',
                    borderBottom: '1px solid var(--border-ghost)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  My Orders
                </button>
              )}
              {isSeller && (
                <button
                  onClick={() => { router.push('/seller'); setMenuOpen(false); }}
                  style={{
                    fontFamily: "'Clash Display', sans-serif",
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: 'var(--ice)',
                    padding: '12px 0 4px',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    letterSpacing: '0.04em',
                  }}
                >
                  Seller Panel →
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
      <div className="h-16 md:h-20" />
    </>
  );
}