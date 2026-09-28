import React from "react";
import { View, Text, StyleSheet, ViewStyle, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemeContext";

type InfoCardProps = {
  title: string;
  subtitle: string;
  date?: string;
  badge?: string;
  iconName: keyof typeof Ionicons.glyphMap;
  iconColor?: string;
  style?: ViewStyle;
  onPress?: () => void;
};

export default function InfoCard({title,subtitle,date, badge,iconName,iconColor,style,onPress,}: InfoCardProps) {
  const { colors } = useTheme();
  const effectiveIconColor = iconColor || colors.primary;

  const content = (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
        style,
      ]}
    >
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: `${effectiveIconColor}20` },
        ]}
      >
        <Ionicons name={iconName} size={24} color={effectiveIconColor} />
      </View>

      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {subtitle}
        </Text>
        {date ? (
          <Text style={[styles.date, { color: colors.primary }]}>{date}</Text>
        ) : null}
      </View>

      {badge ? (
        <View style={[styles.badge, { backgroundColor: `${effectiveIconColor}18` }]}>
          <Text style={[styles.badgeText, { color: effectiveIconColor }]}>
            {badge}
          </Text>
        </View>
      ) : null}

      {onPress ? (
        <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
      ) : null}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        {content}
      </TouchableOpacity>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    padding: 14,
    marginVertical: 6,
    borderWidth: 1,
  },
  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginLeft: 13,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  date: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 3,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 6,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
  },
});