"use client"
import React, { useState } from "react";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";

export default function ProductCard({ product }) {
  const { currency, router, addToCart } = useAppContext();
  const [liked, setLiked] = useState(false);
  const [adding, setAdding] = useState(false);

  const discount = Math.round(((product.price - product.offerPrice) / product.price) * 100);

  const handleAdd = (e) => {
    e.stopPropagation();
    setAdding(true);
    addToCart(product._id);
    setTimeout(() => setAdding(false), 900);
  };

  return (
    <div
      onClick={() => { router.push('/product/' + product._id); scrollTo(0, 0); }}
      className="product-card group cursor-pointer flex flex-col"
    >
      {/* ── Image Area ── */}
      <div
        className="relative overflow-hidden flex items-center justify-center"
        style={{
          background: 'linear-gradient(145deg, #161616 0%, #111111 100%)',
          aspectRatio: '1 / 1',
          padding: '1.5rem',
          borderRadius: '16px 16px 0 0',
        }}
      >
        {/* Discount badge */}
        {discount > 0 && (
          <div className="absolute top-3 left-3 z-10">
            <span
              className="badge badge-ice"
              style={{ fontSize: '0.58rem', fontFamily: "'Clash Display', sans-serif" }}
            >
              -{discount}%
            </span>
          </div>
        )}

        {/* Wishlist */}
        <button
          className="absolute top-3 right-3 z-10 transition-all hover:scale-110"
          style={{
            width: 32,
            height: 32,
            borderRadius: 9,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255,255,255,0.05)',
            border: `1px solid ${liked ? 'rgba(239,68,68,0.45)' : 'var(--border-ghost)'}`,
            cursor: 'pointer',
            transition: 'all 0.25s',
          }}
          onClick={e => { e.stopPropagation(); setLiked(!liked); }}
        >
          <svg
            width="13" height="13"
            fill={liked ? '#ef4444' : 'none'}
            stroke={liked ? '#ef4444' : 'rgba(180,180,200,0.5)'}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>

        {/* Hover glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(232,244,255,0.06) 0%, transparent 70%)',
          }}
        />

        {/* Product image */}
        <Image
          src={product.image[0]}
          alt={product.name}
          className="relative z-10 object-contain transition-transform duration-500 group-hover:scale-108"
          style={{
            width: '75%',
            height: '75%',
            filter: 'drop-shadow(0 10px 28px rgba(0,0,0,0.6))',
          }}
          width={300}
          height={300}
        />

        {/* Add to cart — slides up on hover */}
        <div
          className="absolute bottom-0 inset-x-0 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
        >
          <button
            onClick={handleAdd}
            className="w-full py-3 flex items-center justify-center gap-2 transition-all"
            style={{
              background: 'linear-gradient(135deg, rgba(232,244,255,0.12) 0%, rgba(200,214,229,0.08) 100%)',
              backdropFilter: 'blur(12px)',
              borderTop: '1px solid var(--border-ice)',
              color: 'var(--ice)',
              fontFamily: "'Clash Display', sans-serif",
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              border: 'none',
              borderTop: '1px solid var(--border-ice)',
            }}
          >
            {adding ? (
              <>
                <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Adding…
              </>
            ) : (
              <>
                <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Add to Cart
              </>
            )}
          </button>
        </div>
      </div>

      {/* ── Info ── */}
      <div className="p-4 flex flex-col gap-2 relative z-10 flex-1">
        {/* Category badge */}
        <span
          className="badge badge-chrome w-fit"
          style={{ fontFamily: "'Clash Display', sans-serif" }}
        >
          {product.category}
        </span>

        {/* Name */}
        <p
          className="line-clamp-1"
          style={{
            fontFamily: "'Satoshi', sans-serif",
            fontSize: '0.9rem',
            fontWeight: 500,
            color: 'var(--text-primary)',
            lineHeight: 1.4,
          }}
        >
          {product.name}
        </p>

        {/* Stars */}
        <div className="flex items-center gap-1.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              width="11" height="11"
              fill={i < 4 ? '#e8c84a' : 'none'}
              stroke="#e8c84a"
              viewBox="0 0 24 24"
              style={{ filter: i < 4 ? 'drop-shadow(0 0 3px rgba(232,200,74,0.5))' : 'none' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          ))}
          <span
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              marginLeft: 2,
            }}
          >
            4.5
          </span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-auto pt-1">
          <span
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontWeight: 700,
              fontSize: '1rem',
              color: 'var(--text-bright)',
              letterSpacing: '-0.01em',
            }}
          >
            {currency}{product.offerPrice}
          </span>
          {product.price !== product.offerPrice && (
            <span
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: '0.78rem',
                color: 'var(--text-muted)',
                textDecoration: 'line-through',
              }}
            >
              {currency}{product.price}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}