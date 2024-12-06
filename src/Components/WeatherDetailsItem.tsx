import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import responsive from '../Utils/responsive'
import colors from '../Utils/colors'

type WeatherReportDetailProps = {
    item: WeatherReportData,
}

const WeatherDetailsItem = ({ item }: WeatherReportDetailProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{item.title}</Text>
            <Text style={styles.value}>{item.value}</Text>
        </View>
    )
}

export default WeatherDetailsItem

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingHorizontal: responsive.wp(2),
        height: responsive.hp(4),
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: responsive.hp(0.5),
        flexDirection: "row"
    },
    text: {
        fontSize: responsive.hp(2),
        fontWeight: "400",
        color: colors.black
    },
    value: {
        fontSize: responsive.hp(2),
        fontWeight: "500",
        color: colors.blue,
        textAlign: "right"
    },
})
