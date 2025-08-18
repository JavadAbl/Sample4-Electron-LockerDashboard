import { useState, useEffect } from 'react';

const WeatherApp = () => {
  const [city, setCity] = useState('New York');
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mock weather data - in a real app, you would fetch from an API
  const mockWeatherData = {
    name: 'New York',
    main: {
      temp: 72,
      feels_like: 75,
      humidity: 65,
      pressure: 1013,
    },
    weather: [
      {
        main: 'Clear',
        description: 'clear sky',
        icon: '01d',
      },
    ],
    wind: {
      speed: 8.5,
    },
    sys: {
      country: 'US',
    },
  };

  // Function to fetch weather data
  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);

    try {
      // In a real app, you would use:
      // const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=imperial`);
      // const data = await response.json();

      // Using mock data for this example
      setTimeout(() => {
        setWeatherData(mockWeatherData);
        setLoading(false);
      }, 800);
    } catch (err) {
      setError('Failed to fetch weather data');
      setLoading(false);
    }
  };

  // Load weather data on component mount and when city changes
  useEffect(() => {
    fetchWeatherData();
  }, [city]);

  // Function to get weather icon URL
  const getWeatherIconUrl = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="flex justify-center items-center bg-gradient-to-br from-blue-50 to-cyan-100 p-4 min-h-screen">
      <div className="bg-white shadow-xl w-full max-w-md card">
        <div className="card-body">
          <h2 className="mb-6 font-bold text-2xl text-center card-title">Weather App</h2>

          {/* Search Form */}
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="join">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name"
                className="input-bordered w-full input join-item"
              />
              <button type="submit" className="btn btn-primary join-item" disabled={loading}>
                {loading ? <span className="loading loading-spinner"></span> : 'Search'}
              </button>
            </div>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mb-4 alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current w-6 h-6 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          )}

          {/* Weather Data */}
          {weatherData && !loading && (
            <div className="text-center">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-3xl">
                  {weatherData.name}, {weatherData.sys.country}
                </h3>
                {weatherData.weather[0] && (
                  <img
                    src={getWeatherIconUrl(weatherData.weather[0].icon)}
                    alt={weatherData.weather[0].description}
                    className="w-16 h-16"
                  />
                )}
              </div>

              <div className="mb-2 font-bold text-5xl">{Math.round(weatherData.main.temp)}°F</div>

              <div className="mb-6 text-gray-600 text-lg">
                {weatherData.weather[0].description.charAt(0).toUpperCase() +
                  weatherData.weather[0].description.slice(1)}
              </div>

              <div className="gap-4 grid grid-cols-2">
                <div className="bg-blue-50 p-3 rounded-lg stat">
                  <div className="text-gray-600 stat-title">Feels Like</div>
                  <div className="text-xl stat-value">
                    {Math.round(weatherData.main.feels_like)}°F
                  </div>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg stat">
                  <div className="text-gray-600 stat-title">Humidity</div>
                  <div className="text-xl stat-value">{weatherData.main.humidity}%</div>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg stat">
                  <div className="text-gray-600 stat-title">Wind Speed</div>
                  <div className="text-xl stat-value">{weatherData.wind.speed} mph</div>
                </div>

                <div className="bg-blue-50 p-3 rounded-lg stat">
                  <div className="text-gray-600 stat-title">Pressure</div>
                  <div className="text-xl stat-value">{weatherData.main.pressure} hPa</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
