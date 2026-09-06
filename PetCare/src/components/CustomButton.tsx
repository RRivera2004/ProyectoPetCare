import React from "react";
import {TouchableOpacity,Text,StyleSheet,ViewStyle,} from "react-native";

type CustomButtonProps = {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  style?: ViewStyle;
};

export default function CustomButton({
  title,
  onPress,
  variant = "primary",
  style,
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === "secondary"
          ? styles.secondaryButton
          : styles.primaryButton,
        style,
      ]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text
        style={[
          styles.text,
          variant === "secondary"
            ? styles.secondaryText
            : styles.primaryText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },

  primaryButton: {
    backgroundColor: "#2E7D6B",
  },

  secondaryButton: {
    backgroundColor: "#E8F3F0",
    borderWidth: 1,
    borderColor: "#2E7D6B",
  },

  text: {
    fontSize: 16,
    fontWeight: "700",
  },

  primaryText: {
    color: "#FFFFFF",
  },

  secondaryText: {
    color: "#2E7D6B",
  },
});