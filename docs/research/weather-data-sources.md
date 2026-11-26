# Weather data-source comparison

**Date:** November 26, 2026

**Terms**

- **Free:** A no-cost API tier provides the feature. 
  - **Note:** It may still have request limits, attribution requirements, or restrictions on commercial use.
- **Paid:** The feature requires a paid plan, usage-based billing, or a sales agreement.
- **Forecast horizon:** The number of days the provider returns.

| Datasource | Hourly | Daily / today | 5 day | 10 day | Air quality | Allergies / pollen |
| --- | --- | --- | --- | --- | --- | --- |
| [Open-Meteo](sources/open-meteo.md) | Free* | Free* | Free* | Free* (up to 16 days) | Free* (5-day hourly) | — |
| [NWS / weather.gov](sources/nws.md) | Free (US/territories) | Free (US/territories) | Free (7 days) | — | — | — |
| [WeatherAPI.com](sources/weatherapi.md) | Free | Free | Free | Free (up to 14 days) | Free (limited) | Paid (Starter+) |
| [OpenWeather](sources/openweather.md) | Free / paid† | Free / paid† | Free / paid† | Paid† | Free† | — |
| [Tomorrow.io](sources/tomorrow-io.md) | Free‡ | Free‡ | Free‡ | — (5 days) | Paid‡ | — |
| [Visual Crossing](sources/visual-crossing.md) | Free§ | Free§ | Free§ | Free§ (up to 15 days) | Paid§ | — |
| [Ambee](sources/ambee.md) | Paid / quote | Paid / quote | Paid / quote | Paid / quote | Paid / quote | Paid / quote |
| [Google Maps Platform](sources/google-maps-platform.md) | — | — | — | — | Paid (Air Quality API) | Paid (Pollen API; up to 5 days) |
| [AirNow](sources/airnow.md) | — | — | — | — | Free (US, forecast/current) | — |

\* Open-Meteo’s no-key service is free for non-commercial use; commercial users need the customer service/pricing arrangement.  
† OpenWeather sells several forecast products. Its current product page advertises a free 4-day/hourly forecast and Air Pollution API; confirm the exact plan/product before implementation, especially for 8/10-day and daily forecasts.  
‡ Tomorrow.io documents hourly forecasts through 120 hours and daily through 5 days; availability, fields, and limits vary by plan.  
§ Visual Crossing documents anonymous, fair-use access. Registered/paid usage is appropriate when a guaranteed allowance, support, or higher volume is needed.

## Practical shortlist

1. **Commercial global MVP, weather only:** Start with WeatherAPI.com if its stated free commercial allowance fits projected traffic. It returns daily and hourly data through 14 days from one forecast endpoint.
2. **Non-commercial prototype:** Open-Meteo returns global hourly and daily forecasts through 16 days and has a separate air-quality API. Confirm commercial licensing before launch.
3. **US-first product:** Use NWS for forecasts and alerts, AirNow for air quality, and Google Pollen or a commercial pollen provider for allergies.
4. **One vendor for weather, air, and pollen:** WeatherAPI.com covers all three, though pollen needs Starter or above. Use Ambee instead if its environmental and pollen data justify a sales-led agreement.
5. **Radar later:** Evaluate WeatherAPI.com (Pro+), Visual Crossing (radar elements/maps), and map vendors separately. Radar imagery licensing, tiles, and attribution differ from forecast APIs.

## Product-model notes

- Treat **today**, **5 day**, and **10 day** as views over daily forecast records, not distinct vendor integrations.
- Store forecast `issuedAt` / model-run metadata where available. A “10-day” display should explain that confidence declines with lead time.
- Make provider selection a server-side capability. Do not expose paid API keys in browser or mobile clients.
- Normalize units, weather-condition codes, local time zones, provider attribution, and `coverage`/`unavailable` states in your own provider adapter.
- “Allergies” is not interchangeable with air quality. AQI measures pollutants; pollen APIs provide pollen indexes/counts and sometimes plant-species and health guidance.

## Primary sources

- [Open-Meteo Forecast API](https://open-meteo.com/en/docs), [Air Quality API](https://open-meteo.com/en/docs/air-quality-api), [pricing](https://open-meteo.com/en/pricing)
- [NWS API documentation](https://www.weather.gov/documentation/services-web-api)
- [WeatherAPI.com documentation](https://www.weatherapi.com/docs/) and [pricing](https://www.weatherapi.com/pricing)
- [OpenWeather API catalog](https://openweathermap.org/api) and [pricing](https://openweathermap.org/price)
- [Tomorrow.io Forecast API](https://docs.tomorrow.io/reference/weather-forecast) and [free-plan limits](https://support.tomorrow.io/hc/en-us/articles/20273728362644-Free-API-Plan-Rate-Limits)
- [Visual Crossing Timeline API](https://www.visualcrossing.com/resources/documentation/weather-api/timeline-weather-api/) and [pricing](https://www.visualcrossing.com/weather-data-pricing/)
- [Ambee API documentation](https://docs.ambeedata.com/apis/overview)
- [Google Air Quality API](https://developers.google.com/maps/documentation/air-quality) and [Pollen API](https://developers.google.com/maps/documentation/pollen/overview)
- [AirNow API](https://docs.airnowapi.org/)
