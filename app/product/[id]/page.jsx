"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";

import {
  Minus,
  Plus,
  Star,
} from "lucide-react";

export default function Product() {
  const { id } = useParams();
  const { products, router, addToCart, currency } = useAppContext();

  const [mainImage, setMainImage] = useState(null);
  const [productData, setProductData] = useState(null);
  const [adding, setAdding] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    const product = products.find((p) => p._id === id);
    setProductData(product);
    setMainImage(null);
  }, [id, products]);

  const handleAddToCart = async () => {
    if (!productData) return;

    setAdding(true);
    for (let i = 0; i < quantity; i++) {
      await addToCart(productData._id);
    }
    setTimeout(() => setAdding(false), 800);
  };

  const handleBuyNow = async () => {
    await handleAddToCart();
    router.push("/cart");
  };

  if (!productData) return (
    <>
      <Navbar />
      <Loading />
    </>
  );

  const discount = Math.round(
    ((productData.price - productData.offerPrice) / productData.price) * 100
  );

  const relatedProducts = products
    .filter(
      (p) =>
        p.category === productData.category && p._id !== productData._id
    )
    .slice(0, 5);

  return (
    <>
      <Navbar />

      <div className="px-6 md:px-16 lg:px-32 pt-10 pb-20">

        {/* Product Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* Images */}
          <div>
            <div className="rounded-2xl overflow-hidden mb-4 flex items-center justify-center bg-gray-900 p-8">
              <Image
                src={mainImage || productData.image[0]}
                alt={productData.name}
                width={600}
                height={600}
                className="object-contain w-[80%] h-[80%]"
              />
            </div>

            <div className="grid grid-cols-4 gap-3">
              {productData.image.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setMainImage(img)}
                  className="rounded-xl overflow-hidden border p-2"
                >
                  <Image
                    src={img}
                    alt=""
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-5">

            <div className="flex gap-2 flex-wrap">
              <span className="px-3 py-1 text-xs bg-purple-600 text-white rounded-full">
                {productData.category}
              </span>

              {discount > 0 && (
                <span className="px-3 py-1 text-xs bg-cyan-600 text-white rounded-full">
                  -{discount}% OFF
                </span>
              )}
            </div>

            <h1 className="text-3xl font-bold">{productData.name}</h1>

            {/* Stars */}
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4"
                  fill={i < 4 ? "gold" : "none"}
                  stroke="gold"
                />
              ))}
            </div>

            {/* Price */}
            <div className="flex gap-3 items-baseline">
              <span className="text-3xl font-bold text-purple-500">
                {currency}{productData.offerPrice}
              </span>
              <span className="line-through text-gray-400">
                {currency}{productData.price}
              </span>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-3 border rounded-xl w-fit px-3 py-2">

              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                <Minus className="w-4 h-4" />
              </button>

              <span>{quantity}</span>

              <button onClick={() => setQuantity(q => q + 1)}>
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                disabled={adding}
                className="flex-1 bg-purple-600 text-white py-3 rounded-xl"
              >
                {adding ? "Adding..." : "Add to Cart"}
              </button>

              <button
                onClick={handleBuyNow}
                className="flex-1 bg-gradient-to-r from-purple-600 to-cyan-500 text-white py-3 rounded-xl"
              >
                Buy Now
              </button>
            </div>

            {/* Description */}
            <div className="mt-4">
              <p className="text-gray-500 text-sm">
                {productData.description}
              </p>
            </div>
          </div>
        </div>

        {/* Related */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold mb-6">
              Related Products
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}