import { SetMetadata } from '@nestjs/common';
import { Papel } from '@prisma/client';

export const Papeis = (...papeis: Papel[]) => SetMetadata('papeis', papeis);
