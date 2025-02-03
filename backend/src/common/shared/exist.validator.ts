import { Injectable } from '@nestjs/common';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { EntityManager } from 'typeorm';

@ValidatorConstraint({ name: 'IsExistConstraint', async: true })
@Injectable()
export class IsExist implements ValidatorConstraintInterface {
    constructor(private readonly entityManager: EntityManager) {}
    async validate(value: any, args?: ValidationArguments): Promise<boolean> {
        const [tableName, column] = args?.constraints as string[];
        console.log(tableName, column);

        const dataExist = await this.entityManager
            .getRepository(tableName)
            .createQueryBuilder(tableName)
            .where({ [column]: value })
            .getExists();

        return dataExist;
    }

    defaultMessage(validationArguments: ValidationArguments): string {
        const field = validationArguments.property;

        return `${field} is not exist.`;
    }
}
