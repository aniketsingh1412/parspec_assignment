
import { Order, OrderCreationAttributes } from '../models/Order';

export class OrderRepository {
  async create(orderData: OrderCreationAttributes): Promise<Order> {
    const order = await Order.create(orderData);
    return order;
  }

  async findById(id: number): Promise<Order | null> {
    return Order.findByPk(id);
  }

  async update(order: Order): Promise<void> {
    await order.save();
  }

  async getAll(): Promise<Order[]> {
    return Order.findAll();
  }

  async getCount(): Promise<number> {
    return Order.count();
  }

  async getProcessedCount(): Promise<number> {
    return Order.count({ where: { status: 'COMPLETED' } });
  }
}