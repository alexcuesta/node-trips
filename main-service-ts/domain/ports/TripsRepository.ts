import { Trip } from '../Trip';

export interface TripsRepository {
  findAll(): Promise<Trip[]>;
}
