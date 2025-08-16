# Weather App - Fully Responsive Weather Application

A modern, fully responsive weather application built with React, featuring real-time weather data, interactive charts, and a beautiful dark/light theme toggle.

## 🌟 Live Demo

**Deployed Application:** https://weather-dashboard-bernardobura.vercel.app/
**Local Development:** http://localhost:5173

## ✨ Features

### 🔍 City Search
- **Smart Search**: Type any city name with real-time autocomplete suggestions
- **Location Detection**: Use current location button for instant local weather
- **Global Coverage**: Search for cities worldwide with country and region information

### 🌤️ Current Weather Display
- **Real-time Data**: Current temperature, weather conditions, and "feels like" temperature
- **Detailed Metrics**: Humidity, wind speed, pressure, cloud cover, wind direction
- **Weather Icons**: Beautiful weather condition icons with day/night variations
- **Location Info**: City, region, country, and current date/time

### 📊 Interactive Data Visualizations
- **Temperature Trends**: 24-hour temperature chart with smooth line graphs
- **Precipitation & Humidity**: Combined chart showing rain probability and humidity levels
- **Wind & Pressure**: Dual-axis chart displaying wind speed and atmospheric pressure
- **Daily Overview**: 5-day temperature overview with max/min bars and summary statistics

### 📅 5-Day Forecast
- **Daily Summaries**: Weather conditions, high/low temperatures, and weather icons
- **Detailed Information**: Weather descriptions and temperature ranges
- **Visual Design**: Clean card-based layout with intuitive weather icons

### 🎨 Theme Toggle
- **Light/Dark Mode**: Seamless switching between light and dark themes
- **Persistent Settings**: Theme preference saved in localStorage
- **System Detection**: Automatically detects system theme preference on first visit
- **Smooth Transitions**: Beautiful animations when switching themes

### 📱 Responsive Design
- **Mobile-First**: Optimized for mobile devices with touch-friendly interactions
- **Tablet Support**: Perfect layout adaptation for tablet screens
- **Desktop Experience**: Full-featured desktop interface with optimal spacing
- **Cross-Browser**: Compatible with all modern browsers

## 🛠️ Technology Stack

- **Frontend Framework**: React 18 with Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui component library
- **Charts**: Recharts for interactive data visualizations
- **Icons**: Lucide React for beautiful, consistent icons
- **API**: Open-Meteo API for weather data (no API key required)
- **Geocoding**: Open-Meteo Geocoding API for city search

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd weather-app
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start development server**
   ```bash
   pnpm run dev
   # or
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:5173`

### Building for Production

```bash
pnpm run build
# or
npm run build
```

## 📁 Project Structure

```
weather-app/
├── src/
│   ├── components/
│   │   ├── CitySearch.jsx          # City search with autocomplete
│   │   ├── CurrentWeather.jsx      # Current weather display
│   │   ├── ForecastCard.jsx        # 5-day forecast component
│   │   ├── WeatherCharts.jsx       # Interactive charts
│   │   └── ThemeToggle.jsx         # Dark/light theme toggle
│   ├── services/
│   │   └── weatherApi.js           # API service functions
│   ├── App.jsx                     # Main application component
│   ├── App.css                     # Global styles
│   └── main.jsx                    # Application entry point
├── public/                         # Static assets
├── index.html                      # HTML template
└── README.md                       # This file
```

## 🎯 Key Features Implemented

### ✅ Core Requirements
- [x] City search with autocomplete suggestions
- [x] Real-time weather data fetching
- [x] Current weather display with all metrics
- [x] 5-day forecast with daily summaries
- [x] Fully responsive design (mobile, tablet, desktop)
- [x] Light/dark theme toggle with persistence
- [x] Interactive data visualizations

### ✅ Bonus Features
- [x] Auto-detect user location option
- [x] Recent searches functionality (via autocomplete)
- [x] Sunrise/sunset times and weather descriptions
- [x] Smooth animations and transitions
- [x] Loading states and error handling
- [x] Weather icons with day/night variations
- [x] Multiple chart types (temperature, precipitation, wind, daily overview)

## 🌐 API Integration

The application uses the **Open-Meteo API**, which provides:
- Free access without API keys
- High-quality weather data
- Global coverage
- Real-time and forecast data
- Geocoding for city search

### API Endpoints Used:
- **Current Weather**: `https://api.open-meteo.com/v1/forecast`
- **Geocoding**: `https://geocoding-api.open-meteo.com/v1/search`
- **Hourly Forecast**: For detailed charts and trends

## 🎨 Design Features

### Color Palette
- **Light Theme**: Blue gradients with white cards and subtle shadows
- **Dark Theme**: Dark gradients with charcoal cards and blue accents
- **Accent Colors**: Blue primary, with weather-specific colors for charts

### Typography
- **Font Family**: System fonts for optimal performance
- **Hierarchy**: Clear heading sizes and text weights
- **Readability**: High contrast ratios in both themes

### Animations
- **Page Transitions**: Smooth fade-in animations for content
- **Loading States**: Spinning indicators and skeleton loading
- **Theme Toggle**: Smooth icon transitions and color changes
- **Chart Interactions**: Hover effects and smooth data transitions

## 📱 Responsive Breakpoints

- **Mobile**: 320px - 768px (optimized for phones)
- **Tablet**: 768px - 1024px (optimized for tablets)
- **Desktop**: 1024px+ (full desktop experience)

## 🔧 Performance Optimizations

- **Code Splitting**: Automatic code splitting with Vite
- **Lazy Loading**: Components loaded on demand
- **API Caching**: Efficient data fetching and caching
- **Image Optimization**: Optimized weather icons and assets
- **Bundle Size**: Minimal dependencies for fast loading

## 🌟 User Experience Features

- **Intuitive Navigation**: Clear visual hierarchy and navigation
- **Accessibility**: Keyboard navigation and screen reader support
- **Error Handling**: Graceful error messages and retry options
- **Loading States**: Clear feedback during data fetching
- **Offline Handling**: Graceful degradation when offline

## 🚀 Deployment

The application is deployed using modern hosting platforms with:
- **Automatic Builds**: CI/CD pipeline for seamless deployments
- **CDN Distribution**: Fast global content delivery
- **HTTPS**: Secure connections for all users
- **Performance Monitoring**: Real-time performance tracking

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Built with ❤️ using React, Tailwind CSS, shadcn/ui, and Recharts**

