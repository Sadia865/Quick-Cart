// ═══════════════════════════════════════════════════
// Banner.jsx
// ═══════════════════════════════════════════════════
"use client"
import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
 
export default function Banner() {
  return (
    <section style={{ padding: '2rem 0 4rem' }}>
      <div
        className="relative overflow-hidden"
        style={{
          background: 'linear-gradient(145deg, #0d0d0d 0%, #111111 50%, #0a0a0a 100%)',
          border: '1px solid var(--border-soft)',
          borderTopColor: 'var(--border-ice)',
          borderRadius: 20,
        }}
      >
        {/* Grid */}
        <div className="absolute inset-0 grid-pattern opacity-40" />
 
        {/* Top glow line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(232,244,255,0.6), rgba(200,214,229,0.3), transparent)',
            boxShadow: '0 0 16px rgba(232,244,255,0.2)',
          }}
        />
 
        {/* Ambient orbs */}
        <div
          className="absolute -top-24 left-1/3 w-72 h-72 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(232,244,255,0.06) 0%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />
        <div
          className="absolute -bottom-16 right-1/4 w-56 h-56 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(200,214,229,0.05) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
 
        <div className="relative flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-14 gap-10">
 
          {/* Left product */}
          <div className="hidden md:flex items-center justify-center flex-shrink-0">
            <Image
              src={assets.jbl_soundbox_image}
              alt="JBL"
              className="anim-float object-contain"
              style={{
                width: 160,
                filter: 'drop-shadow(0 16px 40px rgba(232,244,255,0.18)) drop-shadow(0 4px 12px rgba(0,0,0,0.7))',
              }}
            />
          </div>
 
          {/* Center text */}
          <div className="flex flex-col items-center text-center gap-4 max-w-sm">
            <span
              className="badge badge-ice"
              style={{ fontFamily: "'Clash Display', sans-serif" }}
            >
              Special Offer
            </span>
 
            <h2
              style={{
                fontFamily: "'Clash Display', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
                color: 'var(--text-bright)',
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
              }}
            >
              Level Up Your{' '}
              <span className="grad-text">Gaming Experience</span>
            </h2>
 
            <p
              style={{
                fontFamily: "'Satoshi', sans-serif",
                fontSize: '0.92rem',
                fontWeight: 300,
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
              }}
            >
              From immersive sound to precise controls — everything you need to win.
            </p>
 
            <button className="btn-primary mt-2">
              <span className="flex items-center gap-2">
                Shop Now
                <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
          </div>
 
          {/* Right product */}
          <div className="flex items-center justify-center flex-shrink-0">
            <Image
              src={assets.md_controller_image}
              alt="Controller"
              className="hidden md:block object-contain"
              style={{
                width: 220,
                filter: 'drop-shadow(0 16px 40px rgba(200,214,229,0.15)) drop-shadow(0 4px 12px rgba(0,0,0,0.7))',
              }}
            />
            <Image
              src={assets.sm_controller_image}
              alt="Controller"
              className="md:hidden object-contain"
              style={{ width: 160 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}