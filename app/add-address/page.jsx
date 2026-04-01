'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useState } from 'react'
import { useAppContext } from '@/context/AppContext'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function AddAddress() {
  const { router, getToken } = useAppContext()
  const [saving, setSaving] = useState(false)

  const [address, setAddress] = useState({
    fullName: '',
    phoneNumber: '',
    pincode: '',
    area: '',
    city: '',
    state: '',
  })

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    })
  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    try {
      setSaving(true)

      const token = await getToken()

      const { data } = await axios.post(
        '/api/address/add',
        address,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      if (data.success) {
        toast.success('Address saved successfully!')
        router.push('/cart')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message || 'Something went wrong')
    } finally {
      setSaving(false)
    }
  }

  const Field = ({ label, name, placeholder, type = 'text' }) => (
    <div>
      <label className="eyebrow block mb-2">{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={address[name]}
        onChange={handleChange}
        className="input-field w-full px-4 py-3 rounded-xl text-sm"
        required
      />
    </div>
  )

  return (
    <>
      <Navbar />

      <div className="px-6 md:px-16 lg:px-32 py-12">
        <div className="mb-10">
          <p className="eyebrow mb-2">Shipping</p>

          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(1.8rem,3.5vw,2.8rem)',
              color: 'var(--text-bright)',
            }}
          >
            Add Shipping{' '}
            <span className="grad-text">
              Address
            </span>
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-16 items-start">
          {/* FORM */}
          <form onSubmit={onSubmitHandler} className="w-full max-w-md space-y-4">

            <Field label="Full Name" name="fullName" placeholder="John Doe" />
            <Field label="Phone Number" name="phoneNumber" placeholder="+1 234 567 890" />

            <div className="grid grid-cols-2 gap-4">
              <Field label="Pin Code" name="pincode" placeholder="654321" />
              <Field label="City" name="city" placeholder="New York" />
            </div>

            <div>
              <label className="eyebrow block mb-2">Area & Street</label>
              <textarea
                name="area"
                rows={3}
                placeholder="Main Road, 123 Street, G Block"
                value={address.area}
                onChange={handleChange}
                className="input-field w-full px-4 py-3 rounded-xl text-sm resize-none"
                required
              />
            </div>

            <Field label="State" name="state" placeholder="California" />

            {/* BUTTON */}
            <button
              type="submit"
              disabled={saving}
              className={`btn-primary w-full ${saving ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              <span>{saving ? 'Saving...' : 'Save Address'}</span>
            </button>
          </form>

          {/* RIGHT SIDE DECOR (optional premium feel) */}
          <div className="hidden md:block flex-1 glass-card p-10 rounded-2xl">
            <h2 className="font-display text-xl text-ice mb-4">
              Delivery Info
            </h2>
            <p className="text-muted text-sm leading-6">
              Your shipping address is securely stored and used only for order delivery.
              Make sure all details are correct before saving.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}