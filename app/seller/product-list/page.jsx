'use client'
import React, { useEffect, useState } from 'react'
import { useAppContext } from '@/context/AppContext'
import Footer from '@/components/seller/Footer'
import Loading from '@/components/Loading'
import Image from 'next/image'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function ProductList() {
  const { router, getToken } = useAppContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('/api/product');
      if (data.success) setProducts(data.products);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const token = await getToken();
      const { data } = await axios.delete('/api/product/delete', {
        data: { id },
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.success) {
        toast.success('Product deleted');
        fetchProducts();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      {loading ? <Loading /> : (
        <div className="p-6 md:p-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <p className="eyebrow mb-2">{filtered.length} products</p>
              <h1 className="font-display font-600" style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', color: 'var(--text-bright)' }}>
                Product <span className="grad-text-violet">List</span>
              </h1>
            </div>
            <div className="relative max-w-xs w-full">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }}
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" placeholder="Search products..." value={search}
                onChange={e => setSearch(e.target.value)}
                className="input-field w-full pl-10 pr-4 py-2.5 rounded-full text-sm" />
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden max-w-4xl" style={{ border: '1px solid var(--border-dim)' }}>
            <table className="w-full dark-table table-fixed">
              <thead>
                <tr>
                  <th className="text-left px-5 py-4 w-1/2">Product</th>
                  <th className="text-left px-4 py-4 hidden md:table-cell">Category</th>
                  <th className="text-left px-4 py-4">Price</th>
                  <th className="text-left px-4 py-4 hidden md:table-cell">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((product, i) => (
                  <tr key={i}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: 'var(--bg-elevated)' }}>
                          <Image src={product.image[0]} alt={product.name} width={80} height={80}
                            className="w-10 h-10 object-contain" />
                        </div>
                        <span className="text-sm font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className="badge badge-violet px-2.5 py-1 rounded-lg">{product.category}</span>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm font-ui font-600" style={{ color: 'var(--text-primary)' }}>${product.offerPrice}</p>
                      <p className="text-xs line-through" style={{ color: 'var(--text-muted)' }}>${product.price}</p>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <button onClick={() => router.push(`/product/${product._id}`)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-ui tracking-wide transition-all border"
                          style={{ borderColor: 'var(--border-violet)', color: 'var(--violet-light)' }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(139,92,246,0.1)'}
                          onMouseLeave={e => e.currentTarget.style.background = ''}>
                          View
                        </button>
                        <button onClick={() => deleteProduct(product._id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-ui tracking-wide transition-all border"
                          style={{ borderColor: 'rgba(244,63,94,0.4)', color: 'var(--rose)' }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(244,63,94,0.1)'}
                          onMouseLeave={e => e.currentTarget.style.background = ''}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="py-16 text-center text-sm" style={{ color: 'var(--text-muted)' }}>No products found</div>
            )}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}