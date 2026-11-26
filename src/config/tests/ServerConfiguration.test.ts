import { describe, expect, it } from 'vitest';
import { DEFAULT_SERVER_PORT, serverConfigurationSchema } from '../ServerConfiguration.ts';

describe('serverConfigurationSchema', () => {
  it('accepts a valid port', () => {
    expect(serverConfigurationSchema.parse({ SERVER_PORT: '3000' })).toEqual({
      port: 3000
    });
  });

  it('defaults the port when it is not provided', () => {
    expect(serverConfigurationSchema.parse({})).toEqual({
      port: DEFAULT_SERVER_PORT
    });
  });

  it('rejects a non-number port', () => {
    expect(() => serverConfigurationSchema.parse({ SERVER_PORT: 'abc' }))
      .toThrow();
  });

  it('rejects a negative port', () => {
    expect(() => serverConfigurationSchema.parse({ SERVER_PORT: '-1' }))
      .toThrow();
  });

  it('rejects a port greater than 65535', () => {
    expect(() => serverConfigurationSchema.parse({ SERVER_PORT: '65536' }))
      .toThrow();
  });
});
