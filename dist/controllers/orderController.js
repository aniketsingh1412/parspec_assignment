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
exports.OrderController = void 0;
class OrderController {
    constructor(orderService, queueService) {
        this.orderService = orderService;
        this.queueService = queueService;
    }
    createOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId, itemIds, totalAmount } = req.body;
                if (!userId || !itemIds || totalAmount == null) {
                    return res.status(400).json({ error: 'Missing required fields' });
                }
                const order = yield this.orderService.createOrder(userId, itemIds, totalAmount);
                this.queueService.enqueue(order);
                return res.status(201).json({ order });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    ;
    getOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderId = parseInt(req.params.id, 10);
                if (isNaN(orderId)) {
                    return res.status(400).json({ error: 'Invalid order ID' });
                }
                const order = yield this.orderService.getOrder(orderId);
                if (!order) {
                    return res.status(404).json({ error: 'Order not found' });
                }
                return res.json({ order });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    ;
}
exports.OrderController = OrderController;
//# sourceMappingURL=orderController.js.map