import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import responsive from '../Utils/responsive'
import colors from '../Utils/colors'

type SearchListItemProps = {
    item: LocationResult;
    onPress: (text: string) => void;
}

const SearchList = ({ item, onPress }: SearchListItemProps) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => onPress(item.name)}
            activeOpacity={0.8}
        >
            <Text style={styles.text}>{item.name}</Text>
        </TouchableOpacity>
    )
}

export default SearchList

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: responsive.hp(6),
        alignItems: "flex-start",
        justifyContent: "center",
        marginBottom: responsive.hp(0.5),
        paddingHorizontal: responsive.wp(2),
        borderBottomWidth: 1,
        borderBottomColor: colors.lightGrey,
        backgroundColor: colors.white,
    },
    text: {
        fontSize: 16,
        fontWeight: "400",
        color: colors.black,
        textAlign: "left", // Align text to the left for better readability
    },
})
