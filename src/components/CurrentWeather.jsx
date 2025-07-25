import { format } from 'date-fns';
import { Thermometer, Droplets, Wind, Eye, Gauge, Sun, Moon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getWeatherDescription } from '../services/weatherApi';

const CurrentWeather = ({ weatherData, locationData }) => {
  if (!weatherData || !weatherData.current) {
    return null;
  }

  const { current, current_units } = weatherData;
  const weather = getWeatherDescription(current.weather_code);
  
  // Format time and date using date-fns
  const currentTime = new Date(current.time);
  const formattedDate = format(currentTime, 'EEEE, MMMM dd, yyyy');
  const formattedTime = format(currentTime, 'h:mm a');

  return (
    <Card className="w-full">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold">
          {locationData?.name || 'Current Location'}
        </CardTitle>
        {locationData?.country && (
          <p className="text-muted-foreground">
            {locationData.admin1 && `${locationData.admin1}, `}{locationData.country}
          </p>
        )}
        <p className="text-sm text-muted-foreground">
          {formattedDate} • {formattedTime}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Main Temperature Display */}
        <div className="text-center space-y-2">
          <div className="text-6xl font-bold">
            {Math.round(current.temperature_2m)}°
          </div>
          <div className="flex items-center justify-center space-x-2">
            <span className="text-4xl">{weather.icon}</span>
            <span className="text-xl text-muted-foreground">{weather.description}</span>
          </div>
          <p className="text-muted-foreground">
            Feels like {Math.round(current.apparent_temperature)}°{current_units.apparent_temperature}
          </p>
        </div>

        {/* Weather Details Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {/* Humidity */}
          <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
            <Droplets className="h-5 w-5 text-blue-500" />
            <div>
              <p className="text-sm text-muted-foreground">Humidity</p>
              <p className="font-semibold">{current.relative_humidity_2m}%</p>
            </div>
          </div>

          {/* Wind Speed */}
          <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
            <Wind className="h-5 w-5 text-gray-500" />
            <div>
              <p className="text-sm text-muted-foreground">Wind</p>
              <p className="font-semibold">
                {Math.round(current.wind_speed_10m)} {current_units.wind_speed_10m}
              </p>
            </div>
          </div>

          {/* Pressure */}
          <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
            <Gauge className="h-5 w-5 text-purple-500" />
            <div>
              <p className="text-sm text-muted-foreground">Pressure</p>
              <p className="font-semibold">
                {Math.round(current.pressure_msl)} {current_units.pressure_msl}
              </p>
            </div>
          </div>

          {/* Cloud Cover */}
          <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
            <Eye className="h-5 w-5 text-indigo-500" />
            <div>
              <p className="text-sm text-muted-foreground">Cloud Cover</p>
              <p className="font-semibold">{current.cloud_cover}%</p>
            </div>
          </div>

          {/* Wind Direction */}
          <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
            <div 
              className="h-5 w-5 text-gray-500"
              style={{ 
                transform: `rotate(${current.wind_direction_10m}deg)`,
                transition: 'transform 0.3s ease'
              }}
            >
              ↑
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Wind Dir</p>
              <p className="font-semibold">{current.wind_direction_10m}°</p>
            </div>
          </div>

          {/* Day/Night Indicator */}
          <div className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
            {current.is_day ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <Moon className="h-5 w-5 text-blue-400" />
            )}
            <div>
              <p className="text-sm text-muted-foreground">Time</p>
              <p className="font-semibold">{current.is_day ? 'Day' : 'Night'}</p>
            </div>
          </div>
        </div>

        {/* Precipitation Info */}
        {(current.precipitation > 0 || current.rain > 0 || current.snowfall > 0) && (
          <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Precipitation</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {current.precipitation > 0 && (
                <div>
                  <span className="text-muted-foreground">Total: </span>
                  <span className="font-medium">{current.precipitation} {current_units.precipitation}</span>
                </div>
              )}
              {current.rain > 0 && (
                <div>
                  <span className="text-muted-foreground">Rain: </span>
                  <span className="font-medium">{current.rain} {current_units.rain}</span>
                </div>
              )}
              {current.snowfall > 0 && (
                <div>
                  <span className="text-muted-foreground">Snow: </span>
                  <span className="font-medium">{current.snowfall} {current_units.snowfall}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CurrentWeather;

