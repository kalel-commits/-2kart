'use client';

import { useCart } from '../context/CartContext';
import { CartItem } from '../context/CartContext';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const subtotal = cartItems.reduce((total: number, item: CartItem) => total + (item.price * item.quantity), 0);
  const deliveryFee = 299;
  const total = subtotal + deliveryFee;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-black">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 text-lg">Your cart is empty</p>
          <a href="/products" className="text-green-600 hover:text-green-700 mt-4 inline-block">
            Continue Shopping
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {cartItems.map((item: CartItem) => (
              <div key={item.id} className="flex items-center bg-white p-4 rounded-lg shadow-md mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="ml-4 flex-grow">
                  <h2 className="text-xl font-semibold text-black">{item.name}</h2>
                  <p className="text-gray-600 text-black">{item.category}</p>
                  <p className="text-green-600 font-bold">₹{item.price}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      className="px-2 py-1 bg-gray-200 rounded text-black"
                    >
                      -
                    </button>
                    <span className="mx-4 text-black">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-200 rounded text-black"
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
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-black">Subtotal</span>
                <span className="font-semibold text-black">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-black">Delivery Fee</span>
                <span className="font-semibold text-black">₹{deliveryFee}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between">
                  <span className="font-bold text-black">Total</span>
                  <span className="font-bold text-black">₹{total}</span>
                </div>
              </div>
            </div>
            <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg mt-6 hover:bg-green-700">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 