import type { UnitValue } from '#app/utilities/index.ts';
import type { WeatherCondition } from './WeatherCondition.ts';

export type Forecast = {
  date: Date
  accumulatedPrecipitation: UnitValue<number, string>
  conditions: WeatherCondition[]
};
