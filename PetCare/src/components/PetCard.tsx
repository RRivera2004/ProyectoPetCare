import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemeContext";

type PetCardProps = {
  name: string;
  breed: string;
  age: string | number;
  weight?: string | number;
  imageUrl?: string;
  onPress?: () => void;
};

export default function PetCard({name,breed,age,weight,imageUrl,onPress,}: PetCardProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}
      onPress={onPress}
      activeOpacity={onPress ? 0.85 : 1}
      disabled={!onPress}
    >
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      ) : (
        <View style={styles.avatar}>
          <Text style={styles.emoji}>🐕</Text>
        </View>
      )}

      <View style={styles.infoContainer}>
        <Text style={[styles.name, { color: colors.text }]}>{name}</Text>
        <Text style={[styles.details, { color: colors.textSecondary }]}>
          {breed} · {age} {typeof age === "number" || !isNaN(Number(age)) ? "años" : ""}
        </Text>
        {weight ? (
          <Text style={[styles.subDetails, { color: colors.textSecondary }]}>
            Peso: {weight} kg
          </Text>
        ) : null}
      </View>

      {onPress && (
        <Ionicons name="chevron-forward" size={22} color={colors.primary} />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    borderRadius: 18,
    padding: 14,
    marginVertical: 8,
    alignItems: "center",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E8F3F0",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E8F3F0",
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: {
    fontSize: 32,
  },
  infoContainer: {
    marginLeft: 14,
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "800",
  },
  details: {
    fontSize: 14,
    marginTop: 2,
  },
  subDetails: {
    fontSize: 12,
    marginTop: 2,
  },
});