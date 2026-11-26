import { z } from 'zod';

export const DEFAULT_SERVER_PORT = 8080;

export const serverConfigurationSchema = z
  .object({
    SERVER_PORT: z.coerce
      .number()
      .int()
      .min(1)
      .max(65535)
      .default(DEFAULT_SERVER_PORT)
  })
  .transform(({ SERVER_PORT }) => ({ port: SERVER_PORT }));

export type ServerConfiguration = z.output<typeof serverConfigurationSchema>;
