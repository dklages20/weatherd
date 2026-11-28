import type { Coordinate } from './Coordinate.ts';
import type { ForecastUnit } from '#app/weather/types/ForecastUnit.ts';

type BaseForecastOptions = {
  unit: ForecastUnit
  timezone: string
};

type ForecastOptionsByCoordinate = {
  coordinate: Coordinate
  locationType: 'coordinate'
} & BaseForecastOptions;

type ForecastOptionsByZipCode = {
  zipCode: string
  locationType: 'zipCode'
} & BaseForecastOptions;

type ForecastOptionsByAddress = {
  address: string
  locationType: 'address'
} & BaseForecastOptions;

type ForecastOptionsByCity = {
  city: string
  locationType: 'city'
} & BaseForecastOptions;

export type ForecastOptions
  = ForecastOptionsByCoordinate
    | ForecastOptionsByZipCode
    | ForecastOptionsByAddress
    | ForecastOptionsByCity;
