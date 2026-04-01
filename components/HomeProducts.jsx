

// ═══════════════════════════════════════════════════
// HomeProducts.jsx
// ═══════════════════════════════════════════════════
"use client"
import ProductCard from "./ProductCard";
import { useAppContext } from "@/context/AppContext";
 
export default function HomeProducts() {
    const { products, router } = useAppContext();
 
  return (
    <section style={{ padding: '5rem 0' }}>
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="eyebrow eyebrow-ice mb-3">Curated Collection</p>
          <h2
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
              color: 'var(--text-bright)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
            }}
          >
            Popular{' '}
            <span className="grad-text">Products</span>
          </h2>
        </div>
 
        <button
          onClick={() => router.push('/all-products')}
          className="hidden md:flex items-center gap-2 group transition-all"
          style={{
            fontFamily: "'Satoshi', sans-serif",
            fontSize: '0.875rem',
            fontWeight: 500,
            color: 'var(--text-muted)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--ice)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          View all
          <svg
            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
 
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {products.map((product, i) => (
          <ProductCard key={i} product={product} />
        ))}
      </div>
 
      <div className="flex justify-center mt-12">
        <button
          onClick={() => router.push('/all-products')}
          className="btn-secondary"
          style={{ borderRadius: 99 }}
        >
          See all products
        </button>
      </div>
    </section>
  );
}
 