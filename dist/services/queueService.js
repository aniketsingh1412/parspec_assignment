"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueService = void 0;
class QueueService {
    constructor() {
        this.queue = [];
    }
    enqueue(order) {
        this.queue.push({ order });
    }
    dequeue() {
        return this.queue.shift();
    }
    getSize() {
        return this.queue.length;
    }
}
exports.QueueService = QueueService;
//# sourceMappingURL=queueService.js.map