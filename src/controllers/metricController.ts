import { Request, Response } from 'express';
import { MetricService } from '../services/metricService';

export class MetricController {
  constructor(private metricService: MetricService) {}

  async getMetrics(req: Request, res: Response):Promise<any> {
    try {
      const metrics = await this.metricService.getMetrics();
      return res.json(metrics);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}