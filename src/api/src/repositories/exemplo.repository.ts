import { Injectable } from '@nestjs/common';
import { ExampleModel } from '../models/exemplo.model';

@Injectable()
export class ExampleRepository {
  findOne(id: number): ExampleModel {
    // Simulated database call
    return { id: id, name: "Example Name" };
  }
}
