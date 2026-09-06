import React from "react";
import {View,Text,TextInput,StyleSheet,TextInputProps,} from "react-native";

type CustomInputProps = TextInputProps & {
  label: string;
  error?: string;
};

export default function CustomInput({
  label,
  error,
  ...props
}: CustomInputProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        placeholderTextColor="#9CA3AF"
        {...props}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 16,
  },

  label: {
    fontSize: 15,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 7,
  },

  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#1F2937",
  },

  inputError: {
    borderColor: "#EF4444",
  },

  error: {
    color: "#EF4444",
    fontSize: 13,
    marginTop: 5,
    marginLeft: 3,
  },
});