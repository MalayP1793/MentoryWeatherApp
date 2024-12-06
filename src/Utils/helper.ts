import localStorageKey from "./localStorageKey";
import { localMobileStorage } from "./localStorageProvider";

export const convertTemperature = async (temperature: number): Promise<string> => {
    const flag = await localMobileStorage.getItemString(localStorageKey.FAHRENHEIT);
    if (flag === "1") {
        return `${((temperature * 9 / 5) + 32).toFixed(2)} °F`; // Convert to Fahrenheit
    }
    return `${temperature.toFixed(2)} °C`; // Return in Celsius by default
}

export function formatUnixTimestampToLocalDate(unixTimestamp: number): string {
    return new Date(unixTimestamp * 1000).toLocaleTimeString();
}

export function formatUnixTimestampToLocalCustomDate(unixTimestamp: number): string {
    const date = new Date(unixTimestamp * 1000);

    const day = date.getDate();

    const options: Intl.DateTimeFormatOptions = { weekday: 'short' };
    const weekday = date.toLocaleDateString('en-US', options);

    // Get the time (hours and minutes)
    const time = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    return `${day} ${weekday}\n${time}`;
}