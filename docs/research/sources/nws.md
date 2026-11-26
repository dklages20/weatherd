# National Weather Service (weather.gov)

- **Coverage:** United States and its territories; not a global provider.
- **Use it for:** US forecasts and alerts without a vendor fee. `points/{lat},{lon}` discovers the office/grid and links to seven-day daily and hourly forecasts.
- **Pricing/licensing:** NWS states API data are open data and free for any purpose, subject to reasonable rate limits. Send a descriptive `User-Agent`.

## APIs

- [NWS API documentation](https://www.weather.gov/documentation/services-web-api)
- [OpenAPI specification](https://api.weather.gov/openapi.json)
- `GET https://api.weather.gov/points/{latitude},{longitude}` — discover forecast URLs.
- Returned `forecast` — daily/12-hour periods through seven days.
- Returned `forecastHourly` — hourly periods through seven days.
- [Alerts API](https://www.weather.gov/documentation/services-web-alerts) — active and historical alert feeds.

## Gaps

No 10-day forecast, AQI, or pollen. Pair with AirNow for US AQI and a pollen API.
