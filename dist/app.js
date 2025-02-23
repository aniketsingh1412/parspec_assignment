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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const orderService_1 = require("./services/orderService");
const queueService_1 = require("./services/queueService");
const metricService_1 = require("./services/metricService");
const orderController_1 = require("./controllers/orderController");
const metricController_1 = require("./controllers/metricController");
const db_1 = require("./config/db");
const queueProcessor_1 = require("./utils/queueProcessor");
const orderRepository_1 = require("./repositories/orderRepository");
function createApp() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, db_1.initDB)();
        yield db_1.sequelize.sync({ alter: true });
        const app = (0, express_1.default)();
        app.use(body_parser_1.default.json());
        const orderRepository = new orderRepository_1.OrderRepository();
        const orderService = new orderService_1.OrderService(orderRepository);
        const queueService = new queueService_1.QueueService();
        const metricService = new metricService_1.MetricService(orderRepository);
        // Instantiate controllers
        const orderController = new orderController_1.OrderController(orderService, queueService);
        const metricController = new metricController_1.MetricController(metricService);
        // Start queue processor
        (0, queueProcessor_1.startQueueProcessor)(queueService, orderService);
        // -- Order Routes --
        app.post('/orders', (req, res) => orderController.createOrder(req, res));
        app.get('/orders/:id', (req, res) => orderController.getOrder(req, res));
        // -- Metrics Route --
        app.get('/metrics', (req, res) => metricController.getMetrics(req, res));
        return app;
    });
}
exports.createApp = createApp;
//# sourceMappingURL=app.js.map