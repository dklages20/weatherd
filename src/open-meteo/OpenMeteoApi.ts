import { fetch } from 'undici';
import { URLSearchParams } from 'node:url';
import { currentWeatherResponseSchema, errorResponseSchema, type CurrentWeatherRequestOptions, type CurrentWeatherResponse } from './types/index.ts';
import { WeatherSourceError } from '#app/errors/index.ts';
import { openMeteoConfiguration } from './OpenMeteoConfiguration.ts';

const forecastUrl = openMeteoConfiguration.baseUrl + '/v1/forecast';

function buildCurrentWeatherUrl(options: CurrentWeatherRequestOptions): string {
  const urlParams = new URLSearchParams();
  urlParams.append('latitude', options.latitude.toString());
  urlParams.append('longitude', options.longitude.toString());
  urlParams.append('timezone', options.timezone);
  urlParams.append('precipitation_unit', options.precipitation_unit);
  urlParams.append('temperature_unit', options.temperature_unit);
  urlParams.append('wind_speed_unit', options.wind_speed_unit);
  urlParams.append('current', options.current.join(','));
  return forecastUrl + '?' + urlParams.toString();
}

export async function getCurrentWeather(options: CurrentWeatherRequestOptions): Promise<CurrentWeatherResponse> {
  const currentWeatherUrl = buildCurrentWeatherUrl(options);
  const response = await fetch(currentWeatherUrl, { method: 'GET' });
  const json = await response.json();

  if (response.status !== 200) {
    const errorResponse = errorResponseSchema.parse(json);
    throw new WeatherSourceError('Failed to retrieve current weather from Open-Meteo', {
      statusCode: response.status,
      reason: errorResponse.reason
    });
  }

  return currentWeatherResponseSchema.parse(json);
}
