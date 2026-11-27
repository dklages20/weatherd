import { Forecast } from './Forecast.ts';

export type CurrentForecast = {
  temperature: number
  feelsLike: number
  humidity: number
} & Forecast;
