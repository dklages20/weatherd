import type { BaseRequestOptions } from './BaseRequestOptions.ts';
import type { PrecipitationUnit, TemperatureUnit, WindSpeedUnit } from './Units.ts';
import { z } from 'zod';

export const currentWeatherRequestVariables = [
  'temperature_2m',
  'relative_humidity_2m',
  'apparent_temperature',
  'is_day',
  'wind_speed_10m',
  'wind_direction_10m',
  'wind_gusts_10m',
  'precipitation',
  'rain',
  'showers',
  'snowfall',
  'weather_code',
  'cloud_cover',
  'pressure_msl',
  'surface_pressure'
] as const;

export const currentWeatherVariableSchema = z.enum(currentWeatherRequestVariables);

export type CurrentWeatherVariable = z.infer<typeof currentWeatherVariableSchema>;

export type CurrentWeatherRequestOptions = {
  wind_speed_unit: WindSpeedUnit
  temperature_unit: TemperatureUnit
  precipitation_unit: PrecipitationUnit
  current: CurrentWeatherVariable[]
} & BaseRequestOptions;
