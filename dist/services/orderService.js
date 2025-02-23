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
exports.OrderService = void 0;
class OrderService {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }
    createOrder(userId, itemIds, totalAmount) {
        return __awaiter(this, void 0, void 0, function* () {
            const now = new Date();
            const order = yield this.orderRepository.create({
                userId,
                itemIds,
                totalAmount,
                status: 'PENDING',
                createdAt: now,
                updatedAt: now,
            });
            return order;
        });
    }
    getOrder(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.orderRepository.findById(orderId);
        });
    }
    updateOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            order.updatedAt = new Date();
            yield this.orderRepository.update(order);
        });
    }
    getAllOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.orderRepository.getAll();
        });
    }
}
exports.OrderService = OrderService;
//# sourceMappingURL=orderService.js.map