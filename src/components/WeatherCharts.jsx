import { useState } from 'react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Droplets, Wind, Eye, Thermometer } from 'lucide-react';

const WeatherCharts = ({ hourlyData, dailyData }) => {
  const [activeChart, setActiveChart] = useState('temperature');

  if (!hourlyData || !dailyData) {
    return null;
  }

  // Prepare hourly data for charts (next 24 hours)
  const next24Hours = hourlyData.hourly.time.slice(0, 24).map((time, index) => {
    const date = new Date(time);
    return {
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      fullTime: time,
      temperature: Math.round(hourlyData.hourly.temperature_2m[index]),
      humidity: hourlyData.hourly.relative_humidity_2m[index],
      windSpeed: Math.round(hourlyData.hourly.wind_speed_10m[index]),
      pressure: Math.round(hourlyData.hourly.pressure_msl[index]),
      precipitation: hourlyData.hourly.precipitation_probability[index],
      cloudCover: hourlyData.hourly.cloud_cover[index]
    };
  });

  // Prepare daily data for charts (5 days)
  const dailyChartData = dailyData.daily.time.map((date, index) => {
    const dateObj = new Date(date);
    return {
      date: dateObj.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }),
      fullDate: date,
      maxTemp: Math.round(dailyData.daily.temperature_2m_max[index]),
      minTemp: Math.round(dailyData.daily.temperature_2m_min[index]),
      precipitation: dailyData.daily.precipitation_sum[index],
      windSpeed: Math.round(dailyData.daily.wind_speed_10m_max[index]),
      uvIndex: Math.round(dailyData.daily.uv_index_max[index]),
      sunshineHours: Math.round(dailyData.daily.sunshine_duration[index] / 3600)
    };
  });

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="font-semibold text-card-foreground">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value}{entry.unit || ''}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const chartButtons = [
    { id: 'temperature', label: 'Temperature', icon: Thermometer },
    { id: 'precipitation', label: 'Precipitation', icon: Droplets },
    { id: 'wind', label: 'Wind & Pressure', icon: Wind },
    { id: 'daily', label: 'Daily Overview', icon: TrendingUp }
  ];

  const renderChart = () => {
    switch (activeChart) {
      case 'temperature':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={next24Hours}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 12 }}
                interval="preserveStartEnd"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                label={{ value: '°C', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="temperature" 
                stroke="#3b82f6" 
                strokeWidth={3}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
                name="Temperature"
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'precipitation':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={next24Hours}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 12 }}
                interval="preserveStartEnd"
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                label={{ value: '%', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area 
                type="monotone" 
                dataKey="precipitation" 
                stroke="#06b6d4" 
                fill="#06b6d4" 
                fillOpacity={0.3}
                name="Rain Chance"
                unit="%"
              />
              <Area 
                type="monotone" 
                dataKey="humidity" 
                stroke="#8b5cf6" 
                fill="#8b5cf6" 
                fillOpacity={0.2}
                name="Humidity"
                unit="%"
              />
            </AreaChart>
          </ResponsiveContainer>
        );

      case 'wind':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={next24Hours}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="time" 
                tick={{ fontSize: 12 }}
                interval="preserveStartEnd"
              />
              <YAxis 
                yAxisId="wind"
                tick={{ fontSize: 12 }}
                label={{ value: 'km/h', angle: -90, position: 'insideLeft' }}
              />
              <YAxis 
                yAxisId="pressure"
                orientation="right"
                tick={{ fontSize: 12 }}
                label={{ value: 'hPa', angle: 90, position: 'insideRight' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                yAxisId="wind"
                type="monotone" 
                dataKey="windSpeed" 
                stroke="#10b981" 
                strokeWidth={2}
                name="Wind Speed"
                unit=" km/h"
              />
              <Line 
                yAxisId="pressure"
                type="monotone" 
                dataKey="pressure" 
                stroke="#f59e0b" 
                strokeWidth={2}
                name="Pressure"
                unit=" hPa"
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'daily':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyChartData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis 
                dataKey="date" 
                tick={{ fontSize: 12 }}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                label={{ value: '°C', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar 
                dataKey="maxTemp" 
                fill="#ef4444" 
                name="Max Temp"
                unit="°C"
                radius={[2, 2, 0, 0]}
              />
              <Bar 
                dataKey="minTemp" 
                fill="#3b82f6" 
                name="Min Temp"
                unit="°C"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  const getChartTitle = () => {
    switch (activeChart) {
      case 'temperature':
        return 'Temperature Trend (Next 24 Hours)';
      case 'precipitation':
        return 'Precipitation & Humidity (Next 24 Hours)';
      case 'wind':
        return 'Wind Speed & Pressure (Next 24 Hours)';
      case 'daily':
        return '5-Day Temperature Overview';
      default:
        return 'Weather Data';
    }
  };

  const getChartDescription = () => {
    switch (activeChart) {
      case 'temperature':
        return 'Hourly temperature changes for the next 24 hours';
      case 'precipitation':
        return 'Rain probability and humidity levels throughout the day';
      case 'wind':
        return 'Wind speed and atmospheric pressure variations';
      case 'daily':
        return 'Daily maximum and minimum temperatures for the next 5 days';
      default:
        return '';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="h-5 w-5" />
          <span>Weather Analytics</span>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Interactive charts showing weather trends and patterns
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Chart Selection Buttons */}
        <div className="flex flex-wrap gap-2">
          {chartButtons.map((button) => {
            const Icon = button.icon;
            return (
              <Button
                key={button.id}
                variant={activeChart === button.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveChart(button.id)}
                className="flex items-center space-x-2"
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{button.label}</span>
              </Button>
            );
          })}
        </div>

        {/* Chart Display */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold">{getChartTitle()}</h3>
            <p className="text-sm text-muted-foreground">{getChartDescription()}</p>
          </div>
          
          <div className="w-full h-[300px] bg-muted/20 rounded-lg p-4">
            {renderChart()}
          </div>
        </div>

        {/* Additional Stats for Daily Chart */}
        {activeChart === 'daily' && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="text-center p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <p className="text-sm text-muted-foreground">Avg Max Temp</p>
              <p className="text-lg font-semibold">
                {Math.round(dailyChartData.reduce((sum, day) => sum + day.maxTemp, 0) / dailyChartData.length)}°C
              </p>
            </div>
            <div className="text-center p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
              <p className="text-sm text-muted-foreground">Avg Min Temp</p>
              <p className="text-lg font-semibold">
                {Math.round(dailyChartData.reduce((sum, day) => sum + day.minTemp, 0) / dailyChartData.length)}°C
              </p>
            </div>
            <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
              <p className="text-sm text-muted-foreground">Total Rain</p>
              <p className="text-lg font-semibold">
                {dailyChartData.reduce((sum, day) => sum + day.precipitation, 0).toFixed(1)} mm
              </p>
            </div>
            <div className="text-center p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
              <p className="text-sm text-muted-foreground">Avg Wind</p>
              <p className="text-lg font-semibold">
                {Math.round(dailyChartData.reduce((sum, day) => sum + day.windSpeed, 0) / dailyChartData.length)} km/h
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherCharts;

