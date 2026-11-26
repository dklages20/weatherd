# WeatherAPI.com

- **Coverage:** Global.
- **Use it for:** One provider for weather, air quality, and pollen. The forecast API returns daily and hourly data for 3–14 days. Air quality is listed on all plans (limited on Free); pollen requires Starter or above.
- **Pricing:** Free tier is advertised as 100,000 calls/month, commercial use, no card. Verify current quotas and field restrictions at purchase time.

## APIs

- [Forecast API](https://www.weatherapi.com/docs/forecast-api/) — `GET https://api.weatherapi.com/v1/forecast.json`; `days=1..14`, daily forecast plus hourly records.
- [Air Quality](https://www.weatherapi.com/docs/air-quality/) — request AQ fields with `aqi=yes`.
- [Pollen](https://www.weatherapi.com/docs/pollen/) — pollen species/count data; Starter+.
- [Search / autocomplete](https://www.weatherapi.com/docs/search-api/)
- [Pricing](https://www.weatherapi.com/pricing)

## Caveats

Pollen coverage is documented for the US, Canada, UK, and Europe; do not present a global allergy feature without checking the requested location.
