// Weather API service using Open-Meteo API (no API key required)
const BASE_URL = 'https://api.open-meteo.com/v1';
const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1';

// Get coordinates for a city name
export const getCoordinates = async (cityName) => {
  try {
    const response = await fetch(
      `${GEOCODING_URL}/search?name=${encodeURIComponent(cityName)}&count=5&language=en&format=json`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch coordinates');
    }
    
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    throw error;
  }
};

// Get current weather data
export const getCurrentWeather = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&timezone=auto`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch current weather');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    throw error;
  }
};

// Get 5-day forecast
export const getForecast = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,shortwave_radiation_sum&timezone=auto&forecast_days=5`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch forecast');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    throw error;
  }
};

// Get hourly forecast for charts (next 5 days)
export const getHourlyForecast = async (latitude, longitude) => {
  try {
    const response = await fetch(
      `${BASE_URL}/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,rain,showers,snowfall,weather_code,pressure_msl,cloud_cover,visibility,wind_speed_10m,wind_direction_10m,wind_gusts_10m,temperature_80m,soil_temperature_0cm&timezone=auto&forecast_days=5`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch hourly forecast');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching hourly forecast:', error);
    throw error;
  }
};

// Weather code descriptions (WMO Weather interpretation codes)
export const getWeatherDescription = (code) => {
  const weatherCodes = {
    0: { description: 'Clear sky', icon: '☀️' },
    1: { description: 'Mainly clear', icon: '🌤️' },
    2: { description: 'Partly cloudy', icon: '⛅' },
    3: { description: 'Overcast', icon: '☁️' },
    45: { description: 'Fog', icon: '🌫️' },
    48: { description: 'Depositing rime fog', icon: '🌫️' },
    51: { description: 'Light drizzle', icon: '🌦️' },
    53: { description: 'Moderate drizzle', icon: '🌦️' },
    55: { description: 'Dense drizzle', icon: '🌦️' },
    56: { description: 'Light freezing drizzle', icon: '🌦️' },
    57: { description: 'Dense freezing drizzle', icon: '🌦️' },
    61: { description: 'Slight rain', icon: '🌧️' },
    63: { description: 'Moderate rain', icon: '🌧️' },
    65: { description: 'Heavy rain', icon: '🌧️' },
    66: { description: 'Light freezing rain', icon: '🌧️' },
    67: { description: 'Heavy freezing rain', icon: '🌧️' },
    71: { description: 'Slight snow fall', icon: '🌨️' },
    73: { description: 'Moderate snow fall', icon: '🌨️' },
    75: { description: 'Heavy snow fall', icon: '🌨️' },
    77: { description: 'Snow grains', icon: '🌨️' },
    80: { description: 'Slight rain showers', icon: '🌦️' },
    81: { description: 'Moderate rain showers', icon: '🌦️' },
    82: { description: 'Violent rain showers', icon: '🌦️' },
    85: { description: 'Slight snow showers', icon: '🌨️' },
    86: { description: 'Heavy snow showers', icon: '🌨️' },
    95: { description: 'Thunderstorm', icon: '⛈️' },
    96: { description: 'Thunderstorm with slight hail', icon: '⛈️' },
    99: { description: 'Thunderstorm with heavy hail', icon: '⛈️' }
  };
  
  return weatherCodes[code] || { description: 'Unknown', icon: '❓' };
};

// Get user's current location
export const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        reject(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  });
};

