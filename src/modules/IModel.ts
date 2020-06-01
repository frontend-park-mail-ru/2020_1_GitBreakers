export default interface ReturnPromise {
  success: boolean;
  body?: Promise<{ isUser?: boolean }[]>;
  status?: number;
}
