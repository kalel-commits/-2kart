'use client';

import { useCart } from '../context/CartContext';

export default function ProductsPage() {
  const { addToCart } = useCart();
  
  // This would typically come from an API
  const products = [
    {
      id: 1,
      name: "Fresh Apples",
      price: 299,
      image: "https://images.pexels.com/photos/1510392/pexels-photo-1510392.jpeg?cs=srgb&dl=pexels-suzyhazelwood-1510392.jpg&fm=jpg",
      category: "Fruits"
    },
    {
      id: 2,
      name: "Organic Milk",
      price: 499,
      image: "https://thumbs.dreamstime.com/b/milk-splash-14275789.jpg",
      category: "Dairy"
    },
    {
      id: 3,
      name: "Whole Wheat Bread",
      price: 349,
      image: "https://5.imimg.com/data5/SELLER/Default/2024/1/379708876/VJ/KL/CS/32041095/sliced-brown-bread.jpg",
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
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2 text-black">{product.name}</h2>
              <p className="text-gray-600 mb-2 text-black">{product.category}</p>
              <p className="text-green-600 font-bold">₹{product.price}</p>
              <button 
                onClick={() => addToCart(product)}
                className="mt-4 w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
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