import type { UnitValue } from '#app/utilities/index.ts';
import type { Forecast } from './Forecast.ts';

export type CurrentForecast = {
  temperature: UnitValue<number, string>
  feelsLike: UnitValue<number, string>
  humidity: UnitValue<number, string>
} & Forecast;
