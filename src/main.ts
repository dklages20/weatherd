import fastify from 'fastify';
import { loadConfiguration } from './config/Configuration.ts';

const configuration = loadConfiguration();

const server = fastify({
  logger: true
});

server.listen({ port: configuration.server.port }, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }

  server.log.info(`Server is listening on: ${address}`);
});
