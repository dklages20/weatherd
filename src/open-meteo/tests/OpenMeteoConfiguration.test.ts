import { afterEach, describe, expect, it, vi } from 'vitest';

async function loadConfiguration(environment: Record<string, string | undefined>) {
  vi.resetModules();
  vi.unstubAllEnvs();

  for (const [
    key,
    value
  ] of Object.entries(environment)) {
    vi.stubEnv(key, value);
  }

  return import('../OpenMeteoConfiguration.ts');
}

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('openMeteoConfiguration', () => {
  it('uses the Open-Meteo API URL by default', async () => {
    const { openMeteoConfiguration } = await loadConfiguration({
      OPEN_METEO_BASE_URL: undefined
    });

    expect(openMeteoConfiguration).toEqual({
      baseUrl: 'https://api.open-meteo.com'
    });
  });

  it('uses a valid configured API URL', async () => {
    const { openMeteoConfiguration } = await loadConfiguration({
      OPEN_METEO_BASE_URL: 'https://weather.example.com'
    });

    expect(openMeteoConfiguration).toEqual({
      baseUrl: 'https://weather.example.com'
    });
  });

  it('rejects an invalid configured API URL', async () => {
    await expect(loadConfiguration({
      OPEN_METEO_BASE_URL: 'not-a-url'
    })).rejects.toThrow();
  });
});
