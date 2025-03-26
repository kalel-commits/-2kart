"use client";

import React from "react";

  <div className="bg-white p-6 rounded-lg shadow-md h-fit">
    <h2 className="text-xl font-semibold mb-4 text-black">Order Summary</h2>
    <div className="space-y-2">
      <div className="flex justify-between">
        <span className="text-black">Subtotal</span>
        <span className="font-semibold text-black">₹299</span>
      </div>
      <div className="flex justify-between">
        <span className="text-black">Delivery Fee</span>
        <span className="font-semibold text-black">₹299</span>
      </div>
      <div className="border-t pt-2 mt-2">
        <div className="flex justify-between">
          <span className="font-bold text-black">Total</span>
          <span className="font-bold text-black">₹598</span>
        </div>
      </div>
    </div>
    <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg mt-6 hover:bg-green-700">
      Proceed to Checkout
    </button>
  </div> 