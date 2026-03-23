import { Request, Response } from 'express';
import { GetTripsUseCase } from '../../application/GetTripsUseCase';

export class TripsController {
  constructor(private readonly getTripsUseCase: GetTripsUseCase) {}

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      console.log("get all trips")
      const trips = await this.getTripsUseCase.execute();
      res.json(trips);
    } catch (error) {
      res.status(502).json({ error: 'Failed to fetch trips from external service' });
    }
  }
}
