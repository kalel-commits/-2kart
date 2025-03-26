'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function CategoriesPage() {
  const categories = [
    {
      id: 1,
      name: "Fruits & Vegetables",
      image: "https://images.pexels.com/photos/1510392/pexels-photo-1510392.jpeg",
      itemCount: 150
    },
    {
      id: 2,
      name: "Dairy & Eggs",
      image: "https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg",
      itemCount: 80
    },
    {
      id: 3,
      name: "Bakery",
      image: "https://images.pexels.com/photos/46174/strawberries-berries-fruit-freshness-46174.jpeg",
      itemCount: 60
    },
    {
      id: 4,
      name: "Meat & Seafood",
      image: "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg",
      itemCount: 100
    },
    {
      id: 5,
      name: "Pantry",
      image: "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg",
      itemCount: 200
    },
    {
      id: 6,
      name: "Beverages",
      image: "https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg",
      itemCount: 120
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-black">Shop by Category</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <Image 
                src={category.image} 
                alt={category.name} 
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-black">{category.name}</h2>
              <p className="text-gray-600 text-black">{category.itemCount} items</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 