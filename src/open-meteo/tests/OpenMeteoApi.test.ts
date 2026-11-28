import { describe, expect, it, vi } from 'vitest';
import { WeatherSourceError } from '#app/errors/index.ts';
import { getCurrentWeather } from '../OpenMeteoApi.ts';
import type { CurrentWeatherRequestOptions, CurrentWeatherResponse } from '../types/index.ts';

const fetchMock = vi.hoisted(() => vi.fn());

vi.mock('undici', () => ({
  fetch: fetchMock
}));

describe('getCurrentWeather', () => {
  it('returns current weather', async () => {
    const requestOptions: CurrentWeatherRequestOptions = {
      latitude: 40.7128,
      longitude: -74.006,
      timezone: 'America/New_York',
      precipitation_unit: 'inch',
      temperature_unit: 'fahrenheit',
      wind_speed_unit: 'mph',
      current: [
        'temperature_2m',
        'relative_humidity_2m'
      ]
    };
    const currentWeatherResponse: CurrentWeatherResponse = {
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
        relative_humidity_2m: '%'
      },
      current: {
        time: '2026-11-27T10:00',
        interval: 900,
        temperature_2m: 60,
        relative_humidity_2m: 75
      }
    };
    fetchMock.mockResolvedValue({
      status: 200,
      json: vi.fn().mockResolvedValue(currentWeatherResponse)
    });

    await expect(getCurrentWeather(requestOptions))
      .resolves.toEqual(currentWeatherResponse);
  });

  it('requests current weather with the supplied options', async () => {
    const requestOptions: CurrentWeatherRequestOptions = {
      latitude: 40.7128,
      longitude: -74.006,
      timezone: 'America/New_York',
      precipitation_unit: 'inch',
      temperature_unit: 'fahrenheit',
      wind_speed_unit: 'mph',
      current: [
        'temperature_2m',
        'relative_humidity_2m'
      ]
    };
    fetchMock.mockResolvedValue({
      status: 200,
      json: vi.fn().mockResolvedValue({
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
          relative_humidity_2m: '%'
        },
        current: {
          time: '2026-11-27T10:00',
          interval: 900,
          temperature_2m: 60,
          relative_humidity_2m: 75
        }
      })
    });

    await getCurrentWeather(requestOptions);

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.open-meteo.com/v1/forecast?latitude=40.7128&longitude=-74.006&timezone=America%2FNew_York&precipitation_unit=inch&temperature_unit=fahrenheit&wind_speed_unit=mph&current=temperature_2m%2Crelative_humidity_2m',
      { method: 'GET' }
    );
  });

  it('throws a weather source error when Open-Meteo returns an error response', async () => {
    const requestOptions: CurrentWeatherRequestOptions = {
      latitude: 40.7128,
      longitude: -74.006,
      timezone: 'America/New_York',
      precipitation_unit: 'inch',
      temperature_unit: 'fahrenheit',
      wind_speed_unit: 'mph',
      current: [
        'temperature_2m'
      ]
    };
    fetchMock.mockResolvedValue({
      status: 400,
      json: vi.fn().mockResolvedValue({
        error: true,
        reason: 'Invalid latitude'
      })
    });

    await expect(getCurrentWeather(requestOptions)).rejects.toThrow(WeatherSourceError);
  });

  it('rejects malformed successful responses', async () => {
    const requestOptions: CurrentWeatherRequestOptions = {
      latitude: 40.7128,
      longitude: -74.006,
      timezone: 'America/New_York',
      precipitation_unit: 'inch',
      temperature_unit: 'fahrenheit',
      wind_speed_unit: 'mph',
      current: [
        'temperature_2m'
      ]
    };
    fetchMock.mockResolvedValue({
      status: 200,
      json: vi.fn().mockResolvedValue({})
    });

    await expect(getCurrentWeather(requestOptions)).rejects.toThrow();
  });
});
