import type { CurrentForecast, Forecast, ForecastOptions, HourlyForecast } from './types/index.ts';

export interface WeatherAdapter {
  getHourlyForecast(forecastOptions: ForecastOptions): Promise<HourlyForecast[]>
  getCurrentForecast(forecastOptions: ForecastOptions): Promise<CurrentForecast>
  get5DayForecast(forecastOptions: ForecastOptions): Promise<Forecast[]>
  get10DayForecast(forecastOptions: ForecastOptions): Promise<Forecast[]>
}
