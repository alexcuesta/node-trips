import express, { Application } from 'express';
import { TripsController } from './TripsController';

export function createApp(tripsController: TripsController): Application {
  const app = express();

  app.get('/trips', (req, res) => tripsController.getAll(req, res));

  return app;
}
