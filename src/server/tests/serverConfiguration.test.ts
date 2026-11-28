import { describe, expect, it } from 'vitest';
import { serverConfigurationSchema } from '../serverConfiguration.ts';

describe('serverConfigurationSchema', () => {
  it('defaults to port 8080', () => {
    expect(serverConfigurationSchema.parse({})).toEqual({
      port: 8080
    });
  });

  it('parses a valid port', () => {
    expect(serverConfigurationSchema.parse({
      SERVER_PORT: '3000'
    })).toEqual({
      port: 3000
    });
  });

  it('rejects a non-numeric port', () => {
    expect(() => serverConfigurationSchema.parse({
      SERVER_PORT: 'not-a-number'
    })).toThrow();
  });

  it('rejects a port below 1', () => {
    expect(() => serverConfigurationSchema.parse({
      SERVER_PORT: '0'
    })).toThrow();
  });

  it('rejects a port above 65535', () => {
    expect(() => serverConfigurationSchema.parse({
      SERVER_PORT: '65536'
    })).toThrow();
  });

  it('rejects a fractional port', () => {
    expect(() => serverConfigurationSchema.parse({
      SERVER_PORT: '8080.5'
    })).toThrow();
  });
});
