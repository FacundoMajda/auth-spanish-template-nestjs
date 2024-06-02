import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseDto } from '../models/response.dto';
// import { Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ResponseDto<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseDto<T>> {
    return next.handle().pipe(
      map((data: any) => {
        const response: Partial<ResponseDto<T>> = {
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: 'Success',
        };

        // Verificar si los datos tienen una estructura paginada
        if (data.meta && data.items) {
          response.data = data.items;
          response.metaData = {
            page: data.meta.currentPage,
            size: data.meta.itemsPerPage,
            totalItems: data.meta.totalItems,
            totalPages: data.meta.totalPages,
          };
        } else {
          response.data = data;
        }

        return response as ResponseDto<T>;
      }),
    );
  }
}
