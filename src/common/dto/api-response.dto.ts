export interface ApiResponseDTO<T> {
  success: boolean;
  message: string;
  data: T;
}
