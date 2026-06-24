# Weather Dashboard Application

A modern, responsive weather dashboard that fetches real-time weather data from the Open-Meteo API (free, no API key required). Get accurate weather information for any location in the world.

## Features

✅ **Real-time Weather Data** - Fetch current weather for any city worldwide
✅ **Detailed Metrics** - Temperature, humidity, wind speed, pressure, visibility, and precipitation
✅ **Hourly Forecast** - View weather conditions for the next 12 hours
✅ **Weather Icons** - Visual representation of weather conditions with emoji icons
✅ **Quick Search** - Pre-configured buttons for popular cities
✅ **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
✅ **Error Handling** - Graceful error messages for invalid searches
✅ **Loading States** - User-friendly loading spinner during data fetch
✅ **Timezone Support** - Displays time in the location's local timezone
✅ **Beautiful UI** - Modern gradient design with smooth animations

## How to Use

### Getting Started
1. Open `weather.html` in your web browser
2. You'll see a welcome screen with search options

### Searching for Weather
**Method 1: Manual Search**
- Type a city name in the search box
- Click "Search" or press Enter
- Weather data will load and display

**Method 2: Quick Search**
- Click one of the pre-configured city buttons (New York, London, Tokyo, Paris)
- Weather data will instantly load for that city

### Understanding the Display

#### Main Weather Card
- **Large Temperature Display** - Current temperature in Celsius
- **Weather Icon** - Visual representation of weather conditions
- **Weather Description** - Text describing the weather (e.g., "Partly Cloudy")
- **Location & Time** - City name and current time in local timezone

#### Weather Details Grid (4 items)
- **Humidity** - Percentage of moisture in the air
- **Wind Speed** - Wind speed in km/h
- **Feels Like** - Apparent temperature based on wind and humidity
- **Pressure** - Atmospheric pressure in hPa

#### Weather Stats Box (4 items)
- **Max Temp** - Highest temperature today
- **Min Temp** - Lowest temperature today
- **Visibility** - How far you can see (in km)
- **Precipitation** - Amount of rain/snow in mm

#### Hourly Forecast
- Next 12 hours of weather predictions
- Shows time, weather icon, and temperature for each hour

## Technical Details

### APIs Used
- **Open-Meteo Geocoding API** - Convert city names to coordinates
- **Open-Meteo Weather API** - Fetch current and hourly weather data
- **No API Key Required** - Completely free service

### Technologies
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with gradients, animations, and flexbox/grid
- **JavaScript (ES6+)** - Async/await, fetch API, DOM manipulation

### Browser Compatibility
- Chrome, Firefox, Safari, Edge (all modern versions)
- Requires JavaScript enabled
- Works on all devices (desktop, tablet, mobile)

## File Structure

```
├── weather.html           # Main HTML file
├── weather-style.css      # Styling and layout
├── weather-script.js      # JavaScript functionality
└── weather-readme.md      # Documentation
```

## Key Features Explained

### Weather Code Mapping
The application uses WMO Weather Codes to determine weather conditions:
- **0** - Clear sky
- **1-3** - Partly cloudy to overcast
- **45-48** - Foggy
- **51-55** - Drizzle
- **61-65** - Rain
- **71-75** - Snow
- **80-82** - Rain showers
- **85-86** - Snow showers
- **95-99** - Thunderstorms

### Main Functions

#### `searchWeather()`
Handles the search process:
1. Gets city name from input
2. Geocodes city to coordinates
3. Fetches weather data
4. Displays results

#### `geocodeCity(city)`
Converts city name to latitude/longitude coordinates using the Geocoding API

#### `fetchWeatherData(lat, lon, cityInfo)`
Fetches current weather and hourly forecast from the Open-Meteo API

#### `displayWeather(data)`
Populates the UI with weather information

#### `displayHourlyForecast(hourly, currentTime, timezone)`
Generates the hourly forecast cards

#### `getWeatherIcon(code)`
Returns appropriate emoji icon based on WMO weather code

## Tips & Tricks

💡 **Pro Tips:**
- Search supports any city worldwide, not just major cities
- Hourly forecast automatically skips past hours and shows future conditions
- Weather descriptions are human-readable and detailed
- Quick search buttons are customizable - modify the city names as needed
- All times are displayed in the location's local timezone
- The app gracefully handles search errors with helpful messages

## Search Examples

Try searching for:
- Major cities: "New York", "London", "Tokyo"
- Small towns: "Boulder", "Stonington"
- International cities: "Bangkok", "Barcelona", "Cairo"
- With states/regions: "Austin, Texas" (sometimes helps with disambiguation)

## API Rate Limits

Open-Meteo has generous rate limits:
- **Free tier**: Unlimited API calls
- **No authentication** required
- **Fast responses** with multiple data formats

## Data Refresh

- Weather data is fetched fresh each time you search
- Forecasts are updated based on the latest available data
- Typically accurate for 10-14 days ahead

## Future Enhancements

Potential features for future versions:
- Multi-day forecast (5-day, 10-day, 14-day)
- Air quality index (AQI)
- UV index and sunrise/sunset times
- Wind direction (not just speed)
- Historical weather data
- Weather alerts and warnings
- Dark mode theme
- Saved favorite locations
- Weather comparison between cities
- Map integration
- Temperature unit toggle (°F, °K)
- Push notifications for weather changes

## Browser Storage

Currently, the app doesn't store search history, but you could add:
- LocalStorage for saved favorite cities
- Recent search history
- User preferences (temperature units, theme, etc.)

## Troubleshooting

### "City not found" Error
- Check spelling of city name
- Try searching for a nearby major city
- Try with state/region name
- Ensure internet connection is stable

### No Data Appearing
- Check browser console for errors (F12)
- Ensure JavaScript is enabled
- Try a different city name
- Refresh the page

### Slow Loading
- Check internet connection speed
- Ensure Open-Meteo API is accessible in your region
- Try again after a few moments

## License

MIT License - Free to use and modify for any purpose

## API Credits

- **Weather Data**: [Open-Meteo](https://open-meteo.com/)
- **Geocoding**: [Open-Meteo Geocoding API](https://open-meteo.com/)

## Support

If you encounter issues or have feature suggestions, please feel free to:
- Check the console for error messages (F12 → Console)
- Verify your internet connection
- Try different city names
- Clear browser cache and retry

---

**Enjoy using the Weather Dashboard! 🌤️⛅🌧️**
