interface WeatherResponse {
    data: WeatherData;
    status: number;
    statusText?: string;
}

interface WeatherData {
    base: string;
    clouds: Clouds;
    cod: number;
    coord: Coord;
    dt: number;
    id: number;
    main: Main;
    name: string;
    sys: Sys;
    timezone: number;
    visibility: number;
    weather: Weather[];
    wind: Wind;
}

interface Clouds {
    all: number;
}

interface Coord {
    lat: number;
    lon: number;
}

interface Main {
    feels_like: number;
    grnd_level?: number;
    humidity: number;
    pressure: number;
    sea_level?: number;
    temp: number;
    temp_max: number;
    temp_min: number;
}

interface Sys {
    country: string;
    id?: number;
    sunrise: number;
    sunset: number;
    type?: number;
}

interface Weather {
    description: string;
    icon: string;
    id: number;
    main: string;
}

interface Wind {
    deg: number;
    speed: number;
}

interface WeatherReportData {
    title: string;
    image: string | null;
    value: string;
}
