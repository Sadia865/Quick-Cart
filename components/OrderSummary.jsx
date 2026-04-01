'use client';

import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function OrderSummary() {
  const {
    currency,
    router,
    getCartCount,
    getCartAmount,
    getToken,
    cartItems,
    setCartItems,
    user
  } = useAppContext();

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [promo, setPromo] = useState('');
  const [placing, setPlacing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('stripe');

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const fetchAddresses = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get('/api/address/get', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.success) setAddresses(data.addresses);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) fetchAddresses();
  }, [user]);

  const handlePlaceOrder = async () => {
    if (!user) return toast.error('Please sign in first');
    if (!selectedAddress) return toast.error('Please select a shipping address');
    if (getCartCount() === 0) return toast.error('Your cart is empty');

    paymentMethod === 'stripe'
      ? await handleStripePayment()
      : await handleCODOrder();
  };

  const handleStripePayment = async () => {
    try {
      setPlacing(true);
      const token = await getToken();

      const items = Object.entries(cartItems).map(([productId, quantity]) => ({
        productId,
        quantity,
      }));

      const { data } = await axios.post(
        '/api/order/stripe',
        { address: selectedAddress, items },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        window.location.href = data.url;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setPlacing(false);
    }
  };

  const handleCODOrder = async () => {
    try {
      setPlacing(true);
      const token = await getToken();

      const items = Object.entries(cartItems).map(([productId, quantity]) => ({
        productId,
        quantity,
      }));

      const { data } = await axios.post(
        '/api/order/create',
        { address: selectedAddress, items },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success('Order placed successfully!');
        setCartItems({});
        router.push('/my-orders');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setPlacing(false);
    }
  };

  const subtotal = getCartAmount();
  const tax = Math.floor(subtotal * 0.02);
  const total = subtotal + tax;

  const labelStyle = {
    fontFamily: "'Clash Display', sans-serif",
    fontSize: '0.65rem',
    fontWeight: 700,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: 'var(--text-muted)',
    marginBottom: 8,
    display: 'block',
  };

  const IconCard = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M2 7.5C2 6.12 3.12 5 4.5 5h15C20.88 5 22 6.12 22 7.5v9C22 17.88 20.88 19 19.5 19h-15C3.12 19 2 17.88 2 16.5v-9z" opacity="0.9"/>
      <path d="M2 9h20v3H2z" opacity="0.5"/>
    </svg>
  );

  const IconCash = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 7h18v10H3V7z" opacity="0.9"/>
      <path d="M12 9a3 3 0 100 6 3 3 0 000-6z" />
    </svg>
  );

  const IconChevron = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 10l5 5 5-5z" />
    </svg>
  );

  const IconLoader = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="10" opacity="0.2"/>
      <path d="M12 2a10 10 0 0110 10h-3a7 7 0 00-7-7V2z"/>
    </svg>
  );

  const IconPay = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 6h18v12H3V6z" opacity="0.9"/>
      <path d="M7 14h10v2H7z"/>
    </svg>
  );

  const paymentMethods = [
    { id: 'stripe', label: 'Card / Online', icon: <IconCard /> },
    { id: 'cod', label: 'Cash on Delivery', icon: <IconCash /> },
  ];

  return (
    <div className="w-full md:w-96 flex-shrink-0">
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-soft)',
        borderRadius: 20,
        padding: '1.5rem',
        position: 'relative',
      }}>

        <h2 style={{
          fontFamily: "'Clash Display', sans-serif",
          fontSize: '0.72rem',
          fontWeight: 700,
          letterSpacing: '0.18em',
          marginBottom: 24,
          color: 'var(--text-primary)',
        }}>
          ORDER SUMMARY
        </h2>

        {/* ADDRESS */}
        <div>
          <label style={labelStyle}>Shipping Address</label>

          <div ref={dropdownRef} style={{ position: 'relative' }}>
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: 12,
                border: `1px solid ${dropdownOpen ? 'var(--violet)' : 'var(--border-dim)'}`,
                background: 'var(--bg-elevated)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>
                {selectedAddress
                  ? `${selectedAddress.fullName}, ${selectedAddress.city}`
                  : 'Select address'}
              </span>

              <span style={{ color: 'var(--text-muted)' }}>
                <IconChevron />
              </span>
            </button>

            {dropdownOpen && (
              <div style={{
                position: 'absolute',
                width: '100%',
                marginTop: 6,
                background: 'var(--bg-elevated)',
                border: '1px solid var(--border-dim)',
                borderRadius: 12,
                zIndex: 50,
              }}>
                {addresses.map((a) => (
                  <button
                    key={a._id || a.id}
                    onClick={() => {
                      setSelectedAddress(a);
                      setDropdownOpen(false);
                    }}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '10px 14px',
                      background: 'transparent',
                      border: 'none',
                    }}
                  >
                    {a.fullName} - {a.city}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() => router.push('/add-address')}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    textAlign: 'left',
                    borderTop: '1px solid var(--border-dim)',
                    color: 'var(--violet)',
                    background: 'transparent',
                    fontWeight: 500,
                  }}
                >
                  + Add new address
                </button>
              </div>
            )}
          </div>
        </div>

        {/* PAYMENT */}
        <div className="mt-5">
          <label style={labelStyle}>Payment Method</label>

          <div className="grid grid-cols-2 gap-2">
            {paymentMethods.map((m) => (
              <button
                key={m.id}
                onClick={() => setPaymentMethod(m.id)}
                style={{
                  padding: 12,
                  borderRadius: 12,
                  border: `1px solid ${paymentMethod === m.id ? 'var(--violet)' : 'var(--border-dim)'}`,
                  background: paymentMethod === m.id ? 'rgba(139,92,246,0.12)' : 'var(--bg-elevated)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                {m.icon}
                <span style={{ fontSize: '0.75rem' }}>{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={handlePlaceOrder}
          disabled={placing}
          style={{
            width: '100%',
            marginTop: 24,
            padding: '14px',
            borderRadius: 12,
            border: 'none',
            background: placing ? 'rgba(139,92,246,0.5)' : 'linear-gradient(135deg,#8b5cf6,#06b6d4)',
            color: '#fff',
            fontWeight: 600,
          }}
        >
          <span style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
            {placing ? <IconLoader /> : <IconPay />}
            {placing ? 'Processing...' : paymentMethod === 'stripe' ? 'Pay with Stripe' : 'Place COD Order'}
          </span>
        </button>

      </div>
    </div>
  );
}