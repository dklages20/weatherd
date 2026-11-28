import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { OpenMeteoAdapter } from '#app/open-meteo/OpenMeteoAdapter.ts';

const currentWeatherQuerystringSchema = {
  type: 'object',
  additionalProperties: false,
  required: [
    'latitude',
    'longitude',
    'timezone',
    'unit'
  ],
  properties: {
    latitude: {
      type: 'number',
      minimum: -90,
      maximum: 90
    },
    longitude: {
      type: 'number',
      minimum: -180,
      maximum: 180
    },
    timezone: {
      type: 'string',
      minLength: 1
    },
    unit: {
      type: 'string',
      enum: [
        'imperial',
        'metric'
      ]
    }
  }
} as const;

async function currentWeatherHandler(
  request: FastifyRequest<{
    Querystring: {
      latitude: number
      longitude: number
      timezone: string
      unit: 'imperial' | 'metric'
    }
  }>,
  reply: FastifyReply
) {
  const {
    latitude,
    longitude,
    timezone,
    unit
  } = request.query;
  const weatherAdapter = new OpenMeteoAdapter();
  const currentWeather = await weatherAdapter.getCurrentForecast({
    locationType: 'coordinate',
    coordinate: {
      latitude,
      longitude
    },
    timezone,
    unit
  });
  return currentWeather;
}

export function registerWeatherRoutes(fastify: FastifyInstance) {
  fastify.get('/current', {
    schema: {
      querystring: currentWeatherQuerystringSchema
    }
  }, currentWeatherHandler);
}
