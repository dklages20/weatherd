import { afterEach, describe, expect, it } from 'vitest';
import type { FastifyInstance } from 'fastify';
import { createServer } from '../createServer.ts';

let server: FastifyInstance | undefined;

afterEach(async () => {
  await server?.close();
});

describe('createServer', () => {
  it('registers the weather route prefix', async () => {
    server = createServer();
    await server.ready();

    expect(server.hasRoute({
      method: 'GET',
      url: '/v1/weather/current'
    })).toBe(true);
  });
});
