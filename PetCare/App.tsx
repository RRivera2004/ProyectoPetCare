import React from "react";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import StackNavigator from "./src/navigation/StackNavigation";
import { AuthProvider } from "./src/contexts/AuthContext";
import { ThemeProvider, useTheme } from "./src/contexts/ThemeContext";
import { LanguageProvider } from "./src/contexts/LanguageContext";

function MainNavigator() {
  const { isDark, colors } = useTheme();

  const customTheme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme.colors : DefaultTheme.colors),
      background: colors.background,
      card: colors.surface,
      text: colors.text,
      border: colors.border,
      primary: colors.primary,
    },
  };

  return (
    <NavigationContainer theme={customTheme}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <StackNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <ThemeProvider>
          <MainNavigator />
        </ThemeProvider>
      </LanguageProvider>
    </AuthProvider>
  );
}