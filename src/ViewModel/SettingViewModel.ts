import { useEffect, useState } from "react";
import { localMobileStorage } from "../Utils/localStorageProvider";
import localStorageKey from "../Utils/localStorageKey";


const SettingViewModel = () => {
    const [isFahrenheit, setFahrenheit] = useState(false);

    /**
     * Fetches the initial setting from local storage.
     */
    useEffect(() => {
        const loadInitialSetting = async () => {
            try {
                const flag = await localMobileStorage.getItemString(localStorageKey.FAHRENHEIT);
                setFahrenheit(flag === "1"); // Convert string value to boolean
            } catch (error) {
                console.error("Failed to load Fahrenheit setting:", error);
            }
        };

        loadInitialSetting();
    }, []);

    /**
     * Updates the local storage whenever `isFahrenheit` changes.
     */
    useEffect(() => {
        const saveSetting = async () => {
            try {
                await localMobileStorage.setItemString(localStorageKey.FAHRENHEIT, isFahrenheit ? "1" : "0");
            } catch (error) {
                console.error("Failed to save Fahrenheit setting:", error);
            }
        };

        saveSetting();
    }, [isFahrenheit]);

    return {
        isFahrenheit,
        setFahrenheit,
    };
};

export default SettingViewModel;
