import {
  NavigationContainer,
  DefaultTheme,
  NavigationContainerRef,
} from "@react-navigation/native";
import React, { useEffect, useRef } from 'react';
import {
  StatusBar,
} from 'react-native';

import NavigationService from './src/Utils/NavigationService';
import Navigation from "./src/View/Navigation";
import colors from "./src/Utils/colors";
import { RootSiblingParent } from "react-native-root-siblings";
import { RootStackParamsList } from "./src/Utils/type";

function App(): React.JSX.Element {

  const NewDefaultTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.white,
    },
  };

  const navigationRef = useRef<NavigationContainerRef<RootStackParamsList>>(null);

  // Set the navigator ref to the service
  useEffect(() => {
    if (navigationRef.current) {
      NavigationService.setTopLevelNavigator(navigationRef.current);
    }
  }, []);

  return (
    <RootSiblingParent>
      <StatusBar
        animated
        translucent={false}
        backgroundColor={colors.darkBlue}
        barStyle="light-content"
      />
      <NavigationContainer ref={navigationRef} theme={NewDefaultTheme}>
        <Navigation />
      </NavigationContainer>
    </RootSiblingParent>
  );
}

export default App;
