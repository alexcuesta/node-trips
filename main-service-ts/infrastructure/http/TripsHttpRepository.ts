import axios from 'axios';
import { Trip } from '../../domain/Trip';
import { TripsRepository } from '../../domain/ports/TripsRepository';

export class TripsHttpRepository implements TripsRepository {
  constructor(
    private readonly baseUrl: string,
    private readonly apiKey: string,
  ) {}

  async findAll(): Promise<Trip[]> {
    const response = await axios.get<Trip[]>(`${this.baseUrl}/mock/trips`, {
      headers: { 'x-api-key': this.apiKey },
      timeout: 5000,
    });
    return response.data;
  }
}
