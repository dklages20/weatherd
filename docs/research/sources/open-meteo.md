# Open-Meteo

- **Coverage:** Global, model-based weather; automatically selects/combines applicable national models.
- **Use it for:** A non-commercial global prototype. The forecast endpoint supplies hourly and daily fields through 16 days. The separate Air Quality API supplies five days of hourly data.
- **Commercial note:** The public no-key API is for non-commercial use. Commercial applications should use the customer API and pricing terms.

## APIs

- [Forecast API](https://open-meteo.com/en/docs) — `https://api.open-meteo.com/v1/forecast`; use `hourly`, `daily`, `timezone=auto`, and `forecast_days=10`.
- [Air Quality API](https://open-meteo.com/en/docs/air-quality-api) — `https://air-quality-api.open-meteo.com/v1/air-quality`; hourly AQI and pollutant fields, 5-day horizon.
- [Geocoding API](https://open-meteo.com/en/docs/geocoding-api) — location search and coordinates.
- [Pricing](https://open-meteo.com/en/pricing) and [license/terms](https://open-meteo.com/en/terms).

## Gaps

No pollen/allergy API. Pair with Google Pollen, Ambee, or WeatherAPI.com if that feature is needed.
