import { GetTripsUseCase } from './application/GetTripsUseCase';
import { TripsHttpRepository } from './infrastructure/http/TripsHttpRepository';
import { TripsController } from './infrastructure/web/TripsController';
import { createApp } from './infrastructure/web/app';

const EXTERNAL_API_URL = process.env.EXTERNAL_API_URL ?? 'http://localhost:3333';
const API_KEY = process.env.API_KEY ?? 'secret';
const PORT = process.env.PORT ?? 3000;

// Dependency injection composition root
const tripsRepository = new TripsHttpRepository(EXTERNAL_API_URL, API_KEY);
const getTripsUseCase = new GetTripsUseCase(tripsRepository);
const tripsController = new TripsController(getTripsUseCase);

const app = createApp(tripsController);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
