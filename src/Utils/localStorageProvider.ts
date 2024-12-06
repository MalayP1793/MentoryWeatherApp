import AsyncStorage from "@react-native-async-storage/async-storage";

class LocalStorageProvider {
  // Set a string value to AsyncStorage
  async setItemString(key: string, value: string): Promise<void> {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.error("Error setting item in AsyncStorage", error);
    }
  }

  // Get a string value from AsyncStorage
  async getItemString(key: string): Promise<string | null> {
    try {
      const item = await AsyncStorage.getItem(key);
      return item;
    } catch (error) {
      console.error("Error getting item from AsyncStorage", error);
      return null;
    }
  }

  // Set an object value to AsyncStorage
  async setItemObject(key: string, item: any): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(item));
    } catch (error) {
      console.error("Error setting object in AsyncStorage", error);
    }
  }

  // Get an object value from AsyncStorage
  async getItemObject<T>(key: string): Promise<T | null> {
    try {
      const item = await AsyncStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error("Error getting object from AsyncStorage", error);
      return null;
    }
  }

  // Remove an item from AsyncStorage
  async removeItem(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing item from AsyncStorage", error);
    }
  }

  // Clear all items from AsyncStorage
  async clear(): Promise<void> {
    try {
      await AsyncStorage.clear();
    } catch (error) {
      console.error("Error clearing AsyncStorage", error);
    }
  }
}

// Exporting the instance for usage across the app
export const localMobileStorage = new LocalStorageProvider();
