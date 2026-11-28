import { z } from 'zod';

const OPEN_METEO_BASE_URL = 'https://api.open-meteo.com';

const schema = z.object({
  OPEN_METEO_BASE_URL: z
    .string()
    .nonempty()
    .pipe(
      z.httpUrl()
    )
    .default(OPEN_METEO_BASE_URL)
})
  .transform((env): OpenMeteoConfiguration => ({
    baseUrl: env.OPEN_METEO_BASE_URL
  }));

export type OpenMeteoConfiguration = { baseUrl: string };

export const openMeteoConfiguration: OpenMeteoConfiguration = schema.parse(process.env);
