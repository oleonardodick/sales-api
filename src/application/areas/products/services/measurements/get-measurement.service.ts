import { Injectable } from '@nestjs/common';
import { GetMeasurementInterface } from '../../repositories/interfaces/get-measurement-repository.interface';

@Injectable()
export class GetMeasurementService {
  constructor(private getMeasurementInterface: GetMeasurementInterface) {}

  getAll() {
    return this.getMeasurementInterface.getAll();
  }

  getById(id: string) {
    return this.getMeasurementInterface.getById(id);
  }

  getByCode(code: string) {
    return this.getMeasurementInterface.getByCode(code);
  }
}
