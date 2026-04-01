
// ═══════════════════════════════════════════════════
// NewsLetter.jsx
// ═══════════════════════════════════════════════════
export default function NewsLetter() {
    return (
    <section style={{ padding: '2rem 0 5rem' }}>
      <div
        className="relative overflow-hidden py-16 px-8 text-center"
        style={{
          background: 'linear-gradient(145deg, #0d0d0d 0%, #111111 100%)',
          border: '1px solid var(--border-soft)',
          borderTopColor: 'var(--border-ice)',
          borderRadius: 20,
        }}
      >
        {/* Top glow */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(232,244,255,0.55), transparent)',
            boxShadow: '0 0 20px rgba(232,244,255,0.2)',
          }}
        />
 
        {/* Center ambient */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
          style={{
            width: 400,
            height: 120,
            background: 'radial-gradient(ellipse, rgba(232,244,255,0.05) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
 
        <div className="relative z-10 flex flex-col items-center gap-5 max-w-xl mx-auto">
          <span
            className="badge badge-ice"
            style={{ fontFamily: "'Clash Display', sans-serif" }}
          >
            Newsletter
          </span>
 
          <h2
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              color: 'var(--text-bright)',
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
            }}
          >
            Subscribe &amp; Get{' '}
            <span className="grad-text">20% Off</span>
          </h2>
 
          <p
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize: '0.92rem',
              fontWeight: 300,
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              maxWidth: 360,
            }}
          >
            Join thousands of tech enthusiasts. Get the latest deals, product drops, and exclusive offers straight to your inbox.
          </p>
 
          <div
            className="flex w-full max-w-md gap-0 mt-2 overflow-hidden"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-soft)',
              borderRadius: 99,
              padding: '5px 5px 5px 20px',
            }}
          >
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 bg-transparent outline-none text-sm"
              style={{
                fontFamily: "'Satoshi', sans-serif",
                color: 'var(--text-primary)',
                fontSize: '0.875rem',
              }}
            />
            <button className="btn-primary btn-sm flex-shrink-0" style={{ borderRadius: 99 }}>
              <span>Subscribe</span>
            </button>
          </div>
 
          <p
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize: '0.72rem',
              color: 'var(--text-ghost)',
            }}
          >
            No spam. Unsubscribe anytime. Privacy guaranteed.
          </p>
        </div>
      </div>
    </section>
  );
}
 
 