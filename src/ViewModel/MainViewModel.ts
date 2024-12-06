import { useEffect, useState } from "react";
import { APIServiceManager, headers } from "../APIViewModel/APIServiceManager";
import { ApiURL } from "../APIViewModel/APIConfig";
import images from "../Utils/images";
import strings from "../Utils/strings";
import { getUserCurrentLocation, locationPermission } from "../Utils/locationManager";
import { Alert } from "react-native";
import { convertTemperature, formatUnixTimestampToLocalDate } from "../Utils/helper";
import { localMobileStorage } from "../Utils/localStorageProvider";
import localStorageKey from "../Utils/localStorageKey";

const MainViewModel = () => {
    const [isLoading, setLoading] = useState(false);
    const [isFirsttime, setFirsttime] = useState(false);
    const [searchText, setSearchText] = useState<string | undefined>("");
    const [searchData, setSearchData] = useState<WeatherData | undefined>();
    const [weatherReport, setWeatherReport] = useState<WeatherReportData[] | undefined>();
    const [extraWeatherReport, setExtraWeatherReport] = useState<WeatherReportData[] | undefined>();
    const [searchCity, setSearchCity] = useState<LocationResult[] | undefined>();
    const [locationData, setLocationData] = useState<GeoLocationProp | undefined>();
    const [address, setAddress] = useState<string | undefined>();
    const [weatherForecastReport, setWeatherForecastReport] = useState<WeatherData[] | undefined>();

    /**
     * Requests location permission and fetches the current location if granted.
     */
    async function requestLocationPermission() {
        try {
            const status = await locationPermission();
            if (status === "granted") {
                getCurrentLocation();
            } else {
                Alert.alert("Permission Denied", "Location access is required to fetch weather data.");
            }
        } catch (error) {
            Alert.alert("Error", "Please enable your permission from settings.");
        }
    }

    /**
     * Fetches the current location using the location manager.
     */
    async function getCurrentLocation() {
        try {
            const location = await getUserCurrentLocation();
            if (location) {
                const latLong = location as GeoLocationProp;
                setLocationData({ latitude: latLong.latitude, longitude: latLong.longitude });
                fetchAddressFromCoordinates(latLong);
            }
        } catch (error) {
            console.error("Failed to fetch location:", error);
        }
    }

    /**
     * Fetches the address from latitude and longitude.
     */
    async function fetchAddressFromCoordinates(coord: GeoLocationProp) {
        const apiUrl = `${ApiURL.WeatherModule.getAddressFromLatLong}lat=${coord.latitude}&lon=${coord.longitude}`;
        try {
            const response = await APIServiceManager.get(apiUrl, headers);
            if (response.status === 200 && response?.data?.features?.length > 0) {
                const locationDetails = response.data.features[0]?.properties;
                const newAddress = formatAddress(locationDetails);
                if (newAddress && newAddress !== address) {
                    setAddress(newAddress);
                    if (!isFirsttime) setFirsttime(true);
                }
            }
        } catch (error) {
            console.error("Error fetching address:", error);
        }
    }

    /**
     * Formats the address from the response.
     */
    function formatAddress(locationDetails: any): string {
        let address = "";
        if (locationDetails?.city) {
            address = locationDetails.city;
            if (locationDetails?.state) address += `, ${locationDetails.state}`;
        } else if (locationDetails?.state) {
            address = locationDetails.state;
        }
        return address;
    }

    /**
     * Fetches weather data based on the given query.
     */
    async function fetchWeatherAPI(query: string) {
        await localMobileStorage.setItemString(localStorageKey.LASTSEARCH, query);
        setLoading(true);
        const apiUrl = `${ApiURL.WeatherModule.weather}${query}`;
        try {
            const response = await APIServiceManager.get(apiUrl, headers);
            if (response.status === 200) {
                fetchWeatherForacstAPI(query)
                setSearchData(response.data);
            } else {
                setSearchData(undefined);
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
            setSearchData(undefined);
        } finally {
            setLoading(false);
        }
    }

    /**
     * Fetches weather data based on the given query.
     */
    async function fetchWeatherForacstAPI(query: string) {
        setLoading(true);
        const apiUrl = `${ApiURL.WeatherModule.forecast}${query}`;
        try {
            const response = await APIServiceManager.get(apiUrl, headers);
            if (response.status === 200 && response?.data?.list) {
                setWeatherForecastReport(response?.data?.list)
            } else {
                setWeatherForecastReport(undefined);
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
            setWeatherForecastReport(undefined);
        } finally {
            setLoading(false);
        }
    }

    /**
     * Fetches city suggestions based on the search text.
     */
    async function callSearchCityAPI(query: string) {
        const apiUrl = `${ApiURL.WeatherModule.searchCity}${query}`;
        try {
            const response = await APIServiceManager.get(apiUrl, headers);
            if (response.status === 200 && response?.data?.results?.length > 0) {
                setSearchCity(response.data.results);
            } else {
                setSearchCity(undefined);
            }
        } catch (error) {
            console.error("Error searching for city:", error);
            setSearchCity(undefined);
        }
    }

    /**
     * Triggers Request Location Permission for the first time.
     */
    useEffect(() => {
        const getLocation = async () => {
            await requestLocationPermission()
        }
        getLocation()
    }, []);

    /**
     * Parses and sets weather data.
     */
    useEffect(() => {
        if (searchData) {
            const mainWeatherData: WeatherReportData[] = [];
            const extraWeatherData: WeatherReportData[] = [];

            const getTemperature = async () => {
                const value = await convertTemperature(searchData?.main?.feels_like ?? 0)
                if (searchData.main?.feels_like)
                    extraWeatherData.push(addWeatherData(strings.realFeel, null, `${value}`));
            }

            if (searchData?.main?.feels_like) {
                getTemperature()
            }

            const addWeatherData = (title: string, image: any, value: string) => ({
                title,
                image,
                value,
            });

            if (searchData.wind?.speed)
                mainWeatherData.push(addWeatherData(strings.windSpeed, images.windSpeed, `${searchData.wind.speed} km/h`));

            if (searchData.main?.humidity)
                mainWeatherData.push(addWeatherData(strings.humidity, images.humidity, `${searchData.main.humidity}%`));

            if (searchData.clouds?.all)
                mainWeatherData.push(addWeatherData(strings.rainChances, images.rainChance, `${searchData.clouds.all}%`));

            if (searchData.main?.pressure)
                extraWeatherData.push(addWeatherData(strings.pressure, null, `${searchData.main.pressure}`));

            if (searchData.visibility)
                extraWeatherData.push(addWeatherData(strings.visibility, null, `${searchData.visibility / 1000} km`));

            if (searchData.sys?.sunrise)
                extraWeatherData.push(addWeatherData(strings.sunrise, null, `${formatUnixTimestampToLocalDate(searchData.sys.sunrise)}`));

            if (searchData.sys?.sunset)
                extraWeatherData.push(addWeatherData(strings.sunset, null, `${formatUnixTimestampToLocalDate(searchData.sys.sunset)}`));

            setWeatherReport(mainWeatherData);
            setExtraWeatherReport(extraWeatherData);
        } else {
            setWeatherReport(undefined);
            setExtraWeatherReport(undefined);
        }
    }, [searchData]);

    /**
     * Triggers weather API call when the address is updated for the first time.
     */
    useEffect(() => {
        if (isFirsttime && address) fetchWeatherAPI(address);
    }, [isFirsttime]);

    /**
     * Triggers city search API when searchText changes.
     */
    useEffect(() => {
        if (searchText && searchText?.length > 2) callSearchCityAPI(searchText);
        else setSearchCity(undefined);
    }, [searchText]);

    return {
        isLoading,
        searchText,
        setSearchText,
        fetchWeatherAPI,
        searchData,
        weatherReport,
        extraWeatherReport,
        searchCity,
        setSearchCity,
        requestLocationPermission,
        getCurrentLocation,
        weatherForecastReport,
        address
    };
};

export default MainViewModel;
