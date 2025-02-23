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
exports.startQueueProcessor = void 0;
function startQueueProcessor(queueService, orderService) {
    setInterval(() => __awaiter(this, void 0, void 0, function* () {
        const queueItem = queueService.dequeue();
        if (!queueItem) {
            return; // No orders in the queue
        }
        const order = queueItem.order;
        // Mark as PROCESSING
        order.status = 'PROCESSING';
        order.processingStartTime = new Date();
        yield orderService.updateOrder(order);
        yield new Promise((resolve) => setTimeout(resolve, 2000));
        order.status = 'COMPLETED';
        order.processingEndTime = new Date();
        yield orderService.updateOrder(order);
    }), 1000); // check queue every second
}
exports.startQueueProcessor = startQueueProcessor;
//# sourceMappingURL=queueProcessor.js.map