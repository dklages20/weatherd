import { ForecastUnit } from '../ForecastUnit.ts';
import { Coordinate } from './Coordinate.ts';

type BaseForecastOptions = {
  unit: ForecastUnit
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
