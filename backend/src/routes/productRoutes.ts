import express, { Request, Response, NextFunction } from 'express';
import { Product } from '../models/Product';
import { auth, authorize } from '../middleware/auth';

const router = express.Router();

// Get all products
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category, subCategory, search, sort, page = 1, limit = 10 } = req.query;
    const query: any = {};

    // Apply filters
    if (category) query.category = category;
    if (subCategory) query.subCategory = subCategory;
    if (search) {
      query.$text = { $search: search as string };
    }

    // Apply sorting
    let sortOption = {};
    if (sort) {
      switch (sort) {
        case 'price_asc':
          sortOption = { price: 1 };
          break;
        case 'price_desc':
          sortOption = { price: -1 };
          break;
        case 'rating':
          sortOption = { 'ratings.average': -1 };
          break;
        default:
          sortOption = { createdAt: -1 };
      }
    }

    // Apply pagination
    const skip = (Number(page) - 1) * Number(limit);
    const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(Number(limit));

    const total = await Product.countDocuments(query);

    res.json({
      products,
      total,
      pages: Math.ceil(total / Number(limit)),
      currentPage: Number(page)
    });
  } catch (error) {
    next(error);
  }
});

// Get product by ID
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
});

// Create product (admin only)
router.post('/', auth, authorize('admin'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
});

// Update product (admin only)
router.patch('/:id', auth, authorize('admin'), async (req: Request, res: Response, next: NextFunction) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    'name',
    'description',
    'price',
    'category',
    'subCategory',
    'brand',
    'unit',
    'stock',
    'images',
    'isAvailable',
    'discount'
  ];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    res.status(400).json({ error: 'Invalid updates' });
    return;
  }

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    updates.forEach(update => {
      (product as any)[update] = req.body[update];
    });

    await product.save();
    res.json(product);
  } catch (error) {
    next(error);
  }
});

// Delete product (admin only)
router.delete('/:id', auth, authorize('admin'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
});

// Update product stock (admin only)
router.patch('/:id/stock', auth, authorize('admin'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { stock } = req.body;
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    product.stock = stock;
    await product.save();

    res.json(product);
  } catch (error) {
    next(error);
  }
});

// Update product discount (admin only)
router.patch('/:id/discount', auth, authorize('admin'), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { percentage, validUntil } = req.body;
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }

    product.discount = {
      percentage,
      validUntil: new Date(validUntil)
    };
    await product.save();

    res.json(product);
  } catch (error) {
    next(error);
  }
});

export default router; 