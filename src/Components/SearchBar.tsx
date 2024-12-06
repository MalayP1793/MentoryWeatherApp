import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import colors from '../Utils/colors'
import responsive from '../Utils/responsive'
import icons from '../Utils/icons'

type HeaderProps = {
    onPressSearch: () => void
    onPressLocation: () => void
    onChangeText: (text: string | undefined) => void
    searchText: string | undefined
}

const SearchBar = ({ onPressSearch, onPressLocation, onChangeText, searchText }: HeaderProps) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.searchButton}
                onPress={onPressLocation}
                activeOpacity={0.7}
                accessibilityLabel="Location button"
                accessibilityRole="button"
            >
                {icons.locationIcon}
            </TouchableOpacity>

            <TextInput
                style={styles.searchText}
                placeholder="Search location"
                onChangeText={onChangeText}
                value={searchText}
                autoCapitalize="none"
                placeholderTextColor={colors.lightGrey}
                accessibilityLabel="Search input"
            />

            <TouchableOpacity
                style={styles.searchButton}
                onPress={onPressSearch}
                activeOpacity={0.7}
                accessibilityLabel="Search button"
                accessibilityRole="button"
            >
                {icons.searchIcon}
            </TouchableOpacity>
        </View>
    )
}

export default SearchBar

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingVertical: responsive.hp(1),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: responsive.wp(2),
    },
    searchText: {
        flex: 1,
        backgroundColor: colors.white60,
        height: responsive.hp(5),
        marginHorizontal: responsive.wp(2),
        borderRadius: responsive.hp(3),
        paddingHorizontal: responsive.wp(3),
        fontSize: 16,
        color: colors.white,
    },
    searchButton: {
        marginHorizontal: responsive.wp(2),
    },
})
