import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { CarMakes, CarModels } from './car-enum';

export function IsValidModel(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isValidModel',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const mark = (args.object as any).mark;
                    return CarModels[mark].includes(value);
                },
            },
        });
    };
}