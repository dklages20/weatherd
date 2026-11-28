import { z } from 'zod';
import { type CurrentWeatherVariable, currentWeatherRequestVariables } from '#app/open-meteo/types/inputs/CurrentWeatherRequestOptions.ts';

export const currentWeatherResponseSchema = z.object({
  latitude: z.number().min(-90)
    .max(90),
  longitude: z.number().min(-180)
    .max(180),
  generationtime_ms: z.number(),
  utc_offset_seconds: z.number(),
  timezone: z.string(),
  timezone_abbreviation: z.string(),
  elevation: z.number(),

  current_units: z.object({
    time: z.string(),
    interval: z.string()
  }).extend(
    Object.fromEntries(
      currentWeatherRequestVariables.map(variable => [
        variable,
        z.string().optional()
      ])
    ) as Record<CurrentWeatherVariable, z.ZodOptional<z.ZodString>>
  ),

  current: z.object({
    time: z.string(),
    interval: z.number()
  }).extend(
    Object.fromEntries(
      currentWeatherRequestVariables.map(variable => [
        variable,
        z.number().optional()
      ])
    ) as Record<CurrentWeatherVariable, z.ZodOptional<z.ZodNumber>>
  )
});

export type CurrentWeatherResponse = z.infer<typeof currentWeatherResponseSchema>;
