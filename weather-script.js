// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const quickSearchBtns = document.querySelectorAll('.quick-search-btn');
const weatherCard = document.getElementById('weatherCard');
const errorMessage = document.getElementById('errorMessage');
const loadingSpinner = document.getElementById('loadingSpinner');
const forecastSection = document.getElementById('forecastSection');
const welcomeScreen = document.getElementById('welcomeScreen');
const hourlyForecast = document.getElementById('hourlyForecast');

// Weather Icons Mapping
const weatherIcons = {
    'clear': '☀️',
    'sunny': '☀️',
    'partly_cloudy': '⛅',
    'cloudy': '☁️',
    'overcast': '☁️',
    'rainy': '🌧️',
    'rain': '🌧️',
    'drizzle': '🌦️',
    'thunderstorm': '⛈️',
    'snow': '❄️',
    'windy': '💨',
    'foggy': '🌫️',
    'mist': '🌫️'
};

const weatherDescriptions = {
    0: 'Clear Sky',
    1: 'Mainly Clear',
    2: 'Partly Cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Depositing Rime Fog',
    51: 'Light Drizzle',
    53: 'Moderate Drizzle',
    55: 'Dense Drizzle',
    61: 'Slight Rain',
    63: 'Moderate Rain',
    65: 'Heavy Rain',
    71: 'Slight Snow',
    73: 'Moderate Snow',
    75: 'Heavy Snow',
    80: 'Slight Rain Showers',
    81: 'Moderate Rain Showers',
    82: 'Violent Rain Showers',
    85: 'Slight Snow Showers',
    86: 'Heavy Snow Showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with Slight Hail',
    99: 'Thunderstorm with Heavy Hail'
};

// Event Listeners
function init() {
    searchBtn.addEventListener('click', searchWeather);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchWeather();
        }
    });

    quickSearchBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            searchInput.value = btn.dataset.city;
            searchWeather();
        });
    });
}

// Get weather icon based on code
function getWeatherIcon(code) {
    const descriptions = Object.entries(weatherDescriptions);
    for (let [key, desc] of descriptions) {
        if (parseInt(key) === code) {
            if (code === 0) return '☀️';
            if (code <= 3) return code === 3 ? '☁️' : code === 2 ? '⛅' : '☀️';
            if (code === 45 || code === 48) return '🌫️';
            if (code >= 51 && code <= 55) return '🌦️';
            if (code >= 61 && code <= 65 || code >= 80 && code <= 82) return '🌧️';
            if (code >= 71 && code <= 75 || code >= 85 && code <= 86) return '❄️';
            if (code >= 80 && code <= 82) return '🌧️';
            if (code >= 95 && code <= 99) return '⛈️';
        }
    }
    return '🌤️';
}

// Geocode city name to coordinates
async function geocodeCity(city) {
    try {
        const response = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
        );
        const data = await response.json();

        if (!data.results || data.results.length === 0) {
            showError(`City "${city}" not found. Please try another city.`);
            return null;
        }

        const result = data.results[0];
        return {
            latitude: result.latitude,
            longitude: result.longitude,
            name: result.name,
            country: result.country,
            admin1: result.admin1 || ''
        };
    } catch (error) {
        showError('Error searching for city. Please try again.');
        return null;
    }
}

// Fetch weather data from Open-Meteo API
async function fetchWeatherData(latitude, longitude, cityInfo) {
    try {
        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code,humidity,wind_speed_10m,pressure_msl,is_day,apparent_temperature,visibility,precipitation&hourly=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();
        return {
            ...data,
            cityInfo: cityInfo
        };
    } catch (error) {
        showError('Error fetching weather data. Please try again.');
        return null;
    }
}

