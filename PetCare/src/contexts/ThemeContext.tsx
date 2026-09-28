import React, { createContext, useContext, useState } from "react";

export type ThemeMode = "light" | "dark";

export type ThemeColors = {
  background: string;
  surface: string;
  text: string;
  textSecondary: string;
  primary: string;
  primaryMuted: string;
  border: string;
  inputBg: string;
  star: string;
  danger: string;
};

const lightColors: ThemeColors = {
  background: "#F7F4EF",
  surface: "#FFFFFF",
  text: "#1A1A1A",
  textSecondary: "#6B6B6B",
  primary: "#206291",
  primaryMuted: "#C5DEF0",
  border: "#D8D2C8",
  inputBg: "#EFEAE3",
  star: "#E8B923",
  danger: "#C0392B",
};

const darkColors: ThemeColors = {
  background: "#121212",
  surface: "#1E1E1E",
  text: "#F5F5F5",
  textSecondary: "#A0A0A0",
  primary: "#7EB8E0",
  primaryMuted: "#2A4A62",
  border: "#3A3A3A",
  inputBg: "#2A2A2A",
  star: "#F5C518",
  danger: "#E74C3C",
};

type ThemeContextType = {
  mode: ThemeMode;
  colors: ThemeColors;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<ThemeMode>("light");

  const toggleTheme = () => {
    setMode((current) => (current === "light" ? "dark" : "light"));
  };

  const setTheme = (nextMode: ThemeMode) => {
    setMode(nextMode);
  };

  const colors = mode === "dark" ? darkColors : lightColors;

  return (
    <ThemeContext.Provider
      value={{ mode, colors, isDark: mode === "dark", toggleTheme, setTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme debe ser utilizado dentro de ThemeProvider");
  }
  return context;
};