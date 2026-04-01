'use client'
import React, { useEffect, useState } from 'react'
import { useAppContext } from '@/context/AppContext'
import Footer from '@/components/seller/Footer'
import Loading from '@/components/Loading'
import axios from 'axios'
import toast from 'react-hot-toast'

const statusOptions = ['Order Placed', 'Shipped', 'Delivered', 'Cancelled'];

const statusStyle = {
  'Order Placed': { bg: 'rgba(139,92,246,0.12)', border: 'rgba(139,92,246,0.4)', color: '#a78bfa' },
  'Shipped': { bg: 'rgba(6,182,212,0.12)', border: 'rgba(6,182,212,0.4)', color: '#22d3ee' },
  'Delivered': { bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.4)', color: '#34d399' },
  'Cancelled': { bg: 'rgba(244,63,94,0.12)', border: 'rgba(244,63,94,0.4)', color: '#fb7185' },
}

export default function Orders() {
  const { currency, getToken } = useAppContext()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchOrders = async () => {
    try {
      const token = await getToken()
      const { data } = await axios.get('/api/order/seller', {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (data.success) setOrders(data.orders)
      else toast.error(data.message)

    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  }, [])

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      {loading ? <Loading /> : (
        <div className="p-6 md:p-10">

          <div className="mb-8">
            <p className="eyebrow mb-2">{orders.length} total</p>
            <h1 className="font-display font-600" style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', color: 'var(--text-bright)' }}>
              Manage <span className="grad-text-violet">Orders</span>
            </h1>
          </div>

          <div className="space-y-4 max-w-4xl">

            {orders.map((order) => {
              const sc = statusStyle[order.status] || statusStyle['Order Placed']

              return (
                <div
                  key={order._id}   // ✅ FIXED KEY
                  className="rounded-2xl p-5 transition-all"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-dim)' }}
                >

                  <div className="flex flex-col md:flex-row gap-5 justify-between">

                    {/* ITEMS */}
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                        style={{ background: 'var(--bg-elevated)' }}>
                        <svg className="w-5 h-5" style={{ color: 'var(--violet-light)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      </div>

                      <div>
                        <p className="text-sm font-medium">
                          {order.items.map((item, idx) => (
                            <span key={item._id || idx}>
                              {item.product.name} × {item.quantity}
                              {idx !== order.items.length - 1 ? ', ' : ''}
                            </span>
                          ))}
                        </p>

                        <p className="text-xs mt-1">
                          {order.items.length} item{order.items.length > 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>

                    {/* ADDRESS */}
                    <div className="text-sm min-w-[140px]">
                      <p className="font-medium">{order.address.fullName}</p>
                      <p className="text-xs">{order.address.area}</p>
                      <p className="text-xs">{order.address.city}, {order.address.state}</p>
                      <p className="text-xs">{order.address.phoneNumber}</p>
                    </div>

                    {/* AMOUNT */}
                    <div className="min-w-[80px]">
                      <p className="eyebrow mb-1">Amount</p>
                      <p className="font-ui font-600">
                        {currency}{order.amount}
                      </p>
                    </div>

                    {/* STATUS */}
                    <div className="flex flex-col gap-2 min-w-[130px]">
                      <p className="text-xs">
                        COD · {new Date(order.date).toLocaleDateString()}
                      </p>

                      <select
                        defaultValue={order.status}
                        className="text-xs px-3 py-1.5 rounded-lg border"
                        style={{
                          background: sc.bg,
                          borderColor: sc.border,
                          color: sc.color,
                          appearance: 'none'
                        }}
                      >
                        {statusOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>

                    </div>
                  </div>
                </div>
              )
            })}

            {orders.length === 0 && (
              <p className="text-sm">No orders yet.</p>
            )}

          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}