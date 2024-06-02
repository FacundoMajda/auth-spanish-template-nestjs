import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

/**
 * @ValidatorConstraint realiza la validación personalizada.
 * @async: false indica que esta validación es síncrona.
 */
@ValidatorConstraint({ async: false })
export class IsEqualValueValidator implements ValidatorConstraintInterface {
  /**
   * @validate es el método que realiza la validación real.
   * Compara el valor de la propiedad actual con el valor de la propiedad relacionada.
   * Si la propiedad relacionada no existe en el objeto, se lanza un error.
   * @return true si los valores son iguales, false en caso contrario.
   */
  validate(value: any, args: ValidationArguments): boolean {
    const [relatedPropertyName] = args.constraints;
    const relatedObject = args.object as Record<string, any>;
    if (relatedObject.hasOwnProperty(relatedPropertyName)) {
      const relatedValue = relatedObject[relatedPropertyName];
      return value === relatedValue;
    }
    throw new Error(
      `La propiedad relacionada '${relatedPropertyName}' no existe en el objeto.`,
    );
  }

  /**
   * @defaultMessage define el mensaje de error predeterminado que se mostrará cuando la validación falle.
   */
  defaultMessage(args: ValidationArguments) {
    const [relatedPropertyName] = args.constraints;
    return `El valor de '${args.property}' no coincide con '${relatedPropertyName}'.`;
  }
}

/**
 * @IsEqual es un decorador de validación personalizado que se puede usar en otras partes del código.
 * Comprueba si el valor de la propiedad decorada es igual al valor de otra propiedad.
 * @property es el nombre de la propiedad con la que se debe comparar el valor.
 * @validationOptions son las opciones de validación opcionales.
 */
export function IsEqual(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsEqualValueValidator,
    });
  };
}
