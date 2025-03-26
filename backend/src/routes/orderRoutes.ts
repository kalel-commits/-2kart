import express, { Request, Response, NextFunction } from 'express';
import { Order } from '../models/Order';
import { Product } from '../models/Product';
import { auth, authorize } from '../middleware/auth';
import { Types } from 'mongoose';

const router = express.Router();

// Create new order
router.post('/', auth, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { items, deliveryAddress, paymentMethod } = req.body;

    // Calculate order total and validate stock
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        res.status(404).json({ error: `Product ${item.product} not found` });
        return;
      }

      if (product.stock < item.quantity) {
        res.status(400).json({ error: `Insufficient stock for ${product.name}` });
        return;
      }

      const subtotal = product.price * item.quantity;
      totalAmount += subtotal;

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price,
        subtotal
      });

      // Update product stock
      product.stock -= item.quantity;
      await product.save();
    }

    // Add delivery fee
    const deliveryFee = 50; // Fixed delivery fee
    totalAmount += deliveryFee;

    // Create order
    const order = new Order({
      customer: req.user?._id,
      items: orderItems,
      totalAmount,
      deliveryAddress,
      paymentMethod,
      deliveryFee,
      estimatedDeliveryTime: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes from now
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
});

// Get customer's orders
router.get('/my-orders', auth, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const orders = await Order.find({ customer: req.user?._id })
      .sort({ createdAt: -1 })
      .populate('items.product');
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

// Get order by ID
router.get('/:id', auth, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('customer', 'name email phone')
      .populate('driver', 'name phone')
      .populate('items.product');

    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }

    // Check if user is authorized to view this order
    const customerId = (order.customer as Types.ObjectId).toString();
    const userId = (req.user?._id as Types.ObjectId).toString();
    
    if (req.user?.role !== 'admin' && 
        req.user?.role !== 'driver' && 
        customerId !== userId) {
      res.status(403).json({ error: 'Not authorized to view this order' });
      return;
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
});

// Update order status (admin/driver only)
router.patch('/:id/status', auth, authorize('admin', 'driver'), async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(404).json({ error: 'Order not found' });
      return;
    }

    // Update status and driver if needed
    order.status = status;
    if (status === 'out_for_delivery' && req.user?.role === 'driver') {
      order.driver = req.user._id;
    }
    if (status === 'delivered') {
      order.actualDeliveryTime = new Date();
    }

    await order.save();
    res.json(order);
  } catch (error) {
    next(error);
  }
});

// Get all orders (admin only)
router.get('/', auth, authorize('admin'), async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const query: any = {};

    if (status) {
      query.status = status;
    }

    const skip = (Number(page) - 1) * Number(limit);
    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .populate('customer', 'name email phone')
      .populate('driver', 'name phone');

    const total = await Order.countDocuments(query);

    res.json({
      orders,
      total,
      pages: Math.ceil(total / Number(limit)),
      currentPage: Number(page)
    });
  } catch (error) {
    next(error);
  }
});

// Get driver's orders
router.get('/driver/orders', auth, authorize('driver'), async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { status } = req.query;
    const query: any = { driver: req.user?._id };

    if (status) {
      query.status = status;
    }

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .populate('customer', 'name phone address');

    res.json(orders);
  } catch (error) {
    next(error);
  }
});

export default router; 