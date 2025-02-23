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
exports.OrderRepository = void 0;
const Order_1 = require("../models/Order");
class OrderRepository {
    create(orderData) {
        return __awaiter(this, void 0, void 0, function* () {
            const order = yield Order_1.Order.create(orderData);
            return order;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return Order_1.Order.findByPk(id);
        });
    }
    update(order) {
        return __awaiter(this, void 0, void 0, function* () {
            yield order.save();
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return Order_1.Order.findAll();
        });
    }
    getCount() {
        return __awaiter(this, void 0, void 0, function* () {
            return Order_1.Order.count();
        });
    }
    getProcessedCount() {
        return __awaiter(this, void 0, void 0, function* () {
            return Order_1.Order.count({ where: { status: 'COMPLETED' } });
        });
    }
}
exports.OrderRepository = OrderRepository;
//# sourceMappingURL=orderRepository.js.map