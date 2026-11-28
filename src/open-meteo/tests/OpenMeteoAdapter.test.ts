import { describe, expect, it, vi } from 'vitest';
import type { ForecastOptions } from '#app/weather/index.ts';
import type { CurrentWeatherResponse } from '../types/index.ts';
import { OpenMeteoAdapter } from '../OpenMeteoAdapter.ts';
import { getCurrentWeather } from '../OpenMeteoApi.ts';

vi.mock('../OpenMeteoApi.ts', () => ({
  getCurrentWeather: vi.fn()
}));

const getCurrentWeatherMock = vi.mocked(getCurrentWeather);

describe('OpenMeteoAdapter', () => {
  describe('getCurrentForecast', () => {
    it('maps an imperial coordinate forecast response', async () => {
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
      };
      getCurrentWeatherMock.mockResolvedValue(currentWeatherResponse);
      const adapter = new OpenMeteoAdapter();

      await expect(adapter.getCurrentForecast({
        locationType: 'coordinate',
        coordinate: {
          latitude: 40.7128,
          longitude: -74.006
        },
        timezone: 'America/New_York',
        unit: 'imperial'
      })).resolves.toEqual({
        temperature: {
          value: 60,
          unit: '°F'
        },
        feelsLike: {
          value: 58,
          unit: '°F'
        },
        humidity: {
          value: 75,
          unit: '%'
        },
        chanceOfPrecipitation: {
          value: 0.1,
          unit: 'in'
        },
        conditions: [],
        date: new Date('2026-11-27T10:00')
      });
    });

    it('requests imperial current weather', async () => {
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
      });

      await new OpenMeteoAdapter().getCurrentForecast({
        locationType: 'coordinate',
        coordinate: {
          latitude: 40.7128,
          longitude: -74.006
        },
        timezone: 'America/New_York',
        unit: 'imperial'
      });

      expect(getCurrentWeatherMock).toHaveBeenCalledWith({
        latitude: 40.7128,
        longitude: -74.006,
        timezone: 'America/New_York',
        precipitation_unit: 'inch',
        temperature_unit: 'fahrenheit',
        wind_speed_unit: 'mph',
        current: [
          'temperature_2m',
          'apparent_temperature',
          'relative_humidity_2m',
          'precipitation'
        ]
      });
    });

    it('maps metric coordinate forecast requests', async () => {
      getCurrentWeatherMock.mockResolvedValue({
        latitude: 40.7128,
        longitude: -74.006,
        generationtime_ms: 0.1,
        utc_offset_seconds: 0,
        timezone: 'UTC',
        timezone_abbreviation: 'UTC',
        elevation: 10,
        current_units: {
          time: 'iso8601',
          interval: 'seconds',
          temperature_2m: '°C',
          apparent_temperature: '°C',
          relative_humidity_2m: '%',
          precipitation: 'mm'
        },
        current: {
          time: '2026-11-27T10:00',
          interval: 900,
          temperature_2m: 15,
          apparent_temperature: 14,
          relative_humidity_2m: 75,
          precipitation: 2
        }
      });

      await new OpenMeteoAdapter().getCurrentForecast({
        locationType: 'coordinate',
        coordinate: {
          latitude: 40.7128,
          longitude: -74.006
        },
        timezone: 'UTC',
        unit: 'metric'
      });

      expect(getCurrentWeatherMock).toHaveBeenLastCalledWith(expect.objectContaining({
        precipitation_unit: 'mm',
        temperature_unit: 'celsius',
        wind_speed_unit: 'kmh'
      }));
    });

    it.each<ForecastOptions>([
      {
        locationType: 'zipCode',
        zipCode: '10001',
        timezone: 'America/New_York',
        unit: 'imperial'
      },
      {
        locationType: 'address',
        address: '1 Main Street',
        timezone: 'America/New_York',
        unit: 'imperial'
      },
      {
        locationType: 'city',
        city: 'New York',
        timezone: 'America/New_York',
        unit: 'imperial'
      }
    ])('rejects unsupported $locationType locations', async (forecastOptions) => {
      await expect(new OpenMeteoAdapter().getCurrentForecast(forecastOptions)).rejects.toThrow();
    });

    it.each([
      [
        'a value',
        {
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
            temperature_2m: '°F'
          },
          current: {
            time: '2026-11-27T10:00',
            interval: 900,
            temperature_2m: undefined
          }
        }
      ],
      [
        'a unit',
        {
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
            temperature_2m: undefined
          },
          current: {
            time: '2026-11-27T10:00',
            interval: 900,
            temperature_2m: 60
          }
        }
      ]
    ])('rejects responses missing %s', async (_missingPart, incompleteResponse) => {
      getCurrentWeatherMock.mockResolvedValue(incompleteResponse);

      await expect(new OpenMeteoAdapter().getCurrentForecast({
        locationType: 'coordinate',
        coordinate: {
          latitude: 40.7128,
          longitude: -74.006
        },
        timezone: 'America/New_York',
        unit: 'imperial'
      })).rejects.toThrow();
    });
  });

  describe('getHourlyForecast', () => {
    it('throws because it is not implemented', () => {
      expect(() => new OpenMeteoAdapter().getHourlyForecast({
        locationType: 'coordinate',
        coordinate: {
          latitude: 1,
          longitude: 1
        },
        timezone: 'UTC',
        unit: 'metric'
      })).toThrow();
    });
  });

  describe('get5DayForecast', () => {
    it('throws because it is not implemented', () => {
      expect(() => new OpenMeteoAdapter().get5DayForecast({
        locationType: 'coordinate',
        coordinate: {
          latitude: 1,
          longitude: 1
        },
        timezone: 'UTC',
        unit: 'metric'
      })).toThrow();
    });
  });

  describe('get10DayForecast', () => {
    it('throws because it is not implemented', () => {
      expect(() => new OpenMeteoAdapter().get10DayForecast({
        locationType: 'coordinate',
        coordinate: {
          latitude: 1,
          longitude: 1
        },
        timezone: 'UTC',
        unit: 'metric'
      })).toThrow();
    });
  });
});
