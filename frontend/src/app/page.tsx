'use client';

import { useCart } from './context/CartContext';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(true);
  
  // This would typically come from an API
  const products = [
    {
      id: 1,
      name: "Fresh Apples",
      price: 299,
      image: "https://images.pexels.com/photos/1510392/pexels-photo-1510392.jpeg",
      category: "Fruits"
    },
    {
      id: 2,
      name: "Organic Milk",
      price: 499,
      image: "https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg",
      category: "Dairy"
    },
    {
      id: 3,
      name: "Whole Wheat Bread",
      price: 349,
      image: "https://images.pexels.com/photos/46174/strawberries-berries-fruit-freshness-46174.jpeg",
      category: "Bakery"
    },
    // Add more products as needed
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-black">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48 bg-gray-100">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={product.id === 1}
                loading={product.id === 1 ? "eager" : "lazy"}
                onLoadingComplete={() => setLoading(false)}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSAyVC08MTY3LjIyOUFTRjo/Tj4yMkhiSk46Nj1BUU5KTVJQUk1QUlL/2wBDARUXFx4aHjshITtBNkFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUH/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
              />
              {loading && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse" />
              )}
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-black">{product.name}</h2>
              <p className="text-gray-600 mb-2 text-black">{product.category}</p>
              <p className="text-green-600 font-bold">₹{product.price}</p>
              <button 
                onClick={() => addToCart(product)}
                className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
