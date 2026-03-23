import { Trip } from '../domain/Trip';
import { TripsRepository } from '../domain/ports/TripsRepository';

export class GetTripsUseCase {
  constructor(private readonly tripsRepository: TripsRepository) {}

  async execute(): Promise<Trip[]> {
    return this.tripsRepository.findAll();
  }
}
