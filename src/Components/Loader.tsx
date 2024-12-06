import React from "react";
import { View, Modal, ActivityIndicator, StyleSheet } from "react-native";
import colors from "../Utils/colors";
import responsive from "../Utils/responsive";

// Defining prop types for the Loader component
interface LoaderProps {
  isVisible: boolean;
}

const Loader = ({ isVisible }: LoaderProps) => {
  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={isVisible}
      onRequestClose={() => { }} // Optional: You can handle modal closing here if needed
    >
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            size="large"
            color={colors.blue}
            animating={isVisible}
          />
        </View>
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white60,
  },
  activityIndicatorWrapper: {
    height: responsive.hp(12),
    width: responsive.hp(12),
    borderRadius: responsive.hp(1.5),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
});
