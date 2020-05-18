export interface IReturnPromise {
  success: boolean;
  body?: Promise<{ isUser?: boolean }[]>;
  status?: number;
}
