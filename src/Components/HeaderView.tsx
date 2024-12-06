import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import colors from '../Utils/colors';
import responsive from '../Utils/responsive';
import icons from '../Utils/icons';

type HeaderViewProp = {
    onPressBack: () => void;
    title: string;
};

const HeaderView = ({ onPressBack, title }: HeaderViewProp) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.searchButton} onPress={onPressBack}>
                {icons.backIcon}
            </TouchableOpacity>
            <Text style={styles.title}>{title}</Text>
            <TouchableOpacity style={styles.searchButton} activeOpacity={0.9}>
            </TouchableOpacity>
        </View>
    );
};

export default HeaderView;

const styles = StyleSheet.create({
    container: {
        width: '100%',
        paddingVertical: responsive.hp(1),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: responsive.wp(2),
    },
    searchButton: {
        marginHorizontal: responsive.wp(2),
    },
    title: {
        flex: 1,
        textAlign: 'center',
        color: colors.white,
        fontSize: 20,
        fontWeight: '500',
    },
});
