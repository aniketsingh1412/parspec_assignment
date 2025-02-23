import { QueueService } from '../services/queueService';
import { OrderService } from '../services/orderService';

export function startQueueProcessor(
  queueService: QueueService,
  orderService: OrderService
) {
  setInterval(async () => {
    const queueItem = queueService.dequeue();
    if (!queueItem) {
      return; // No orders in the queue
    }

    const order = queueItem.order;

    // Mark as PROCESSING
    order.status = 'PROCESSING';
    order.processingStartTime = new Date();
    await orderService.updateOrder(order);

    
    await new Promise((resolve) => setTimeout(resolve, 2000));
    order.status = 'COMPLETED';
    order.processingEndTime = new Date();
    await orderService.updateOrder(order);

  }, 1000); // check queue every second
}