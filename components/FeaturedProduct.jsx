
"use client"
import Image from "next/image";
import { assets } from "@/assets/assets";
 
const items = [
  {
    id: 1,
    image: assets.girl_with_headphone_image,
    tag: "Audio",
    title: "Unparalleled Sound",
    desc: "Crystal-clear audio for audiophiles who demand the extraordinary.",
  },
  {
    id: 2,
    image: assets.girl_with_earphone_image,
    tag: "Earphones",
    title: "Stay Connected",
    desc: "Compact, stylish earphones for every occasion and adventure.",
  },
  {
    id: 3,
    image: assets.boy_with_laptop_image,
    tag: "Laptops",
    title: "Power in Every Pixel",
    desc: "The latest laptops for work, gaming, and creative excellence.",
  },
];
 
export default function FeaturedProduct() {
    return (
    <section style={{ padding: '5rem 0' }}>
      <div className="text-center mb-14">
        <p className="eyebrow eyebrow-ice mb-3 justify-center">Handpicked for You</p>
        <h2
          style={{
            fontFamily: "'Clash Display', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
            color: 'var(--text-bright)',
            letterSpacing: '-0.03em',
          }}
        >
          Featured <span className="grad-text">Experiences</span>
        </h2>
      </div>
 
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map(({ id, image, tag, title, desc }) => (
          <div
            key={id}
            className="group relative overflow-hidden cursor-pointer"
            style={{ minHeight: 420, borderRadius: 16 }}
          >
            {/* BG image */}
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
              style={{ transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)' }}
            />
 
            {/* Dark overlay */}
            <div
              className="absolute inset-0 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.1) 100%)',
              }}
            />
 
            {/* Chrome sheen on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(135deg, rgba(232,244,255,0.04) 0%, transparent 60%)',
              }}
            />
 
            {/* Top border glow on hover */}
            <div
              className="absolute top-0 inset-x-0 h-px opacity-0 group-hover:opacity-100 transition-all duration-500"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(232,244,255,0.6), transparent)',
                boxShadow: '0 0 8px rgba(232,244,255,0.3)',
              }}
            />
 
            {/* Border */}
            <div
              className="absolute inset-0 pointer-events-none transition-all duration-400"
              style={{
                border: '1px solid var(--border-ghost)',
                borderRadius: 16,
              }}
            />
 
            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-7 z-10">
              <span
                className="badge badge-silver w-fit mb-3"
                style={{ fontFamily: "'Clash Display', sans-serif" }}
              >
                {tag}
              </span>
 
              <h3
                className="transition-transform duration-400 group-hover:-translate-y-1"
                style={{
                  fontFamily: "'Clash Display', sans-serif",
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  color: 'var(--text-bright)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.2,
                  marginBottom: 8,
                }}
              >
                {title}
              </h3>
 
              <p
                className="transition-all duration-400 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0"
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontSize: '0.875rem',
                  fontWeight: 300,
                  color: 'rgba(255,255,255,0.65)',
                  lineHeight: 1.65,
                  maxWidth: 260,
                  marginBottom: 20,
                }}
              >
                {desc}
              </p>
 
              <button
                className="btn-secondary btn-sm w-fit group-hover:border-[var(--border-ice)] group-hover:text-[var(--ice)]"
                style={{ borderRadius: 99 }}
              >
                Shop Now
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ marginLeft: 6 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
