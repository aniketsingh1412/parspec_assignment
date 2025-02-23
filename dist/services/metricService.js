"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricService = void 0;
class MetricService {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    getMetrics() {
        return __awaiter(this, void 0, void 0, function* () {
            const totalOrders = yield this.orderRepository.getCount();
            const processedCount = yield this.orderRepository.getProcessedCount();
            const allOrders = yield this.orderRepository.getAll();
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
        });
    }
}
exports.MetricService = MetricService;
//# sourceMappingURL=metricService.js.map