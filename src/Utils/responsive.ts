import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { Dimensions } from "react-native";

export default {
  wp: wp,
  hp: hp,
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};
