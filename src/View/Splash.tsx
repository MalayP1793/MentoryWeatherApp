import { Animated, StyleSheet, Text } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../Utils/colors';
import routes from '../Utils/routes';
import icons from '../Utils/icons';
import { localMobileStorage } from '../Utils/localStorageProvider';
import localStorageKey from '../Utils/localStorageKey';

interface SplashProps {
    navigation: StackNavigationProp<any, any>;
}

const Splash: React.FC<SplashProps> = ({ navigation }) => {
    const translateY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const remove = async () => {
            await localMobileStorage.setItemString(localStorageKey.LASTSEARCH, "");
        }
        remove()
        setTimeout(() => {
            navigation.navigate(routes.Main)
        }, 4000);
    }, [])

    useEffect(() => {
        const timeout = setTimeout(() => {
            Animated.timing(translateY, {
                toValue: -250,
                duration: 800,
                useNativeDriver: true,
            }).start();
        }, 2000);

        return () => clearTimeout(timeout);
    }, [translateY]);

    return (
        <LinearGradient
            colors={[colors.darkBlue, colors.skyBlue, colors.white]}
            style={styles.container}
        >
            <Animated.View
                style={[
                    styles.content,
                    {
                        transform: [{ translateY }], // Bind translateY to animation
                    },
                ]}
            >
                {icons.cloudIcon}
                <Text style={styles.title}>Weather App</Text>
            </Animated.View>
        </LinearGradient>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        marginTop: 20,
        fontSize: 24,
        fontWeight: "bold",
        color: colors.white,
    },
});