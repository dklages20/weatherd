import { describe, expect, it } from 'vitest';
import { WeatherdError } from '../WeatherdError.ts';
import { WeatherSourceError } from '../WeatherSourceError.ts';

describe('WeatherSourceError', () => {
  it('extends WeatherdError without source options', () => {
    expect(new WeatherSourceError('A weather source error occurred')).toBeInstanceOf(WeatherdError);
  });

  it('preserves the source error cause', () => {
    const cause = new Error('The weather source request failed');
    const error = new WeatherSourceError('A weather source error occurred', {
      statusCode: 503,
      reason: 'The weather source is unavailable',
      cause
    });

    expect(error.cause).toBe(cause);
  });

  it('preserves the source error status code', () => {
    const error = new WeatherSourceError('A weather source error occurred', {
      statusCode: 503,
      reason: 'The weather source is unavailable'
    });

    expect(error.statusCode).toBe(503);
  });
});
