import { createServer, serverConfiguration } from './server/index.ts';

const server = createServer();

server.listen({ port: serverConfiguration.port }, (err, address) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }

  server.log.info(`Server is listening on: ${address}`);
});
