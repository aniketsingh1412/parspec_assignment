import { OrderRepository } from '../repositories/orderRepository';

export class MetricService {
  constructor(private orderRepository: OrderRepository) {}

  async getMetrics() {
    const totalOrders = await this.orderRepository.getCount();
    const processedCount = await this.orderRepository.getProcessedCount();
    const allOrders = await this.orderRepository.getAll();

    // Compute average processing time for COMPLETED orders
    const completedOrders = allOrders.filter(o => o.status === 'COMPLETED');
    let avgProcessingTime = 0;
    if (completedOrders.length > 0) {
      const totalProcessingTimeMs = completedOrders.reduce((sum, o) => {
        if (o.processingStartTime && o.processingEndTime) {
          return sum + (o.processingEndTime.getTime() - o.processingStartTime.getTime());
        }
        return sum;
      }, 0);
      avgProcessingTime = totalProcessingTimeMs / completedOrders.length / 1000; // seconds
    }

    const pendingCount = allOrders.filter(o => o.status === 'PENDING').length;
    const processingCount = allOrders.filter(o => o.status === 'PROCESSING').length;
    const completedCount = completedOrders.length;

    return {
      totalOrders,
      processedCount,
      avgProcessingTime,
      statuses: {
        pending: pendingCount,
        processing: processingCount,
        completed: completedCount
      }
    };
  }
}