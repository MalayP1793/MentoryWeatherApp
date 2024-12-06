import {
    FlatList,
    ListRenderItemInfo,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import React, { useEffect } from 'react';
import SearchBar from '../Components/SearchBar';
import Loader from '../Components/Loader';
import MainViewModel from '../ViewModel/MainViewModel';
import responsive from '../Utils/responsive';
import colors from '../Utils/colors';
import SearchList from '../Components/SearchList';
import WeatherDetails from '../Components/WeatherDetails';
import WeatherDetailsItem from '../Components/WeatherDetailsItem';
import strings from '../Utils/strings';
import routes from '../Utils/routes';
import { StackNavigationProp } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';
import WeatherForecastItem from '../Components/WeatherForecastItem';
import { useFocusEffect } from "@react-navigation/native";
import { localMobileStorage } from '../Utils/localStorageProvider';
import localStorageKey from '../Utils/localStorageKey';

interface MainProps {
    navigation: StackNavigationProp<any, any>;
}

const Main: React.FC<MainProps> = ({ navigation }) => {
    const mainViewModel = MainViewModel();

    useFocusEffect(
        React.useCallback(() => {
            callRefresh()
            return () => {
            };
        }, [])
    );

    const callRefresh = async () => {
        const query = await localMobileStorage.getItemString(localStorageKey.LASTSEARCH);
        if (query && query.length > 0) {
            await mainViewModel.fetchWeatherAPI(query)
        }
    }

    const renderItem = ({ item }: ListRenderItemInfo<LocationResult>) => (
        <SearchList
            item={item}
            onPress={async (city: string) => {
                mainViewModel.setSearchCity(undefined);
                mainViewModel.setSearchText(undefined);
                await mainViewModel.fetchWeatherAPI(city);
            }}
        />
    );

    const renderWeatherDetails = ({ item }: ListRenderItemInfo<WeatherReportData>) => (
        <WeatherDetailsItem item={item} />
    );

    const renderWeatherForecastDetails = ({ item }: ListRenderItemInfo<WeatherData>) => (
        <WeatherForecastItem item={item} />
    );

    return (
        <LinearGradient
            colors={[colors.darkBlue, colors.skyBlue, colors.white]}
            style={styles.container}
        >
            <SafeAreaView style={styles.container}>
                <Loader isVisible={mainViewModel.isLoading} />
                <View style={styles.containerIn}>
                    <SearchBar
                        onPressSearch={async () => {
                            if (mainViewModel.searchText?.length) {
                                mainViewModel.setSearchCity(undefined);
                                await mainViewModel.fetchWeatherAPI(mainViewModel.searchText);
                            }
                        }}
                        onPressLocation={async () => {
                            if (mainViewModel?.address && mainViewModel?.address?.length > 0) {
                                await mainViewModel.fetchWeatherAPI(mainViewModel.address);
                            } else {
                                await mainViewModel.requestLocationPermission();
                            }
                        }}
                        onChangeText={(text) => {
                            mainViewModel.setSearchText(text);
                        }}
                        searchText={mainViewModel.searchText}
                    />

                    {mainViewModel.searchData ? (
                        <FlatList
                            ListHeaderComponent={
                                <>
                                    <WeatherDetails
                                        searchData={mainViewModel.searchData}
                                        weatherReport={mainViewModel.weatherReport}
                                        onPressSetting={() => {
                                            navigation.navigate(routes.Setting)
                                        }}
                                    />
                                    <FlatList
                                        horizontal
                                        data={mainViewModel.weatherForecastReport}
                                        renderItem={renderWeatherForecastDetails}
                                        keyExtractor={(item, index) => `weather_${index}`}
                                        showsHorizontalScrollIndicator={false}
                                        style={styles.horizaontalflatListContainer}
                                    />
                                </>
                            }
                            data={mainViewModel.extraWeatherReport}
                            renderItem={renderWeatherDetails}
                            keyExtractor={(item, index) => `weather_${index}`}
                            showsVerticalScrollIndicator={false}
                            style={styles.flatListContainer}
                        />
                    ) : (
                        <View style={styles.notFoundContainer}>
                            <Text style={styles.text}>{strings.cityNotFound}</Text>
                        </View>
                    )}
                    <FlatList
                        data={mainViewModel.searchCity}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => `city_${index}`}
                        showsVerticalScrollIndicator={false}
                        style={styles.searchFlatListContainer}
                    />
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default Main;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerIn: {
        flex: 1,
        alignItems: 'center',
    },
    scrollView: { width: "100%" },
    scrollViewContainerInner: {
        alignItems: "center",
        paddingBottom: responsive.hp(5)
    },
    flatListContainer: {
        width: responsive.wp(92),
        alignSelf: 'center',
        marginVertical: responsive.hp(2),
    },
    horizaontalflatListContainer: {
        width: responsive.wp(92),
        alignSelf: 'center',
        marginTop: responsive.hp(2),
    },
    searchFlatListContainer: {
        width: responsive.wp(96),
        paddingHorizontal: responsive.wp(2),
        alignSelf: 'center',
        position: 'absolute',
        top: responsive.hp(5.5),
        maxHeight: responsive.hp(40),
        marginVertical: responsive.hp(2),
        backgroundColor: colors.lightGrey,
        borderRadius: responsive.hp(1),
        shadowColor: colors.blue,
        shadowRadius: 3,
        shadowOpacity: 0.5,
        shadowOffset: { width: 2, height: 2 },
    },
    text: {
        fontSize: 30,
        fontWeight: '700',
        color: colors.white,
        marginTop: responsive.hp(1),
        textAlign: 'center',
    },
    notFoundContainer: {
        justifyContent: 'center',
        paddingHorizontal: responsive.wp(4),
        flex: 1,
    }
});
