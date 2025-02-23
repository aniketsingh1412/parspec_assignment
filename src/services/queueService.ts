import { Order } from '../models/Order';

type QueueItem = {
  order: Order;
};

export class QueueService {
  private queue: QueueItem[] = [];

  enqueue(order: Order): void {
    this.queue.push({ order });
  }

  dequeue(): QueueItem | undefined {
    return this.queue.shift();
  }

  getSize(): number {
    return this.queue.length;
  }
}