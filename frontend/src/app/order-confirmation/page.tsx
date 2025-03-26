'use client';

import Link from 'next/link';

export default function OrderConfirmationPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="text-center">
        <div className="mb-8">
          <svg
            className="mx-auto h-16 w-16 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h1 className="text-3xl font-bold mb-4 text-black">Order Placed Successfully!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for your order. We'll send you a confirmation email with your order details shortly.
        </p>
        <Link
          href="/"
          className="inline-block bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
} 