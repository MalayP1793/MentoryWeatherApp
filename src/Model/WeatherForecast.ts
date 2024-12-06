

interface WeatherDataResponse {
    city: City;
    cnt: number;
    cod: string;
    list: WeatherData[];
}

interface City {
    coord: CityCoordinates;
    country: string;
    id: number;
    name: string;
    population: number;
    sunrise: number;
    sunset: number;
    timezone: number;
}

interface CityCoordinates {
    lat: number;
    lon: number;
}