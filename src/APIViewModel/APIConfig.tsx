import Config from 'react-native-config';

const weatherApiKey = Config.WEATHER_API_KEY;
const geoapifyApiKey = Config.GEOAPIFY_API_KEY;

// Unit for temperature, can be "metric", "imperial", or "standard"
const unit = "metric";

// Environment-specific settings
export const production = process.env.NODE_ENV === 'production';

export const WeatherBaseURL = "https://api.openweathermap.org/data/2.5/";
export const SearchBaseURL = "https://geocoding-api.open-meteo.com/v1/";
export const GeoCoordBaseURL = "https://api.geoapify.com/v1/";

export const ApiURL = {
  WeatherModule: {
    weather: `${WeatherBaseURL}weather?appid=${weatherApiKey}&units=${unit}&q=`,
    forecast: `${WeatherBaseURL}forecast?appid=${weatherApiKey}&q=`,
    searchCity: `${SearchBaseURL}search?name=`,
    getAddressFromLatLong: `${GeoCoordBaseURL}geocode/reverse?apiKey=${geoapifyApiKey}&`,
  },
};
