// src/services/orderService.ts
import { Order } from '../models/Order';
import { OrderRepository } from '../repositories/orderRepository';

export class OrderService {
  constructor(private orderRepository: OrderRepository) {}

  async createOrder(
    userId: string,
    itemIds: string[],
    totalAmount: number
  ): Promise<Order> {
    const now = new Date();
    const order = await this.orderRepository.create({
      userId,
      itemIds,
      totalAmount,
      status: 'PENDING',
      createdAt: now,
      updatedAt: now,
    });
    return order;
  }

  async getOrder(orderId: number): Promise<Order | null> {
    return this.orderRepository.findById(orderId);
  }

  async updateOrder(order: Order): Promise<void> {
    order.updatedAt = new Date();
    await this.orderRepository.update(order);
  }

  async getAllOrders(): Promise<Order[]> {
    return this.orderRepository.getAll();
  }
}