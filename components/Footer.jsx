import React from "react";
// ═══════════════════════════════════════════════════
// Footer.jsx (seller + main shared)
// ═══════════════════════════════════════════════════
export default function Footer() {
    const footerLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/' },
    { label: 'Contact Us', href: '/' },
    { label: 'Privacy Policy', href: '/' },
  ];
 
  const socialPaths = [
    'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z',
    'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z',
    'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 19.5h11a3 3 0 003-3v-11a3 3 0 00-3-3h-11a3 3 0 00-3 3v11a3 3 0 003 3z',
  ];
 
  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-ghost)',
        background: 'var(--bg-deep)',
        marginTop: '2rem',
        position: 'relative',
      }}
    >
      {/* Top glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(232,244,255,0.15), transparent)' }}
      />
 
      <div className="px-6 md:px-16 lg:px-32 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
 
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  background: 'linear-gradient(135deg, #d4d4d4 0%, #888 50%, #d4d4d4 100%)',
                  boxShadow: '0 0 16px rgba(232,244,255,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Clash Display', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  color: '#080808',
                }}
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
 
            <p
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: '0.875rem',
                fontWeight: 300,
                color: 'var(--text-muted)',
                lineHeight: 1.75,
                maxWidth: 260,
                marginBottom: 24,
              }}
            >
              Premium electronics and gadgets curated for tech enthusiasts who refuse to settle for less.
            </p>
 
            {/* Social icons */}
            <div className="flex items-center gap-2.5">
              {socialPaths.map((path, i) => (
                <a
                  key={i}
                  href="#"
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 9,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border-ghost)',
                    color: 'var(--text-muted)',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'var(--border-ice)';
                    e.currentTarget.style.color = 'var(--ice)';
                    e.currentTarget.style.boxShadow = '0 0 12px var(--ice-glow-dim)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'var(--border-ghost)';
                    e.currentTarget.style.color = 'var(--text-muted)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
 
          {/* Company links */}
          <div>
            <h4
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--text-primary)',
                marginBottom: 20,
              }}
            >
              Company
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {footerLinks.map(item => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    style={{
                      fontFamily: "'Satoshi', sans-serif",
                      fontSize: '0.875rem',
                      fontWeight: 400,
                      color: 'var(--text-muted)',
                      textDecoration: 'none',
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--silver-200)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
 
          {/* Contact */}
          <div>
            <h4
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontSize: '0.7rem',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--text-primary)',
                marginBottom: 20,
              }}
            >
              Get in Touch
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                +1-234-567-890
              </p>
              <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                contact@quickcart.dev
              </p>
              <p
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: '0.75rem',
                  color: 'var(--text-ghost)',
                  marginTop: 8,
                  letterSpacing: '0.02em',
                }}
              >
                Mon–Fri: 9am – 6pm EST
              </p>
            </div>
          </div>
        </div>
      </div>
 
      {/* Bottom bar */}
      <div
        style={{ borderTop: '1px solid var(--border-ghost)' }}
        className="px-6 md:px-16 lg:px-32 py-4 flex flex-col md:flex-row items-center justify-between gap-2"
      >
        <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '0.75rem', color: 'var(--text-ghost)' }}>
          © 2025 QuickCart. All rights reserved.
        </p>
        <p style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '0.75rem', color: 'var(--text-ghost)' }}>
          Built with ♥ for premium tech lovers
        </p>
      </div>
    </footer>
  );
}