interface PaginatedResponse {
  page: number;
  size: number;
  totalItems: number;
  totalPages: number;
}

export class ResponseDto<T> {
  statusCode: number;
  message: string;
  data?: T;
  metaData?: PaginatedResponse;
}
