'use client'

import React, { useState } from 'react'
import { assets } from "@/assets/assets"
import Image from "next/image"
import Footer from "@/components/Footer"
import { useAppContext } from "@/context/AppContext"
import axios from "axios"
import toast from "react-hot-toast"

export default function AddProduct() {

  const { getToken, router } = useAppContext()

  const [files, setFiles] = useState([])
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('Earphone')
  const [price, setPrice] = useState('')
  const [offerPrice, setOfferPrice] = useState('')
  const [saving, setSaving] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (files.filter(Boolean).length === 0) {
      return toast.error('Please upload at least one image')
    }

    try {
      setSaving(true)

      const token = await getToken()

      const formData = new FormData()
      formData.append('name', name)
      formData.append('description', description)
      formData.append('category', category)
      formData.append('price', price)
      formData.append('offerPrice', offerPrice)

      files.filter(Boolean).forEach(file => {
        formData.append('images', file)
      })

      const { data } = await axios.post('/api/product/add', formData, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (data.success) {
        toast.success('Product published!')

        setName('')
        setDescription('')
        setPrice('')
        setOfferPrice('')
        setFiles([])

        router.push('/seller/product-list')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    } finally {
      setSaving(false)
    }
  }

  const labelStyle = {
    fontSize: '0.65rem',
    fontWeight: 700,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: 'var(--text-muted)',
    marginBottom: 8,
    display: 'block',
  }

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">

      <div style={{ padding: '2.5rem 2rem', maxWidth: 680 }}>

        <h1>Add Product</h1>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

          <div>
            <label style={labelStyle}>Product Images</label>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>

              {[...Array(4)].map((_, i) => (
                <label key={i} htmlFor={`image${i}`}>

                  <input
                    type="file"
                    hidden
                    id={`image${i}`}
                    onChange={(e) => {
                      const f = [...files]
                      f[i] = e.target.files[0]
                      setFiles(f)
                    }}
                  />

                  {files[i] ? (
                    <img
                      src={URL.createObjectURL(files[i])}
                      width={96}
                      height={96}
                      alt=""
                    />
                  ) : (
                    <Image src={assets.upload_area} width={30} height={30} alt="" />
                  )}

                </label>
              ))}

            </div>
          </div>

          <input value={name} onChange={e => setName(e.target.value)} placeholder="Product Name" />
          <textarea value={description} onChange={e => setDescription(e.target.value)} />

          <select value={category} onChange={e => setCategory(e.target.value)}>
            {['Earphone','Headphone','Watch','Smartphone','Laptop','Camera','Accessories'].map(c => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" />
          <input value={offerPrice} onChange={e => setOfferPrice(e.target.value)} placeholder="Offer Price" />

          <button disabled={saving}>
            {saving ? 'Publishing...' : 'Publish Product'}
          </button>

        </form>
      </div>

      <Footer />
    </div>
  )
}