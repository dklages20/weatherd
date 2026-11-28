export class WeatherdError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = 'WeatherdError';
  }
}
