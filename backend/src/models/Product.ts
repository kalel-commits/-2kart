import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  subCategory: string;
  brand: string;
  unit: string;
  stock: number;
  images: string[];
  isAvailable: boolean;
  ratings: {
    average: number;
    count: number;
  };
  discount?: {
    percentage: number;
    validUntil: Date;
  };
}

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  subCategory: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  unit: {
    type: String,
    required: true,
    trim: true
  },
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  images: [{
    type: String,
    required: true
  }],
  isAvailable: {
    type: Boolean,
    default: true
  },
  ratings: {
    average: {
      type: Number,
      default: 0
    },
    count: {
      type: Number,
      default: 0
    }
  },
  discount: {
    percentage: {
      type: Number,
      min: 0,
      max: 100
    },
    validUntil: {
      type: Date
    }
  }
}, {
  timestamps: true
});

// Index for faster queries
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1, subCategory: 1 });
productSchema.index({ isAvailable: 1 });

export const Product = mongoose.model<IProduct>('Product', productSchema); 