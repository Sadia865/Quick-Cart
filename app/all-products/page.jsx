'use client'

import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";

const categories = ["All", "Earphone", "Headphone", "Smartphone", "Laptop", "Camera", "Accessories"];

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Newest", value: "newest" },
];

export default function AllProducts() {
  const { products } = useAppContext();

  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");

  const filtered = useMemo(() => {
    if (!products) return [];

    let result = products.filter((p) => {
      const matchCat =
        activeCategory === "All" || p.category === activeCategory;

      const matchSearch =
        (p.name?.toLowerCase() || "").includes(search.toLowerCase());

      return matchCat && matchSearch;
    });

    switch (sort) {
      case "price_asc":
        return [...result].sort(
          (a, b) => (a.offerPrice || 0) - (b.offerPrice || 0)
        );

      case "price_desc":
        return [...result].sort(
          (a, b) => (b.offerPrice || 0) - (a.offerPrice || 0)
        );

      case "newest":
        return [...result].sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

      default:
        return result;
    }
  }, [products, activeCategory, search, sort]);

  return (
    <>
      <Navbar />

      <div className="px-6 md:px-16 lg:px-32 py-10 min-h-screen">

        {/* HEADER */}
        <div className="mb-10">
          <p className="eyebrow mb-2">{filtered.length} products</p>

          <h1
            className="font-display font-600"
            style={{
              fontSize: "clamp(1.8rem,3.5vw,2.8rem)",
              color: "var(--text-bright)",
              lineHeight: 1.15,
            }}
          >
            All <span className="grad-text">Products</span>
          </h1>
        </div>

        {/* CONTROLS */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">

          {/* SEARCH */}
          <div className="relative max-w-sm w-full">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
              style={{ color: "var(--text-muted)" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                background: "var(--bg-card)",
                border: "1px solid var(--border-dim)",
                borderRadius: "999px",
                padding: "10px 16px 10px 40px",
                fontSize: "0.875rem",
                color: "var(--text-primary)",
                outline: "none",
                fontFamily: "'Outfit', sans-serif",
              }}
            />
          </div>

          {/* SORT */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-dim)",
              borderRadius: "999px",
              padding: "10px 20px",
              fontSize: "0.875rem",
              color: "var(--text-secondary)",
              outline: "none",
              fontFamily: "'Space Grotesk', sans-serif",
              cursor: "pointer",
            }}
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>

        {/* CATEGORY FILTER */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-4 py-1.5 rounded-full text-xs font-ui tracking-wide transition-all"
              style={{
                background:
                  activeCategory === cat ? "var(--violet)" : "transparent",
                border: `1px solid ${
                  activeCategory === cat
                    ? "var(--violet)"
                    : "var(--border-dim)"
                }`,
                color:
                  activeCategory === cat
                    ? "#fff"
                    : "var(--text-muted)",
                boxShadow:
                  activeCategory === cat
                    ? "0 4px 16px rgba(139,92,246,0.35)"
                    : "none",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* PRODUCTS GRID */}
        {products?.length === 0 ? (
          <Loading />
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <p style={{ color: "var(--text-muted)" }}>
              No products found
            </p>

            <button
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
              style={{
                color: "var(--violet-light)",
                fontSize: "0.75rem",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map((product) => (
              <ProductCard
                key={product._id || product.id || product.name}
                product={product}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}