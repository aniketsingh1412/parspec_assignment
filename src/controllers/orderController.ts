import { Request, Response } from 'express';
import { OrderService } from '../services/orderService';
import { QueueService } from '../services/queueService';

export class OrderController {
  constructor(
    private orderService: OrderService,
    private queueService: QueueService
  ) {}

  async createOrder (req: Request, res: Response) : Promise<any> {
    try {
      const { userId, itemIds, totalAmount } = req.body;
      if (!userId || !itemIds || totalAmount == null) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      const order = await this.orderService.createOrder(userId, itemIds, totalAmount);
      this.queueService.enqueue(order);

      return res.status(201).json({ order });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  async getOrder (req: Request, res: Response):Promise<any> {
    try {
      const orderId = parseInt(req.params.id, 10);
      if (isNaN(orderId)) {
        return res.status(400).json({ error: 'Invalid order ID' });
      }

      const order = await this.orderService.getOrder(orderId);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }

      return res.json({ order });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}