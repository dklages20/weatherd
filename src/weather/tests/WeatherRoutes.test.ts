import { afterEach, describe, expect, it, vi } from 'vitest';
import { fastify, type FastifyInstance } from 'fastify';
import type { CurrentWeatherResponse } from '#app/open-meteo/types/index.ts';
import { getCurrentWeather } from '#app/open-meteo/OpenMeteoApi.ts';
import { registerWeatherRoutes } from '../WeatherRoutes.ts';

vi.mock('#app/open-meteo/OpenMeteoApi.ts', () => ({
  getCurrentWeather: vi.fn()
}));

const getCurrentWeatherMock = vi.mocked(getCurrentWeather);

let server: FastifyInstance | undefined;

afterEach(async () => {
  await server?.close();
});

describe('registerWeatherRoutes', () => {
  it('returns the current weather response', async () => {
    getCurrentWeatherMock.mockResolvedValue({
      latitude: 40.7128,
      longitude: -74.006,
      generationtime_ms: 0.1,
      utc_offset_seconds: -18000,
      timezone: 'America/New_York',
      timezone_abbreviation: 'EST',
      elevation: 10,
      current_units: {
        time: 'iso8601',
        interval: 'seconds',
        temperature_2m: '°F',
        apparent_temperature: '°F',
        relative_humidity_2m: '%',
        precipitation: 'in'
      },
      current: {
        time: '2026-11-27T10:00',
        interval: 900,
        temperature_2m: 60,
        apparent_temperature: 58,
        relative_humidity_2m: 75,
        precipitation: 0.1
      }
    } satisfies CurrentWeatherResponse);
    server = fastify();
    registerWeatherRoutes(server);

    const response = await server.inject({
      method: 'GET',
      url: '/current?latitude=40.7128&longitude=-74.006&timezone=America%2FNew_York&unit=imperial'
    });

    expect(response.statusCode).toBe(200);
  });

  it.each([
    [
      'latitude',
      '/current?longitude=-74.006&timezone=America%2FNew_York&unit=imperial'
    ],
    [
      'longitude',
      '/current?latitude=40.7128&timezone=America%2FNew_York&unit=imperial'
    ],
    [
      'timezone',
      '/current?latitude=40.7128&longitude=-74.006&unit=imperial'
    ],
    [
      'unit',
      '/current?latitude=40.7128&longitude=-74.006&timezone=America%2FNew_York'
    ]
  ])('rejects requests missing %s', async (_missingParameter, url) => {
    server = fastify();
    registerWeatherRoutes(server);

    const response = await server.inject({
      method: 'GET',
      url
    });

    expect(response.statusCode).toBe(400);
  });
});
