import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';
import { ApiResponseDTO } from '../../common/dto/api-response.dto';

@Injectable()
export class TransformResponseInterceptor<T>
  implements NestInterceptor<T, ApiResponseDTO<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponseDTO<T>> {
    return next.handle().pipe(
      map((data) => {
        // Si el controlador retorna 'null', la respuesta se considera exitosa sin datos.
        if (data === null) {
          return {
            success: true,
            message: 'Success',
            data: null,
          };
        }

        // Convierte el objeto plano en una instancia de la clase y valida la estructura.
        const transformedData = plainToClass(context.getClass(), data);
        const validationErrors = validateSync(transformedData);

        // Si se encuentran errores de validación, se devuelve una respuesta de error.
        if (validationErrors.length > 0) {
          const errorMessage = 'Validation failed';
          throw new Error(errorMessage);
        }

        // Envuelve la respuesta en la estructura de datos común.
        return {
          success: true,
          message: 'Success',
          data: transformedData,
        };
      }),
    );
  }
}
