import React from "react";
import {View,Text,StyleSheet,ScrollView,TouchableOpacity,Alert,} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Settings({ navigation }: any) {
  const cerrarSesion = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Deseas cerrar sesión?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Cerrar sesión",
          onPress: () =>
            navigation.getParent()?.navigate("LoginScreen"),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.title}>Preferencias</Text>

      <Text style={styles.subtitle}>
        Configura tu experiencia en PetCare
      </Text>

      <View style={styles.card}>

        <TouchableOpacity style={styles.option}>
          <View style={styles.icon}>
            <Ionicons
              name="notifications-outline"
              size={23}
              color="#2E7D6B"
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.optionTitle}>
              Notificaciones
            </Text>

            <Text style={styles.optionText}>
              Recordatorios de tu mascota
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color="#9CA3AF"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <View style={styles.icon}>
            <Ionicons
              name="help-circle-outline"
              size={23}
              color="#2E7D6B"
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.optionTitle}>
              Ayuda
            </Text>

            <Text style={styles.optionText}>
              Información sobre PetCare
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color="#9CA3AF"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <View style={styles.icon}>
            <Ionicons
              name="information-circle-outline"
              size={23}
              color="#2E7D6B"
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.optionTitle}>
              Acerca de
            </Text>

            <Text style={styles.optionText}>
              PetCare versión 1.0
            </Text>
          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color="#9CA3AF"
          />
        </TouchableOpacity>

      </View>

      <TouchableOpacity
        style={styles.logout}
        onPress={cerrarSesion}
      >
        <Ionicons
          name="log-out-outline"
          size={22}
          color="#DC2626"
        />

        <Text style={styles.logoutText}>
          Cerrar sesión
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F9FC",
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#1F2937",
    marginTop: 40,
  },

  subtitle: {
    color: "#6B7280",
    marginTop: 5,
    marginBottom: 25,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 5,
  },

  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },

  icon: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: "#E8F3F0",
    justifyContent: "center",
    alignItems: "center",
  },

  textContainer: {
    flex: 1,
    marginLeft: 13,
  },

  optionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
  },

  optionText: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 3,
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
    marginLeft: 8,
  },
});

