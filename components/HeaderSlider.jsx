"use client"
import React, { useState, useEffect } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const slides = [
  {
    id: 1,
    eyebrow: "Limited Time — 30% Off",
    title: "Experience\nPure Sound",
    subtitle: "Headphones engineered for those who refuse to compromise on audio.",
    cta: "Shop Now",
    ctaSecondary: "Explore",
    img: assets.header_headphone_image,
    tag: "Audio",
  },
  {
    id: 2,
    eyebrow: "Only a Few Left",
    title: "Next-Level\nGaming",
    subtitle: "PlayStation 5 — every frame, every moment, legendary.",
    cta: "Buy Now",
    ctaSecondary: "View Deals",
    img: assets.header_playstation_image,
    tag: "Gaming",
  },
  {
    id: 3,
    eyebrow: "Exclusive — 40% Off",
    title: "Power Meets\nElegance",
    subtitle: "MacBook Pro — built for those who create without limits.",
    cta: "Order Now",
    ctaSecondary: "Learn More",
    img: assets.header_macbook_image,
    tag: "Laptops",
  },
];

export default function HeaderSlider() {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const t = setInterval(() => go((current + 1) % slides.length), 4800);
    return () => clearInterval(t);
  }, [current]);

  const go = (next) => {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => { setCurrent(next); setTransitioning(false); }, 320);
  };

  const s = slides[current];

  return (
    <div
      className="relative mt-4 overflow-hidden"
      style={{ minHeight: 480, borderRadius: 20 }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: `
            radial-gradient(ellipse 55% 70% at 75% 50%, rgba(232,244,255,0.05) 0%, transparent 65%),
            radial-gradient(ellipse 35% 50% at 15% 80%, rgba(200,214,229,0.04) 0%, transparent 60%),
            linear-gradient(145deg, #0d0d0d 0%, #111111 50%, #0a0a0a 100%)
          `,
        }}
      />

      {/* Grid */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      {/* Top glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-px transition-all duration-700"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(232,244,255,0.6), rgba(200,214,229,0.4), transparent)',
          boxShadow: '0 0 12px rgba(232,244,255,0.3)',
        }}
      />

      {/* Border */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ border: '1px solid var(--border-soft)', borderRadius: 20 }}
      />

      {/* Content */}
      <div
        className="relative flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-14 gap-8 h-full"
        style={{
          opacity: transitioning ? 0 : 1,
          transition: 'opacity 0.32s ease',
        }}
      >
        {/* ── Left: Text ── */}
        <div className="flex flex-col gap-5 md:max-w-[52%] z-10">

          {/* Tag + eyebrow */}
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className="badge badge-silver"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              {s.tag}
            </span>
            <span
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: '0.78rem',
                fontWeight: 500,
                color: 'var(--silver-300)',
                letterSpacing: '0.04em',
              }}
            >
              {s.eyebrow}
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(2.4rem, 5vw, 4rem)',
              color: 'var(--text-bright)',
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              whiteSpace: 'pre-line',
              textShadow: '0 0 80px rgba(232,244,255,0.15)',
            }}
          >
            {s.title}
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "'Satoshi', sans-serif",
              fontSize: '1rem',
              fontWeight: 300,
              color: 'var(--text-secondary)',
              lineHeight: 1.75,
              maxWidth: 360,
            }}
          >
            {s.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex items-center gap-4 mt-1">
            <button className="btn-primary btn-lg">
              <span>{s.cta}</span>
            </button>
            <button
              className="group flex items-center gap-2 transition-all"
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'var(--text-muted)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--text-secondary)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              {s.ctaSecondary}
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>

          {/* Dots + counter */}
          <div className="flex items-center gap-2 mt-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                style={{
                  width: i === current ? 28 : 6,
                  height: 6,
                  borderRadius: 3,
                  background: i === current
                    ? 'linear-gradient(90deg, #e8f4ff, #b8cfe8)'
                    : 'rgba(255,255,255,0.12)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.4s ease',
                  boxShadow: i === current ? '0 0 10px rgba(232,244,255,0.5)' : 'none',
                  padding: 0,
                }}
              />
            ))}
            <span
              style={{
                marginLeft: 'auto',
                fontFamily: "'Clash Display', monospace",
                fontSize: '0.7rem',
                color: 'var(--text-ghost)',
                letterSpacing: '0.06em',
              }}
            >
              {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* ── Right: Product visual ── */}
        <div className="relative flex items-center justify-center flex-1 z-10" style={{ minHeight: 280 }}>
          {/* Glow orb behind product */}
          <div
            className="absolute rounded-full transition-all duration-1000"
            style={{
              width: 300,
              height: 300,
              background: 'radial-gradient(circle, rgba(232,244,255,0.10) 0%, rgba(200,214,229,0.05) 40%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />

          {/* Outer spinning ring */}
          <div
            className="absolute rounded-full anim-rotate"
            style={{
              width: 260,
              height: 260,
              border: '1px solid rgba(232,244,255,0.08)',
            }}
          />

          {/* Inner spinning ring reverse */}
          <div
            className="absolute rounded-full"
            style={{
              width: 190,
              height: 190,
              border: '1px dashed rgba(200,214,229,0.10)',
              animation: 'rotateSlow 10s linear infinite reverse',
            }}
          />

          {/* Product image */}
          <Image
            src={s.img}
            alt={s.title}
            className="relative anim-float object-contain z-10"
            style={{
              width: 'clamp(180px, 22vw, 290px)',
              filter: 'drop-shadow(0 24px 60px rgba(232,244,255,0.18)) drop-shadow(0 8px 20px rgba(0,0,0,0.7))',
            }}
          />

          {/* Floating spec chips */}
          <div
            className="absolute top-[12%] right-[8%] anim-float"
            style={{
              animationDelay: '0.5s',
              background: 'rgba(14,14,14,0.88)',
              backdropFilter: 'blur(16px)',
              border: '1px solid var(--border-soft)',
              borderRadius: 10,
              padding: '7px 12px',
              fontSize: '0.68rem',
              fontFamily: "'Satoshi', sans-serif",
              fontWeight: 500,
              color: 'var(--silver-300)',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
            }}
          >
            <span style={{ color: 'var(--ice)', marginRight: 6 }}>✦</span>
            Premium Quality
          </div>

          <div
            className="absolute bottom-[18%] left-[4%] anim-float"
            style={{
              animationDelay: '1.2s',
              background: 'rgba(14,14,14,0.88)',
              backdropFilter: 'blur(16px)',
              border: '1px solid var(--border-soft)',
              borderRadius: 10,
              padding: '7px 12px',
              fontSize: '0.68rem',
              fontFamily: "'Satoshi', sans-serif",
              fontWeight: 500,
              color: 'var(--silver-300)',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
            }}
          >
            <span
              style={{
                display: 'inline-block',
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--success)',
                marginRight: 6,
                boxShadow: '0 0 6px var(--success)',
                verticalAlign: 'middle',
              }}
            />
            In Stock
          </div>
        </div>
      </div>
    </div>
  );
}