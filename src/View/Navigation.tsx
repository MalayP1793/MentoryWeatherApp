import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './Main';
import Setting from './Setting';
import { RootStackParamsList } from '../Utils/type';
import routes from '../Utils/routes';
import Splash from './Splash';

const Stack = createNativeStackNavigator<RootStackParamsList>();

const screens = [
    { name: routes.Splash, component: Splash },
    { name: routes.Main, component: Main },
    { name: routes.Setting, component: Setting },

];

const screenOptions = {
    headerShown: false,
};

export default function Navigation() {
    return (
        <Stack.Navigator initialRouteName='Splash' screenOptions={screenOptions}>
            {screens.map((screen) => (
                <Stack.Screen key={screen.name} name={screen.name} component={screen.component} />
            ))}
        </Stack.Navigator>
    );
}
