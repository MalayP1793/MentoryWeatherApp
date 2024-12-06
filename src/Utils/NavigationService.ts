import { NavigationContainerRef } from '@react-navigation/native';
import { RootStackParamsList } from './type';

let _navigator: NavigationContainerRef<RootStackParamsList> | null = null; // Use the type argument

// Set the top-level navigator reference
function setTopLevelNavigator(navigatorRef: NavigationContainerRef<RootStackParamsList>) {
  _navigator = navigatorRef;
}

// Navigate to the next screen with optional data
function navigateToNext(name: keyof RootStackParamsList, data?: RootStackParamsList[keyof RootStackParamsList]) {
  if (_navigator) {
    _navigator.navigate(name, data);
  } else {
    console.warn("Navigator not set yet. Ensure that setTopLevelNavigator is called properly.");
  }
}

export default {
  setTopLevelNavigator,
  navigateToNext,
};
