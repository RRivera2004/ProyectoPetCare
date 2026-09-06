import React from "react";
import {
View,Text,StyleSheet,ScrollView,TouchableOpacity,} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Profile() {
  return (
    <ScrollView style={styles.container}>
      
      <Text style={styles.title}>Mi mascota</Text>

      <View style={styles.profileCard}>
        <View style={styles.photo}>
          <Text style={styles.petEmoji}>🐶</Text>
        </View>

        <Text style={styles.name}>Luna</Text>
        <Text style={styles.breed}>Labrador</Text>

        <View style={styles.details}>
          <View style={styles.detail}>
            <Ionicons
              name="calendar-outline"
              size={22}
              color="#2E7D6B"
            />
            <Text style={styles.detailText}>
              2 años
            </Text>
          </View>

          <View style={styles.detail}>
            <Ionicons
              name="scale-outline"
              size={22}
              color="#2E7D6B"
            />
            <Text style={styles.detailText}>
              18 kg
            </Text>
          </View>
        </View>
      </View>

      <Text style={styles.sectionTitle}>
        Información
      </Text>

      <View style={styles.infoCard}>
        <View style={styles.row}>
          <Ionicons
            name="paw-outline"
            size={22}
            color="#2E7D6B"
          />

          <View>
            <Text style={styles.label}>Nombre</Text>
            <Text style={styles.value}>Luna</Text>
          </View>
        </View>

        <View style={styles.row}>
          <Ionicons
            name="heart-outline"
            size={22}
            color="#2E7D6B"
          />

          <View>
            <Text style={styles.label}>Raza</Text>
            <Text style={styles.value}>Labrador</Text>
          </View>
        </View>

        <View style={styles.row}>
          <Ionicons
            name="male-female-outline"
            size={22}
            color="#2E7D6B"
          />

          <View>
            <Text style={styles.label}>Sexo</Text>
            <Text style={styles.value}>Hembra</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.button}>
        <Ionicons
          name="create-outline"
          size={21}
          color="#FFFFFF"
        />

        <Text style={styles.buttonText}>
          Editar información
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
    marginBottom: 20,
  },

  profileCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    alignItems: "center",
    padding: 25,
  },

  photo: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#E8F3F0",
    justifyContent: "center",
    alignItems: "center",
  },

  petEmoji: {
    fontSize: 65,
  },

  name: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1F2937",
    marginTop: 12,
  },

  breed: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 3,
  },

  details: {
    flexDirection: "row",
    marginTop: 20,
    gap: 30,
  },

  detail: {
    alignItems: "center",
  },

  detailText: {
    color: "#6B7280",
    marginTop: 5,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1F2937",
    marginTop: 25,
    marginBottom: 12,
  },

  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },

  label: {
    fontSize: 12,
    color: "#9CA3AF",
    marginLeft: 14,
  },

  value: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F2937",
    marginLeft: 14,
    marginTop: 2,
  },

  button: {
    height: 52,
    borderRadius: 14,
    backgroundColor: "#2E7D6B",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },
});
