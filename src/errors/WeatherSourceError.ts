import { WeatherdError } from './WeatherdError.ts';

type WeatherSourceErrorOptions = {
  statusCode: number
  reason: string
} & ErrorOptions;

export class WeatherSourceError extends WeatherdError {
  readonly statusCode?: number;

  constructor(message: string, options?: WeatherSourceErrorOptions) {
    super(options?.reason ?? message, options);
    this.name = 'WeatherSourceError';
    this.statusCode = options?.statusCode;
  }
}
