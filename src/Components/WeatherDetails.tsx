import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import responsive from '../Utils/responsive'
import colors from '../Utils/colors'
import icons from '../Utils/icons'
import { convertTemperature } from '../Utils/helper'

type WeatherDetailsProps = {
    searchData: WeatherData | undefined;
    weatherReport: WeatherReportData[] | undefined;
    onPressSetting: () => void
}

const WeatherDetails = ({ searchData, weatherReport, onPressSetting }: WeatherDetailsProps) => {
    const [temperature, setTemperature] = useState<string>("")

    useEffect(() => {
        const getTemperature = async () => {
            const value = await convertTemperature(searchData?.main.temp ?? 0)
            setTemperature(value)
        }
        if (searchData?.main?.temp) {
            getTemperature()
        }
    }, [searchData])

    return (
        <View style={styles.container}>
            <View style={styles.containerIn}>
                <Text style={styles.cityname}>
                    {searchData?.name}
                </Text>
                {icons.sunIcon}
                <Text style={styles.temperature}>
                    {temperature}
                </Text>
                <Text style={styles.weatherType}>
                    {searchData?.weather[0]?.description}
                </Text>
                <View style={styles.containerDetail}>
                    {weatherReport?.map((item) => (
                        <View style={styles.containerDisplay} key={item?.title}>
                            <Text style={styles.title}>
                                {item?.title}
                            </Text>
                            {item?.image != null && (
                                <Image source={item!.image!} style={styles.image} />
                            )}
                            <Text style={styles.title}>
                                {item?.value}
                            </Text>
                        </View>
                    ))}
                </View>
            </View>
            <TouchableOpacity
                style={styles.floatingButton}
                onPress={() => { onPressSetting() }}
                accessibilityLabel="Open settings"
            >
                {icons.settingIcon}
            </TouchableOpacity>
        </View>
    )
}

export default WeatherDetails

const styles = StyleSheet.create({
    container: {
        paddingVertical: responsive.hp(2),
        width: "100%",
        backgroundColor: colors.white60,
        borderRadius: responsive.hp(1),
    },
    containerIn: { alignItems: "center", paddingTop: responsive.hp(1) },
    temperature: { fontSize: 36, fontWeight: "700", color: colors.white, marginTop: responsive.hp(1) },
    weatherType: { fontSize: 20, fontWeight: "500", color: colors.lightGrey, marginTop: responsive.hp(2) },
    cityname: { fontSize: 20, fontWeight: "500", color: colors.white, marginBottom: responsive.hp(1) },
    containerDetail: { flexDirection: "row", width: "92%", justifyContent: "space-between", marginTop: responsive.hp(2) },
    containerDisplay: { flex: 1, alignItems: "center", paddingVertical: responsive.hp(1) },
    title: { fontSize: 14, fontWeight: "400", color: colors.black, textAlign: "center" },
    image: { width: responsive.hp(3), height: responsive.hp(3), marginVertical: responsive.hp(1) },
    floatingButton: {
        width: responsive.hp(5),
        height: responsive.hp(5),
        position: 'absolute',
        top: responsive.hp(1.5),
        right: responsive.wp(1),
        borderRadius: responsive.hp(6),
        alignItems: 'center',
        justifyContent: 'center',
    },
})
