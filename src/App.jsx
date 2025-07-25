import { useState, useEffect } from 'react';
import { Cloud, Loader2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import CitySearch from './components/CitySearch';
import CurrentWeather from './components/CurrentWeather';
import ForecastCard from './components/ForecastCard';
import WeatherCharts from './components/WeatherCharts';
import ThemeToggle from './components/ThemeToggle';
import { getCurrentWeather, getForecast, getHourlyForecast } from './services/weatherApi';
import './App.css';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [hourlyForecast, setHourlyForecast] = useState(null);
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load weather data for a location
  const loadWeatherData = async (locationData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const [currentData, forecastData, hourlyData] = await Promise.all([
        getCurrentWeather(locationData.latitude, locationData.longitude),
        getForecast(locationData.latitude, locationData.longitude),
        getHourlyForecast(locationData.latitude, locationData.longitude)
      ]);
      
      setCurrentWeather(currentData);
      setForecast(forecastData);
      setHourlyForecast(hourlyData);
      setLocation(locationData);
    } catch (err) {
      setError('Failed to load weather data. Please try again.');
      console.error('Error loading weather data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Load default location (Nairobi) on app start
  useEffect(() => {
    const defaultLocation = {
      latitude: -1.286389,
      longitude: 36.817223,
      name: 'Nairobi',
      country: 'Kenya',
      admin1: 'Nairobi Area'
    };
    loadWeatherData(defaultLocation);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 transition-colors duration-300">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center space-x-2">
              <Cloud className="h-8 w-8 text-blue-500" />
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                Weather App
              </h1>
            </div>
            
            {/* Theme Toggle */}
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Search Section */}
        <section className="flex justify-center">
          <CitySearch onLocationSelect={loadWeatherData} isLoading={isLoading} />
        </section>

        {/* Error Display */}
        {error && (
          <Alert variant="destructive" className="max-w-md mx-auto animate-in slide-in-from-top-2 duration-300">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-4 animate-in fade-in duration-500">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-blue-500" />
              <p className="text-muted-foreground">Loading weather data...</p>
            </div>
          </div>
        )}

        {/* Weather Content */}
        {!isLoading && currentWeather && forecast && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Current Weather */}
            <section className="max-w-2xl mx-auto">
              <CurrentWeather 
                weatherData={currentWeather} 
                locationData={location} 
              />
            </section>

            {/* Weather Charts */}
            {hourlyForecast && (
              <section className="max-w-6xl mx-auto">
                <WeatherCharts 
                  hourlyData={hourlyForecast} 
                  dailyData={forecast} 
                />
              </section>
            )}

            {/* 5-Day Forecast */}
            <section className="max-w-4xl mx-auto">
              <ForecastCard forecastData={forecast} />
            </section>
          </div>
        )}

        {/* Welcome Message for First Time Users */}
        {!isLoading && !currentWeather && !error && (
          <div className="text-center py-12 space-y-4 animate-in fade-in duration-500">
            <Cloud className="h-16 w-16 mx-auto text-blue-500 opacity-50" />
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Welcome to Weather App
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Search for any city to get current weather conditions, interactive charts, and a 5-day forecast.
              You can also use your current location for instant weather updates.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 mt-16 transition-colors duration-300">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-muted-foreground">
            <p>Weather data provided by Open-Meteo API</p>
            <p className="mt-1">Built with React, Tailwind CSS, shadcn/ui, and Recharts</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
