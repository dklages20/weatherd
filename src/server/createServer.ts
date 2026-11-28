import { fastify, type FastifyInstance } from 'fastify';
import { registerWeatherRoutes } from '#app/weather/index.ts';

export function createServer(): FastifyInstance {
  const server = fastify({ logger: true });
  server.register(registerWeatherRoutes, { prefix: '/v1/weather' });
  return server;
}
