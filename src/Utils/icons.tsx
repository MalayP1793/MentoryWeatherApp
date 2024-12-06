import React from "react";
import Fontisto from "react-native-vector-icons/Fontisto";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "./colors";
import responsive from "./responsive";

export default {
  searchIcon: (
    <Fontisto name="search" size={responsive.hp(2.5)} color={colors.white} accessibilityLabel="Search" />
  ),
  locationIcon: (
    <FontAwesome5 name="location-arrow" size={responsive.hp(2.5)} color={colors.white} accessibilityLabel="Location" />
  ),
  sunIcon: (
    <Ionicons name="sunny-outline" size={responsive.hp(9)} color={colors.yellow} accessibilityLabel="Sun" />
  ),
  settingIcon: (
    <Ionicons name="settings-outline" size={responsive.hp(3)} color={colors.white} accessibilityLabel="Settings" />
  ),
  backIcon: (
    <Ionicons name="arrow-back" size={responsive.hp(2.5)} color={colors.white} accessibilityLabel="Back" />
  ),
  cloudIcon: (
    <Fontisto name="soundcloud" size={responsive.hp(11)} color={colors.white} />
  ),
};


