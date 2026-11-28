import type { UnitValue } from '#app/utilities/index.ts';
import type { WeatherCondition } from './WeatherCondition.ts';

export type Forecast = {
  date: Date
  chanceOfPrecipitation: UnitValue<number, string>
  conditions: WeatherCondition[]
};
