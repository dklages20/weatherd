import { describe, expect, it } from 'vitest';
import { loadConfiguration } from '../Configuration.ts';

describe('loadConfiguration', () => {
  it('loads configuration', () => {
    expect(loadConfiguration({ SERVER_PORT: '3000' })).toBeDefined();
  });

  it('exports each field as expected', () => {
    expect(loadConfiguration({ SERVER_PORT: '3000' })).toEqual({
      server: { port: 3000 }
    });
  });

  it('reports errors individually', () => {
    expect(() => loadConfiguration({ SERVER_PORT: 'not-a-number' }))
      .toThrow(/Invalid configuration:.*SERVER_PORT/s);
  });
});
