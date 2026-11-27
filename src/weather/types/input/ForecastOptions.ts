import { Coordinate } from './Coordinate.ts';
import { ForecastUnit } from '../ForecastUnit.ts';

export type ForecastOptions = {
  unit: ForecastUnit
  coordinate?: Coordinate
};
