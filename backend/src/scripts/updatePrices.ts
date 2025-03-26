import mongoose from 'mongoose';
import { Product } from '../models/Product';

async function updatePrices() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/2kart');
    console.log('Connected to MongoDB');

    // Get all products
    const products = await Product.find({});
    console.log(`Found ${products.length} products`);

    // Update each product's price
    for (const product of products) {
      product.price = Math.round(product.price / 2);
      await product.save();
      console.log(`Updated price for ${product.name} to ₹${product.price}`);
    }

    console.log('All prices updated successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error updating prices:', error);
    process.exit(1);
  }
}

updatePrices(); 