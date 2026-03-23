import request from 'supertest';
import nock from 'nock';
import { GetTripsUseCase } from '../../application/GetTripsUseCase';
import { TripsHttpRepository } from '../../infrastructure/http/TripsHttpRepository';
import { TripsController } from '../../infrastructure/web/TripsController';
import { createApp } from '../../infrastructure/web/app';

const EXTERNAL_API_URL = 'http://localhost:3333';
const API_KEY = 'secret';

const MOCK_TRIPS = [
  { id: 1, destination: 'Paris', price: 120, duration: 3 },
  { id: 2, destination: 'London', price: 150, duration: 2 },
  { id: 3, destination: 'Paris', price: 90, duration: 4 },
  { id: 4, destination: 'Berlin', price: 80, duration: 2 },
];

const app = createApp(
  new TripsController(
    new GetTripsUseCase(
      new TripsHttpRepository(EXTERNAL_API_URL, API_KEY),
    ),
  ),
);

describe('GET /trips', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('returns all trips from the external API', async () => {
    nock(EXTERNAL_API_URL)
      .get('/mock/trips')
      .matchHeader('x-api-key', API_KEY)
      .reply(200, MOCK_TRIPS);

    const response = await request(app).get('/trips');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(MOCK_TRIPS);
  });

  it('returns 502 when the external API is unavailable', async () => {
    nock(EXTERNAL_API_URL)
      .get('/mock/trips')
      .replyWithError('ECONNREFUSED');

    const response = await request(app).get('/trips');

    expect(response.status).toBe(502);
  });
});
