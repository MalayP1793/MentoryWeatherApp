import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import responsive from '../Utils/responsive'
import colors from '../Utils/colors'
import { convertTemperature, formatUnixTimestampToLocalCustomDate } from '../Utils/helper'

type WeatherForecastItemProps = {
    item: WeatherData,
}

const WeatherForecastItem = ({ item }: WeatherForecastItemProps) => {
    const [minTemperature, setMinTemperature] = useState<string>("")
    const [maxTemperature, setMaxTemperature] = useState<string>("")

    useEffect(() => {
        const getTemperature = async () => {
            const max = await convertTemperature((item?.main.temp_max ?? 0) - 273.15)
            setMaxTemperature(max)

            const min = await convertTemperature((item?.main.temp_min ?? 0) - 273.15)
            setMinTemperature(min)
        }
        if (item?.main.temp_max) {
            getTemperature()
        }
    }, [item])

    const imageUrl = () => {
        return `https://openweathermap.org/img/w/${item.weather[0].icon}.png`
    }
    return (
        <View style={styles.container}>
            <View style={styles.containerDisplay} key={item?.id}>
                <Text style={styles.text}>
                    {`${formatUnixTimestampToLocalCustomDate(item?.dt)}`}
                </Text>
                <Image source={{ uri: imageUrl() }} style={styles.image} />
                <Text style={styles.temperature}>
                    {maxTemperature}
                </Text>
                <Text style={styles.temperature}>
                    {minTemperature}
                </Text>
                <Text style={styles.weatherType}>
                    {item?.weather[0].main}
                </Text>
            </View>
        </View>
    )
}

export default WeatherForecastItem

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: responsive.wp(2),
        // height: responsive.hp(5),
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: responsive.hp(0.5),
        backgroundColor: colors.black60,
        marginRight: responsive.wp(2),
        padding: responsive.wp(1),
        borderRadius: responsive.hp(1)
    },
    text: {
        fontSize: responsive.hp(1.8),
        fontWeight: "500",
        color: colors.white,
        textAlign: "center"
    },
    weatherType: {
        fontSize: responsive.hp(1.8),
        textAlign: "center",
        color: colors.white,
        marginTop: responsive.hp(0.5),
        fontWeight: "700",
    },
    value: {
        fontSize: responsive.hp(2),
        fontWeight: "500",
        color: colors.blue,
        textAlign: "right"
    },
    containerDisplay: { flex: 1, alignItems: "center", paddingVertical: responsive.hp(1) },
    temperature: { fontSize: 12, fontWeight: "400", color: colors.white, textAlign: "center" },
    image: { width: responsive.hp(8), height: responsive.hp(8), marginVertical: responsive.hp(1) },

})
