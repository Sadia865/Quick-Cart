"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrderSummary from "@/components/OrderSummary";
import { useAppContext } from "@/context/AppContext";

export default function Cart() {
  const {
    products,
    router,
    cartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
    currency,
  } = useAppContext();

  // SAFE CART BUILD
  const cartProducts = useMemo(() => {
    if (!products || !cartItems) return [];

    return Object.keys(cartItems)
      .map((itemId) => {
        const product = products.find((p) => p._id === itemId);
        return {
          product,
          quantity: cartItems[itemId],
        };
      })
      .filter(({ product, quantity }) => product && quantity > 0);
  }, [products, cartItems]);

  return (
    <>
      <Navbar />

      <div className="px-6 md:px-16 lg:px-32 pt-10 pb-24">

        {/* HEADER */}
        <div className="mb-10">
          <p className="eyebrow mb-2 text-[var(--text-muted)]">
            {getCartCount()} items
          </p>

          <h1
            className="font-display font-600"
            style={{
              fontSize: "clamp(1.8rem,3.5vw,2.8rem)",
              color: "var(--text-bright)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Your <span className="grad-text-violet">Cart</span>
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-10">

          {/* LEFT SIDE */}
          <div className="flex-1">

            {/* EMPTY CART */}
            {cartProducts.length === 0 ? (
              <div
                className="flex flex-col items-center justify-center py-28 gap-5 rounded-3xl transition-all"
                style={{
                  background:
                    "linear-gradient(180deg, var(--bg-card), rgba(255,255,255,0.02))",
                  border: "1px solid var(--border-dim)",
                  backdropFilter: "blur(10px)",
                }}
              >
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border-dim)",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                  }}
                >
                  <svg
                    className="w-10 h-10"
                    style={{ color: "var(--text-muted)" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>

                <div className="text-center space-y-1">
                  <p
                    className="font-display text-xl"
                    style={{ color: "var(--text-primary)" }}
                  >
                    Your cart is empty
                  </p>

                  <p
                    className="text-sm"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Add products to start building your order
                  </p>
                </div>

                <button
                  onClick={() => router.push("/all-products")}
                  className="px-8 py-3 rounded-full text-sm font-ui transition-all hover:scale-[1.02]"
                  style={{
                    background:
                      "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                    color: "#fff",
                    boxShadow: "0 10px 30px rgba(139,92,246,0.35)",
                  }}
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              <div
                className="rounded-3xl overflow-hidden"
                style={{
                  border: "1px solid var(--border-dim)",
                  background: "var(--bg-card)",
                  backdropFilter: "blur(12px)",
                }}
              >

                {/* HEADER ROW */}
                <div
                  className="grid grid-cols-12 gap-4 px-6 py-4 text-[11px] uppercase tracking-widest"
                  style={{
                    background: "var(--bg-elevated)",
                    color: "var(--text-muted)",
                  }}
                >
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 hidden md:block">Price</div>
                  <div className="col-span-2">Qty</div>
                  <div className="col-span-2 text-right hidden md:block">
                    Subtotal
                  </div>
                </div>

                {/* ITEMS */}
                {cartProducts.map(({ product, quantity }, index) => {
                  const subtotal =
                    (product.offerPrice || 0) * quantity;

                  return (
                    <div
                      key={product._id}
                      className="grid grid-cols-12 gap-4 items-center px-6 py-5 transition-all hover:bg-white/5"
                      style={{
                        borderBottom:
                          index < cartProducts.length - 1
                            ? "1px solid var(--border-ghost)"
                            : "none",
                      }}
                    >

                      {/* PRODUCT */}
                      <div className="col-span-6 flex items-center gap-4">
                        <div
                          onClick={() =>
                            router.push("/product/" + product._id)
                          }
                          className="w-16 h-16 rounded-2xl flex items-center justify-center cursor-pointer transition-transform hover:scale-[1.03]"
                          style={{
                            background: "var(--bg-elevated)",
                            border: "1px solid var(--border-dim)",
                          }}
                        >
                          <Image
                            src={product.image?.[0]}
                            alt={product.name}
                            width={100}
                            height={100}
                            className="w-12 h-12 object-contain"
                          />
                        </div>

                        <div className="min-w-0">
                          <p
                            onClick={() =>
                              router.push("/product/" + product._id)
                            }
                            className="text-sm font-medium truncate cursor-pointer hover:text-[var(--violet-light)] transition"
                            style={{ color: "var(--text-primary)" }}
                          >
                            {product.name}
                          </p>

                          <span className="text-[10px] px-2 py-0.5 rounded-md inline-block mt-1 bg-white/5 text-[var(--text-muted)]">
                            {product.category}
                          </span>

                          <button
                            className="block text-xs mt-1 hover:opacity-80"
                            style={{ color: "var(--rose)" }}
                            onClick={() =>
                              updateCartQuantity(product._id, 0)
                            }
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* PRICE */}
                      <div className="col-span-2 hidden md:block">
                        <p style={{ color: "var(--text-secondary)" }}>
                          {currency}
                          {product.offerPrice}
                        </p>
                      </div>

                      {/* QTY */}
                      <div className="col-span-2">
                        <div className="flex items-center gap-2">

                          <button
                            onClick={() =>
                              updateCartQuantity(
                                product._id,
                                Math.max(quantity - 1, 0)
                              )
                            }
                            className="w-8 h-8 rounded-lg border border-[var(--border-dim)] hover:bg-white/5 transition"
                          >
                            −
                          </button>

                          <span className="w-8 text-center text-sm">
                            {quantity}
                          </span>

                          <button
                            onClick={() =>
                              addToCart(product._id)
                            }
                            className="w-8 h-8 rounded-lg border border-[var(--border-dim)] hover:bg-white/5 transition"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* SUBTOTAL */}
                      <div className="col-span-2 text-right hidden md:block">
                        <p style={{ color: "var(--text-primary)" }}>
                          {currency}
                          {subtotal.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* CONTINUE */}
            <button
              onClick={() => router.push("/all-products")}
              className="mt-6 text-sm flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition"
            >
              ← Continue Shopping
            </button>
          </div>

          {/* RIGHT SIDE */}
          <div className="md:w-[360px]">
            <OrderSummary />
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}