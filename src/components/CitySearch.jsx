import { useState, useEffect } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getCoordinates, getCurrentLocation } from '../services/weatherApi';

const CitySearch = ({ onLocationSelect, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Debounced search for city suggestions
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchTerm.length >= 2) {
        setIsSearching(true);
        try {
          const results = await getCoordinates(searchTerm);
          setSuggestions(results.slice(0, 5)); // Limit to 5 suggestions
          setShowSuggestions(true);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
          setSuggestions([]);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleLocationSelect = (location) => {
    setSearchTerm(location.name + (location.admin1 ? `, ${location.admin1}` : '') + (location.country ? `, ${location.country}` : ''));
    setShowSuggestions(false);
    onLocationSelect({
      latitude: location.latitude,
      longitude: location.longitude,
      name: location.name,
      country: location.country,
      admin1: location.admin1
    });
  };

  const handleCurrentLocation = async () => {
    try {
      const coords = await getCurrentLocation();
      onLocationSelect({
        latitude: coords.latitude,
        longitude: coords.longitude,
        name: 'Current Location',
        country: '',
        admin1: ''
      });
      setSearchTerm('Current Location');
    } catch (error) {
      console.error('Error getting current location:', error);
      alert('Unable to get your current location. Please search for a city instead.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      handleLocationSelect(suggestions[0]);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search for a city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            className="pl-10 pr-12"
            disabled={isLoading}
          />
          {isSearching && (
            <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
          )}
        </div>
      </form>

      {/* Current Location Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={handleCurrentLocation}
        disabled={isLoading}
        className="mt-2 w-full"
      >
        <MapPin className="h-4 w-4 mr-2" />
        Use Current Location
      </Button>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleLocationSelect(suggestion)}
              className="w-full text-left px-4 py-2 hover:bg-accent hover:text-accent-foreground transition-colors border-b border-border last:border-b-0"
            >
              <div className="font-medium">
                {suggestion.name}
                {suggestion.admin1 && `, ${suggestion.admin1}`}
              </div>
              <div className="text-sm text-muted-foreground">
                {suggestion.country}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CitySearch;

