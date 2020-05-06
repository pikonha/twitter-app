export default class CustomError extends Error {
  status: number;

  constructor(status = 500, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    this.status = status;
  }
}
