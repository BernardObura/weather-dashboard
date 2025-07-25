import { Sunrise, Sunset, Droplets, Wind, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getWeatherDescription } from '../services/weatherApi';

const ForecastCard = ({ forecastData }) => {
  if (!forecastData || !forecastData.daily) {
    return null;
  }

  const { daily, daily_units } = forecastData;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
    }
  };

  const formatTime = (timeString) => {
    return new Date(timeString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">5-Day Forecast</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {daily.time.map((date, index) => {
            const weather = getWeatherDescription(daily.weather_code[index]);
            
            return (
              <div 
                key={index} 
                className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
              >
                {/* Date and Weather */}
                <div className="flex items-center space-x-4 flex-1">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-sm md:text-base">
                      {formatDate(date)}
                    </p>
                    <p className="text-xs md:text-sm text-muted-foreground truncate">
                      {weather.description}
                    </p>
                  </div>
                  <div className="text-2xl md:text-3xl">
                    {weather.icon}
                  </div>
                </div>

                {/* Temperature */}
                <div className="text-right min-w-0 flex-shrink-0 ml-4">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-lg">
                      {Math.round(daily.temperature_2m_max[index])}°
                    </span>
                    <span className="text-muted-foreground">
                      {Math.round(daily.temperature_2m_min[index])}°
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Daily Information */}
        <div className="mt-6 space-y-4">
          <h4 className="font-semibold text-lg">Today's Details</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Sunrise */}
            <div className="flex items-center space-x-2 p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
              <Sunrise className="h-4 w-4 text-orange-500" />
              <div>
                <p className="text-xs text-muted-foreground">Sunrise</p>
                <p className="font-semibold text-sm">
                  {formatTime(daily.sunrise[0])}
                </p>
              </div>
            </div>

            {/* Sunset */}
            <div className="flex items-center space-x-2 p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
              <Sunset className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-xs text-muted-foreground">Sunset</p>
                <p className="font-semibold text-sm">
                  {formatTime(daily.sunset[0])}
                </p>
              </div>
            </div>

            {/* Precipitation */}
            <div className="flex items-center space-x-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <Droplets className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-xs text-muted-foreground">Rain</p>
                <p className="font-semibold text-sm">
                  {daily.precipitation_sum[0]} {daily_units.precipitation_sum}
                </p>
              </div>
            </div>

            {/* Wind */}
            <div className="flex items-center space-x-2 p-3 bg-gray-50 dark:bg-gray-950/20 rounded-lg">
              <Wind className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-xs text-muted-foreground">Wind</p>
                <p className="font-semibold text-sm">
                  {Math.round(daily.wind_speed_10m_max[0])} {daily_units.wind_speed_10m_max}
                </p>
              </div>
            </div>

            {/* UV Index */}
            <div className="flex items-center space-x-2 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
              <Eye className="h-4 w-4 text-yellow-500" />
              <div>
                <p className="text-xs text-muted-foreground">UV Index</p>
                <p className="font-semibold text-sm">
                  {Math.round(daily.uv_index_max[0])}
                </p>
              </div>
            </div>

            {/* Precipitation Probability */}
            <div className="flex items-center space-x-2 p-3 bg-indigo-50 dark:bg-indigo-950/20 rounded-lg">
              <Droplets className="h-4 w-4 text-indigo-500" />
              <div>
                <p className="text-xs text-muted-foreground">Rain Chance</p>
                <p className="font-semibold text-sm">
                  {daily.precipitation_probability_max[0]}%
                </p>
              </div>
            </div>

            {/* Daylight Duration */}
            <div className="flex items-center space-x-2 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
              <Sunrise className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-xs text-muted-foreground">Daylight</p>
                <p className="font-semibold text-sm">
                  {Math.round(daily.daylight_duration[0] / 3600)}h
                </p>
              </div>
            </div>

            {/* Sunshine Duration */}
            <div className="flex items-center space-x-2 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg">
              <Sunrise className="h-4 w-4 text-amber-500" />
              <div>
                <p className="text-xs text-muted-foreground">Sunshine</p>
                <p className="font-semibold text-sm">
                  {Math.round(daily.sunshine_duration[0] / 3600)}h
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ForecastCard;

