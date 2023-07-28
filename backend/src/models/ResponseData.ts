export interface IResponseData<T> {
  data?: T;
  success: boolean;
  message: string;
}
