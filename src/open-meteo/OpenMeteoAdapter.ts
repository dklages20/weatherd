import type { UnitValue } from '#app/utilities/index.ts';
import type { CurrentForecast, Forecast, ForecastOptions, HourlyForecast, WeatherAdapter } from '#app/weather/index.ts';
import { getCurrentWeather } from './OpenMeteoApi.ts';
import type { CurrentWeatherResponse } from './types/index.ts';
import type { CurrentWeatherVariable } from './types/inputs/index.ts';

export class OpenMeteoAdapter implements WeatherAdapter {
  getHourlyForecast(forecastOptions: ForecastOptions): Promise<HourlyForecast[]> {
    throw new Error('Method not implemented.');
  }

  async getCurrentForecast(forecastOptions: ForecastOptions): Promise<CurrentForecast> {
    if (forecastOptions.locationType !== 'coordinate') {
      throw new Error('Method not implemented for non-coordinate location types');
    }

    const {
      coordinate,
      unit,
      timezone
    } = forecastOptions;

    const response = await getCurrentWeather({
      timezone,
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
      precipitation_unit: unit === 'imperial' ? 'inch' : 'mm',
      temperature_unit: unit === 'imperial' ? 'fahrenheit' : 'celsius',
      wind_speed_unit: unit === 'imperial' ? 'mph' : 'kmh',
      current: [
        'temperature_2m',
        'apparent_temperature',
        'relative_humidity_2m',
        'precipitation'
      ]
    });

    return {
      temperature: this.buildUnitValue(response, 'temperature_2m'),
      humidity: this.buildUnitValue(response, 'relative_humidity_2m'),
      feelsLike: this.buildUnitValue(response, 'apparent_temperature'),
      chanceOfPrecipitation: this.buildUnitValue(response, 'precipitation'),
      conditions: [],
      date: new Date(response.current.time)
    };
  }

  get5DayForecast(forecastOptions: ForecastOptions): Promise<Forecast[]> {
    throw new Error('Method not implemented.');
  }

  get10DayForecast(forecastOptions: ForecastOptions): Promise<Forecast[]> {
    throw new Error('Method not implemented.');
  }

  private buildUnitValue(
    options: CurrentWeatherResponse,
    variable: CurrentWeatherVariable
  ): UnitValue<number, string> {
    const weatherValue = options.current[variable];
    const weatherUnit = options.current_units[variable];
    if (weatherValue === undefined || weatherUnit === undefined) {
      throw new Error(`Unable to build templated pair from value = ${weatherValue} and unit = ${weatherUnit}`);
    }
    return {
      value: weatherValue,
      unit: weatherUnit
    };
  }
}