// Display weather data
function displayWeather(data) {
    const current = data.current;
    const daily = data.daily;
    const cityInfo = data.cityInfo;
    const timezone = data.timezone;

    // Update location info
    let cityDisplay = cityInfo.name;
    if (cityInfo.admin1) {
        cityDisplay += `, ${cityInfo.admin1}`;
    }
    if (cityInfo.country) {
        cityDisplay += `, ${cityInfo.country}`;
    }
    document.getElementById('cityName').textContent = cityDisplay;

    // Update time
    const now = new Date();
    document.getElementById('weatherTime').textContent = now.toLocaleString('en-US', {
        timeZone: timezone,
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    // Update weather icon
    const weatherCode = current.weather_code;
    document.getElementById('weatherIcon').textContent = getWeatherIcon(weatherCode);

    // Update temperature
    document.getElementById('temperature').textContent = Math.round(current.temperature_2m);

    // Update weather description
    const description = weatherDescriptions[weatherCode] || 'Unknown';
    document.getElementById('weatherDesc').textContent = description;

    // Update details
    document.getElementById('humidity').textContent = `${current.humidity}%`;
    document.getElementById('windSpeed').textContent = `${Math.round(current.wind_speed_10m)} km/h`;
    document.getElementById('feelsLike').textContent = `${Math.round(current.apparent_temperature)}°C`;
    document.getElementById('pressure').textContent = `${Math.round(current.pressure_msl)} hPa`;

    // Update stats
    document.getElementById('maxTemp').textContent = `${Math.round(daily.temperature_2m_max[0])}°C`;
    document.getElementById('minTemp').textContent = `${Math.round(daily.temperature_2m_min[0])}°C`;
    document.getElementById('visibility').textContent = `${Math.round(current.visibility / 1000)} km`;
    document.getElementById('precipitation').textContent = `${current.precipitation || 0} mm`;

    // Display hourly forecast
    displayHourlyForecast(data.hourly, data.current_time || new Date().toISOString(), timezone);

    // Show weather card and hide welcome screen
    weatherCard.classList.remove('hidden');
    forecastSection.classList.remove('hidden');
    welcomeScreen.classList.add('hidden');
}

// Display hourly forecast
function displayHourlyForecast(hourly, currentTime, timezone) {
    hourlyForecast.innerHTML = '';

    // Get current hour
    const now = new Date(currentTime);
    const currentHour = now.getHours();
    const currentDate = now.toISOString().split('T')[0];

    // Filter and display next 12 hours
    for (let i = 0; i < Math.min(12, hourly.time.length); i++) {
        const time = hourly.time[i];
        const temp = hourly.temperature_2m[i];
        const code = hourly.weather_code[i];

        const timeObj = new Date(time);
        const hour = timeObj.getHours();
        const dayDate = time.split('T')[0];
        
        // Skip past hours
        if (dayDate === currentDate && hour < currentHour) {
            continue;
        }

        const hourlyItem = document.createElement('div');
        hourlyItem.className = 'hourly-item';
        hourlyItem.innerHTML = `
            <div class="hourly-time">${timeObj.toLocaleString('en-US', { hour: 'numeric', hour12: true })}</div>
            <div class="hourly-icon">${getWeatherIcon(code)}</div>
            <div class="hourly-temp">${Math.round(temp)}°C</div>
        `;
        hourlyForecast.appendChild(hourlyItem);
    }
}

// Search weather
async function searchWeather() {
    const city = searchInput.value.trim();

    if (!city) {
        showError('Please enter a city name.');
        return;
    }

    clearError();
    showLoading();

    const cityInfo = await geocodeCity(city);
    if (!cityInfo) {
        hideLoading();
        return;
    }

    const weatherData = await fetchWeatherData(cityInfo.latitude, cityInfo.longitude, cityInfo);
    if (!weatherData) {
        hideLoading();
        return;
    }

    hideLoading();
    displayWeather(weatherData);
}

// UI Helper Functions
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

function clearError() {
    errorMessage.classList.add('hidden');
    errorMessage.textContent = '';
}

function showLoading() {
    loadingSpinner.classList.remove('hidden');
}

function hideLoading() {
    loadingSpinner.classList.add('hidden');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', init);
