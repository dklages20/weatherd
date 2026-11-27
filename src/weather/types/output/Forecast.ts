import { WeatherCondition } from './WeatherCondition.ts';
import { ForecastUnit } from '../ForecastUnit.ts';

export type Forecast = {
  date: Date
  unit: ForecastUnit
  highTemperature: number
  lowTemperature: number
  chanceOfPrecipitation: number
  conditions: WeatherCondition[]
};
