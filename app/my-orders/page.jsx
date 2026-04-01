'use client'

import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const statusStyle = {
  "Order Placed": {
    bg: 'rgba(139,92,246,0.12)',
    border: 'rgba(139,92,246,0.4)',
    color: '#a78bfa',
    dot: '#8b5cf6'
  },
  "Shipped": {
    bg: 'rgba(6,182,212,0.12)',
    border: 'rgba(6,182,212,0.4)',
    color: '#22d3ee',
    dot: '#06b6d4'
  },
  "Delivered": {
    bg: 'rgba(16,185,129,0.12)',
    border: 'rgba(16,185,129,0.4)',
    color: '#34d399',
    dot: '#10b981'
  },
  "Cancelled": {
    bg: 'rgba(244,63,94,0.12)',
    border: 'rgba(244,63,94,0.4)',
    color: '#fb7185',
    dot: '#f43f5e'
  },
};

export default function MyOrders() {
  const { currency, getToken, user, router } = useAppContext();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = await getToken();

      const { data } = await axios.get("/api/order/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setOrders(data.orders || []);
      } else {
        toast.error(data.message || "Failed to load orders");
      }
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchOrders();
    else setLoading(false);
  }, [user]);

  return (
    <>
      <Navbar />

      <div className="px-6 md:px-16 lg:px-32 py-10 min-h-screen">

        {/* HEADER */}
        <div className="mb-10">
          <p className="eyebrow mb-2">{orders.length} orders</p>

          <h1
            className="font-display font-600"
            style={{
              fontSize: "clamp(1.8rem,3.5vw,2.8rem)",
              color: "var(--text-bright)",
              lineHeight: 1.15,
            }}
          >
            My <span className="grad-text-violet">Orders</span>
          </h1>
        </div>

        {/* LOADING */}
        {loading ? (
          <Loading />
        ) : !user ? (
          /* NOT LOGGED IN */
          <div className="flex flex-col items-center justify-center py-32 gap-5">
            <p style={{ color: "var(--text-muted)" }}>
              Please sign in to view your orders
            </p>

            <button
              onClick={() => router.push("/")}
              className="px-8 py-2.5 rounded-full text-sm font-ui"
              style={{
                background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                color: "#fff",
              }}
            >
              Sign In
            </button>
          </div>
        ) : orders.length === 0 ? (
          /* EMPTY ORDERS */
          <div className="flex flex-col items-center justify-center py-32 gap-5">
            <p className="font-display text-xl" style={{ color: "var(--text-primary)" }}>
              No orders yet
            </p>

            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Start shopping to see your orders here
            </p>

            <button
              onClick={() => router.push("/all-products")}
              className="px-8 py-2.5 rounded-full text-sm font-ui"
              style={{
                background: "linear-gradient(135deg, #8b5cf6, #06b6d4)",
                color: "#fff",
              }}
            >
              Browse Products
            </button>
          </div>
        ) : (
          /* ORDERS LIST */
          <div className="space-y-4 max-w-5xl">

            {orders.map((order) => {
              const status = order?.status || "Order Placed";
              const sc = statusStyle[status] || statusStyle["Order Placed"];

              return (
                <div
                  key={order._id}
                  className="rounded-2xl p-6 transition-all"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-dim)",
                  }}
                >

                  {/* TOP */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-5">

                    {/* ORDER ID */}
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: "var(--bg-elevated)" }}
                      >
                        📦
                      </div>

                      <div>
                        <p className="eyebrow">Order ID</p>
                        <p className="text-sm font-mono" style={{ color: "var(--text-secondary)" }}>
                          #{order?._id?.slice(-8)?.toUpperCase()}
                        </p>
                      </div>
                    </div>

                    {/* STATUS */}
                    <span
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-ui"
                      style={{
                        background: sc.bg,
                        border: `1px solid ${sc.border}`,
                        color: sc.color,
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: sc.dot }}
                      />
                      {status}
                    </span>
                  </div>

                  {/* ITEMS */}
                  <p className="text-sm font-medium mb-1" style={{ color: "var(--text-primary)" }}>
                    {order?.items
                      ?.map(
                        (item) =>
                          `${item?.product?.name || "Product"} × ${item?.quantity || 0}`
                      )
                      .join(", ")}
                  </p>

                  <p className="text-xs mb-5" style={{ color: "var(--text-muted)" }}>
                    {order?.items?.length || 0} item(s)
                  </p>

                  {/* DETAILS */}
                  <div
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-5"
                    style={{ borderTop: "1px solid var(--border-ghost)" }}
                  >

                    {/* TOTAL */}
                    <div>
                      <p className="eyebrow mb-1">Total</p>
                      <p
                        className="font-ui font-600"
                        style={{
                          background:
                            "linear-gradient(135deg, var(--violet-light), var(--cyan-light))",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {currency}
                        {order?.amount || 0}
                      </p>
                    </div>

                    {/* DATE */}
                    <div>
                      <p className="eyebrow mb-1">Date</p>
                      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                        {order?.date
                          ? new Date(order.date).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>

                    {/* PAYMENT */}
                    <div>
                      <p className="eyebrow mb-1">Payment</p>
                      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                        COD
                      </p>
                    </div>

                    {/* ADDRESS */}
                    <div>
                      <p className="eyebrow mb-1">Ship To</p>
                      <p className="text-sm truncate" style={{ color: "var(--text-secondary)" }}>
                        {order?.address?.city || "City"},{" "}
                        {order?.address?.state || "State"}
                      </p>
                    </div>

                  </div>
                </div>
              );
            })}

          </div>
        )}
      </div>

      <Footer />
    </>
  );
}