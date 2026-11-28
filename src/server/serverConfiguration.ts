import { z } from 'zod';

export type ServerConfiguration = { port: number };

export const serverConfigurationSchema = z
  .object({
    SERVER_PORT: z.coerce
      .number()
      .int()
      .min(1)
      .max(65535)
      .default(8080)
  })
  .transform(({ SERVER_PORT }): ServerConfiguration => ({ port: SERVER_PORT }));

export const serverConfiguration: ServerConfiguration = serverConfigurationSchema.parse(process.env);
