import { z } from 'zod';
import { serverConfigurationSchema } from './ServerConfiguration.ts';

const configurationSchema = z.object({
  server: serverConfigurationSchema
});

export type Configuration = z.output<typeof configurationSchema>;

export function loadConfiguration(env: NodeJS.ProcessEnv = process.env): Configuration {
  const result = configurationSchema.safeParse({ server: env });

  if (!result.success) {
    throw new Error(`Invalid configuration:\n${z.prettifyError(result.error)}`);
  }

  return result.data;
}
