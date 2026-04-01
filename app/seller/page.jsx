'use client'
import React, { useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import Footer from "@/components/seller/Footer";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const categories = ['Earphone', 'Headphone', 'Watch', 'Smartphone', 'Laptop', 'Camera', 'Accessories'];

export default function SellerAddProduct() {
  const { getToken, router } = useAppContext();
  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Earphone');
  const [price, setPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.filter(Boolean).length === 0) return toast.error('Please upload at least one image');
    try {
      setSaving(true);
      const token = await getToken();
      const formData = new FormData();
      formData.append('name', name);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('price', price);
      formData.append('offerPrice', offerPrice);
      files.filter(Boolean).forEach(file => formData.append('images', file));

      const { data } = await axios.post('/api/product/add', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (data.success) {
        toast.success('Product published!');
        setName(''); setDescription(''); setPrice(''); setOfferPrice(''); setFiles([]);
        router.push('/seller/product-list');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      <div className="p-6 md:p-10 max-w-2xl">
        <div className="mb-8">
          <p className="eyebrow mb-2">Seller Panel</p>
          <h1 className="font-display font-600" style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', color: 'var(--text-bright)' }}>
            Add <span className="grad-text-violet">Product</span>
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Images */}
          <div>
            <label className="eyebrow block mb-3">Product Images</label>
            <div className="flex flex-wrap gap-3">
              {[...Array(4)].map((_, i) => (
                <label
                  key={i}
                  htmlFor={`image${i}`}
                  className="relative w-24 h-24 rounded-xl flex items-center justify-center cursor-pointer transition-all border group overflow-hidden"
                  style={{
                    background: 'var(--bg-card)',
                    borderColor: files[i] ? 'var(--violet)' : 'var(--border-dim)',
                  }}
                >
                  <input
                    onChange={e => {
                      const f = [...files];
                      f[i] = e.target.files[0];
                      setFiles(f);
                    }}
                    type="file"
                    id={`image${i}`}
                    hidden
                    accept="image/*"
                  />
                  {files[i] ? (
                    <img src={URL.createObjectURL(files[i])} alt="" className="w-full h-full object-cover rounded-xl" />
                  ) : (
                    <div className="flex flex-col items-center gap-1 transition-colors" style={{ color: 'var(--text-muted)' }}>
                      <Image src={assets.upload_area} alt="upload" width={32} height={32} className="opacity-40" />
                      <span className="text-xs">{i === 0 ? 'Main' : `Alt ${i}`}</span>
                    </div>
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="eyebrow block mb-2">Product Name</label>
            <input
              type="text"
              placeholder="e.g. Apple AirPods Pro 2nd Gen"
              value={name}
              onChange={e => setName(e.target.value)}
              className="input-field w-full px-4 py-3 rounded-xl text-sm"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="eyebrow block mb-2">Description</label>
            <textarea
              rows={4}
              placeholder="Describe your product..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="input-field w-full px-4 py-3 rounded-xl text-sm resize-none"
              required
            />
          </div>

          {/* Category + Prices */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="eyebrow block mb-2">Category</label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="input-field w-full px-4 py-3 rounded-xl text-sm"
                style={{ appearance: 'none' }}
              >
                {categories.map(c => (
                  <option key={c} value={c} style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="eyebrow block mb-2">Original Price ($)</label>
              <input
                type="number"
                placeholder="499.99"
                value={price}
                onChange={e => setPrice(e.target.value)}
                className="input-field w-full px-4 py-3 rounded-xl text-sm"
                required
              />
            </div>
            <div>
              <label className="eyebrow block mb-2">Offer Price ($)</label>
              <input
                type="number"
                placeholder="399.99"
                value={offerPrice}
                onChange={e => setOfferPrice(e.target.value)}
                className="input-field w-full px-4 py-3 rounded-xl text-sm"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="btn-primary px-10 py-3.5 rounded-xl text-sm"
          >
            <span className="flex items-center gap-2 font-ui font-500 tracking-wide">
              {saving ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Publishing...
                </>
              ) : 'Add Product →'}
            </span>
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}