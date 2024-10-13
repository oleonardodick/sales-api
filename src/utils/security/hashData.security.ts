import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export async function hashData(data: string): Promise<string> {
  try {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(data, salt);
  } catch (err) {
    throw new InternalServerErrorException(err);
  }
}
