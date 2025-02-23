import express from 'express';
import bodyParser from 'body-parser';
import { OrderService } from './services/orderService';
import { QueueService } from './services/queueService';
import { MetricService } from './services/metricService';
import { OrderController } from './controllers/orderController';
import { MetricController } from './controllers/metricController';
import { initDB, sequelize } from './config/db'; 
import { startQueueProcessor } from './utils/queueProcessor';
import { OrderRepository } from './repositories/orderRepository';

export async function createApp() {
  await initDB(); 
  await sequelize.sync({ alter: true }); 

  const app = express();


  app.use(bodyParser.json());

  const orderRepository = new OrderRepository();
  const orderService = new OrderService(orderRepository);
  const queueService = new QueueService();
  const metricService = new MetricService(orderRepository);

  // Instantiate controllers
  const orderController = new OrderController(orderService, queueService);
  const metricController = new MetricController(metricService);

  // Start queue processor
  startQueueProcessor(queueService, orderService);

  // -- Order Routes --
  app.post('/orders', (req, res) => orderController.createOrder(req, res));
  app.get('/orders/:id', (req, res) => orderController.getOrder(req, res));

  // -- Metrics Route --
  app.get('/metrics', (req, res) => metricController.getMetrics(req, res));

  return app;
}