import { PermissionsAndroid, Platform } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

interface GeoLocationProp {
  latitude: number;
  longitude: number;
}

// Function to get the user's current location
export const getUserCurrentLocation = (): Promise<GeoLocationProp> =>
  new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const location: GeoLocationProp = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        resolve(location);
      },
      error => {
        console.error("Failed to get current location:", error.message);
        reject(error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  });

// Function to request location permission based on platform
export const locationPermission = (): Promise<string> =>
  new Promise(async (resolve, reject) => {
    if (Platform.OS === 'ios') {
      try {
        const permissionStatus = await Geolocation.requestAuthorization('whenInUse');
        if (permissionStatus === 'granted') {
          resolve('granted');
        } else {
          reject('Location permission not granted on iOS');
        }
      } catch (error) {
        console.error("Error requesting iOS location permission:", error);
        reject(error);
      }
    } else if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          resolve('granted');
        } else {
          reject('Location permission denied on Android');
        }
      } catch (error) {
        console.error("Error requesting Android location permission:", error);
        reject(error);
      }
    }
  });
