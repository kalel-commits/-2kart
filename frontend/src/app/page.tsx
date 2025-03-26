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
      price: 79,
      image: "https://images.pexels.com/photos/1510392/pexels-photo-1510392.jpeg",
      category: "Fruits"
    },
    {
      id: 2,
      name: "Organic Milk",
      price: 129,
      image: "https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg",
      category: "Dairy"
    },
    {
      id: 3,
      name: "Whole Wheat Bread",
      price: 89,
      image: "https://images.pexels.com/photos/46174/strawberries-berries-fruit-freshness-46174.jpeg",
      category: "Bakery"
    },
    {
      id: 4,
      name: "Fresh Tomatoes",
      price: 39,
      image: "https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg",
      category: "Vegetables"
    },
    {
      id: 5,
      name: "Greek Yogurt",
      price: 99,
      image: "https://images.pexels.com/photos/3735648/pexels-photo-3735648.jpeg",
      category: "Dairy"
    },
    {
      id: 6,
      name: "Bananas",
      price: 49,
      image: "https://images.pexels.com/photos/1093038/pexels-photo-1093038.jpeg",
      category: "Fruits"
    },
    {
      id: 7,
      name: "Fresh Eggs",
      price: 69,
      image: "https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg",
      category: "Dairy"
    },
    {
      id: 8,
      name: "Orange Juice",
      price: 89,
      image: "https://images.pexels.com/photos/327098/pexels-photo-327098.jpeg",
      category: "Beverages"
    },
    {
      id: 9,
      name: "Carrots",
      price: 39,
      image: "https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg",
      category: "Vegetables"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Our Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
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
              <h2 className="text-xl font-semibold mb-2 text-gray-800">{product.name}</h2>
              <p className="text-gray-600 mb-2">{product.category}</p>
              <p className="text-gray-900 font-bold">₹{product.price}</p>
              <button 
                onClick={() => addToCart(product)}
                className="mt-4 w-full bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors"
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
