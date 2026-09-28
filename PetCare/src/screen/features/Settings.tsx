import React from "react";
import {View,Text,StyleSheet,ScrollView,TouchableOpacity,Alert,Switch,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { UseAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { useLanguage } from "../../contexts/LanguageContext";

export default function Settings({ navigation }: any) {
  const { user, logout } = UseAuth();
  const { toggleTheme, colors, isDark } = useTheme();
  const { language, changeLanguage } = useLanguage();

  const cerrarSesion = () => {
    Alert.alert("Cerrar sesión", "¿Estás seguro de que deseas salir?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Cerrar sesión",
        style: "destructive",
        onPress: async () => {
          try {
            await logout();
            navigation.getParent()?.navigate("LoginScreen");
          } catch (error: any) {
            Alert.alert("Error", "No se pudo cerrar la sesión.");
          }
        },
      },
    ]);
  };

  const alternarIdioma = () => {
    const nuevoIdioma = language === "es" ? "en" : "es";
    changeLanguage(nuevoIdioma);
    Alert.alert(
      "Idioma cambiado",
      `El idioma ahora es: ${nuevoIdioma === "es" ? "Español" : "English"}`
    );
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Text style={[styles.title, { color: colors.text }]}>Preferencias</Text>

      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Configura tu experiencia en PetCare
      </Text>

      {user ? (
        <View
          style={[
            styles.userCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <View style={styles.userAvatar}>
            <Ionicons name="person" size={24} color="#2E7D6B" />
          </View>
          <View style={styles.userInfo}>
            <Text style={[styles.userRole, { color: colors.textSecondary }]}>
              Sesión activa
            </Text>
            <Text style={[styles.userEmail, { color: colors.text }]}>
              {user.email}
            </Text>
          </View>
        </View>
      ) : null}

      <View
        style={[
          styles.card,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <View style={styles.option}>
          <View
            style={[
              styles.icon,
              { backgroundColor: isDark ? "#2A4A62" : "#E8F3F0" },
            ]}
          >
            <Ionicons
              name={isDark ? "moon" : "sunny"}
              size={22}
              color="#2E7D6B"
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={[styles.optionTitle, { color: colors.text }]}>
              Modo Oscuro
            </Text>
            <Text style={[styles.optionText, { color: colors.textSecondary }]}>
              {isDark ? "Tema oscuro activado" : "Tema claro activado"}
            </Text>
          </View>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: "#D1D5DB", true: "#2E7D6B" }}
            thumbColor="#FFFFFF"
          />
        </View>

        <TouchableOpacity style={styles.option} onPress={alternarIdioma}>
          <View
            style={[
              styles.icon,
              { backgroundColor: isDark ? "#2A4A62" : "#E8F3F0" },
            ]}
          >
            <Ionicons name="language-outline" size={23} color="#2E7D6B" />
          </View>

          <View style={styles.textContainer}>
            <Text style={[styles.optionTitle, { color: colors.text }]}>
              Idioma / Language
            </Text>
            <Text style={[styles.optionText, { color: colors.textSecondary }]}>
              {language === "es" ? "Español" : "English"}
            </Text>
          </View>

          <Ionicons
            name="swap-horizontal"
            size={20}
            color={colors.textSecondary}
          />
        </TouchableOpacity>

        <View style={styles.option}>
          <View
            style={[
              styles.icon,
              { backgroundColor: isDark ? "#2A4A62" : "#E8F3F0" },
            ]}
          >
            <Ionicons
              name="information-circle-outline"
              size={23}
              color="#2E7D6B"
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={[styles.optionTitle, { color: colors.text }]}>
              Acerca de
            </Text>
            <Text style={[styles.optionText, { color: colors.textSecondary }]}>
              PetCare v1.0 · Cuidado integral
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.logout} onPress={cerrarSesion}>
        <Ionicons name="log-out-outline" size={22} color="#DC2626" />
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
     flex: 1,  
     padding: 20,
    },
  title: { 
    fontSize: 30, 
    fontWeight: "800",  
    marginTop: 40,
    marginBottom: 20,
  },
  subtitle: { 
    marginTop: 5, 
    marginBottom: 20, 
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 18,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
  },
  userAvatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#E8F3F0",
    justifyContent: "center",
    alignItems: "center",
  },
  userInfo: {
    marginLeft: 12,
    flex: 1,
  },
  userRole: {
    fontSize: 12,
    fontWeight: "600",
  },
  userEmail: {
    fontSize: 15,
    fontWeight: "700",
    marginTop: 2,
  },
  card: { 
    borderRadius: 20, 
    padding: 10,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  option: { 
    flexDirection: "row", 
    alignItems: "center", 
    paddingVertical: 14,
    paddingHorizontal:10,
  },
  icon: {
    width: 45,
    height: 45,
    borderRadius: 23,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: { 
    flex: 1,
    marginLeft: 13 
  },
  optionTitle: { 
    fontSize: 16, 
    fontWeight: "700", 
  },
  optionText: { 
    fontSize: 12,  
    marginTop: 3 
  },
  logout: {
    height: 52,
    borderRadius: 14,
    backgroundColor: "#FEE2E2",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 30,
  },
  logoutText: { 
    color: "#DC2626", 
    fontWeight: "700", 
    fontSize: 16, 
    marginLeft: 8 
  },
});