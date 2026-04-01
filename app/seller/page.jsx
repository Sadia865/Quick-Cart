
// ═══════════════════════════════════════════════════
// seller/add-product/page.jsx
// ═══════════════════════════════════════════════════
'use client'
import { assets } from "@/assets/assets";
import Image from "next/image";
import { Footer } from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
 
export function AddProduct() {
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
      const { data } = await axios.post('/api/product/add', formData, { headers: { Authorization: `Bearer ${token}` } });
      if (data.success) {
        toast.success('Product published!');
        setName(''); setDescription(''); setPrice(''); setOfferPrice(''); setFiles([]);
        router.push('/seller/product-list');
      } else { toast.error(data.message); }
    } catch (error) { toast.error(error.message); }
    finally { setSaving(false); }
  };
 
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
 
  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">
      <div style={{ padding: '2.5rem 2rem 2rem', maxWidth: 680 }}>
 
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <p className="eyebrow eyebrow-ice" style={{ marginBottom: 10 }}>Seller Panel</p>
          <h1
            style={{
              fontFamily: "'Clash Display', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
              color: 'var(--text-bright)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
            }}
          >
            Add <span className="grad-text">Product</span>
          </h1>
        </div>
 
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
 
          {/* Images */}
          <div>
            <label style={labelStyle}>Product Images</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {[...Array(4)].map((_, i) => (
                <label
                  key={i}
                  htmlFor={`image${i}`}
                  style={{
                    width: 96, height: 96, borderRadius: 12,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', overflow: 'hidden',
                    background: files[i] ? 'transparent' : 'var(--bg-card)',
                    border: `1px solid ${files[i] ? 'var(--border-ice)' : 'var(--border-dim)'}`,
                    transition: 'all 0.25s',
                    boxShadow: files[i] ? '0 0 16px var(--ice-glow-dim)' : 'none',
                  }}
                >
                  <input
                    onChange={e => { const f = [...files]; f[i] = e.target.files[0]; setFiles(f); }}
                    type="file" id={`image${i}`} hidden accept="image/*"
                  />
                  {files[i] ? (
                    <img src={URL.createObjectURL(files[i])} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <>
                      <Image src={assets.upload_area} alt="upload" width={28} height={28} style={{ opacity: 0.3 }} />
                      <span style={{ fontFamily: "'Satoshi', sans-serif", fontSize: '0.65rem', color: 'var(--text-ghost)', marginTop: 4 }}>
                        {i === 0 ? 'Main' : `Alt ${i}`}
                      </span>
                    </>
                  )}
                </label>
              ))}
            </div>
          </div>
 
          {/* Name */}
          <div>
            <label style={labelStyle}>Product Name</label>
            <input
              type="text" placeholder="e.g. Apple AirPods Pro 2nd Gen"
              value={name} onChange={e => setName(e.target.value)}
              required className="input-field"
              style={{ borderRadius: 12, fontFamily: "'Satoshi', sans-serif" }}
            />
          </div>
 
          {/* Description */}
          <div>
            <label style={labelStyle}>Description</label>
            <textarea
              rows={4} placeholder="Describe your product…"
              value={description} onChange={e => setDescription(e.target.value)}
              required className="input-field"
              style={{ borderRadius: 12, fontFamily: "'Satoshi', sans-serif", resize: 'none' }}
            />
          </div>
 
          {/* Category + Prices */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 16 }}>
            <div>
              <label style={labelStyle}>Category</label>
              <select
                value={category} onChange={e => setCategory(e.target.value)}
                className="input-field"
                style={{ borderRadius: 12, fontFamily: "'Satoshi', sans-serif", appearance: 'none' }}
              >
                {['Earphone','Headphone','Watch','Smartphone','Laptop','Camera','Accessories'].map(c => (
                  <option key={c} value={c} style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Original Price ($)</label>
              <input
                type="number" placeholder="499.99" value={price}
                onChange={e => setPrice(e.target.value)} required
                className="input-field"
                style={{ borderRadius: 12, fontFamily: "'Satoshi', sans-serif" }}
              />
            </div>
            <div>
              <label style={labelStyle}>Offer Price ($)</label>
              <input
                type="number" placeholder="399.99" value={offerPrice}
                onChange={e => setOfferPrice(e.target.value)} required
                className="input-field"
                style={{ borderRadius: 12, fontFamily: "'Satoshi', sans-serif" }}
              />
            </div>
          </div>
 
          <button
            type="submit"
            disabled={saving}
            className="btn-primary"
            style={{ borderRadius: 12, width: 'fit-content', opacity: saving ? 0.6 : 1 }}
          >
            <span className="flex items-center gap-2">
              {saving ? (
                <>
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Publishing…
                </>
              ) : (
                <>Publish Product →</>
              )}
            </span>
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
