'use client';

import { useCart } from '../context/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const deliveryFee = 299;
  const total = subtotal + deliveryFee;

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-black">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Add some items to your cart to see them here.</p>
          <Link href="/" className="inline-block bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-black">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm mb-4">
              <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-contain" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-black">{item.name}</h3>
                <p className="text-gray-600 text-sm">{item.category}</p>
                <p className="text-green-600 font-medium mt-1">₹{item.price}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <button
                    onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="ml-4 text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-xl font-semibold mb-4 text-black">Order Summary</h2>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between">
                <div>
                  <p className="text-black">{item.name}</p>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <p className="text-black">₹{item.price * item.quantity}</p>
              </div>
            ))}
            <div className="border-t pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-black">Subtotal</span>
                <span className="text-black">₹{subtotal}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-black">Delivery Fee</span>
                <span className="text-black">₹{deliveryFee}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span className="text-black">Total</span>
                <span className="text-black">₹{total}</span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="block w-full bg-green-600 text-white py-3 px-4 rounded-lg text-center hover:bg-green-700"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 