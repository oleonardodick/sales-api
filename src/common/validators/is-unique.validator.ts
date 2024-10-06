import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { PrismaService } from 'src/application/database/prisma.service';

export function IsUnique(
  modelName: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isUnique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [modelName],
      validator: {
        async validate(value: any, args: ValidationArguments) {
          if (!args.value) return true;

          const fieldName = args.property;

          const prismaService = new PrismaService();
          const data = await prismaService[modelName.toLowerCase()].findUnique({
            where: { [fieldName]: value },
          });

          return !data;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be unique!`;
        },
      },
    });
  };
}
