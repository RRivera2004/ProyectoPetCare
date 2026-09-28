import React from "react";
import {View,Text,TextInput,StyleSheet,TextInputProps,} from "react-native";
import { useTheme } from "../contexts/ThemeContext";

type Props = TextInputProps & {
  label: string;
};

export default function CustomInput({label,...props}:Props) {
  const {colors}= useTheme();
  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.textSecondary }]}>{label}</Text>

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.inputBg,
            color: colors.text,
            borderColor: colors.border,
          },
        ]}
        placeholderTextColor={colors.textSecondary}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15
  },
  label: {
    fontSize:14,
    fontWeight: "600",
    marginBottom: 6
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 16,
  },
});