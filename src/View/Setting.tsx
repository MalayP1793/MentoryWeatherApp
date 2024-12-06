import React, { useCallback } from 'react';
import { SafeAreaView, StyleSheet, Switch, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import responsive from '../Utils/responsive';
import colors from '../Utils/colors';
import strings from '../Utils/strings';
import HeaderView from '../Components/HeaderView';
import SettingViewModel from '../ViewModel/SettingViewModel';
import LinearGradient from 'react-native-linear-gradient';

interface SettingProps {
    navigation: StackNavigationProp<any, any>;
}

const Setting: React.FC<SettingProps> = ({ navigation }) => {
    const settingViewModel = SettingViewModel();

    const handleBackPress = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    const handleToggleFahrenheit = useCallback(
        async (value: boolean) => {
            settingViewModel.setFahrenheit(value);
        },
        [settingViewModel]
    );

    return (
        <LinearGradient
            colors={[colors.darkBlue, colors.skyBlue, colors.white]}
            style={styles.container}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.containerInner}>
                    <HeaderView onPressBack={handleBackPress} title={strings.setting} />
                    <View style={styles.containerBody}>
                        <Text style={styles.text}>{settingViewModel.isFahrenheit ? strings.fahrenheit : strings.celsius}</Text>
                        <Switch
                            value={settingViewModel.isFahrenheit}
                            onValueChange={handleToggleFahrenheit}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </LinearGradient>
    );
};

export default Setting;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerInner: {
        flex: 1,
        alignItems: 'center',
    },
    containerBody: {
        width: '100%',
        marginTop: responsive.hp(1),
        padding: responsive.wp(4),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.black60
    },
    text: {
        fontSize: 18,
        fontWeight: '500',
        color: colors.white
    },
});
