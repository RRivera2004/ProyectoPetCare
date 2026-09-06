import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function VeterinaryHistory({ navigation }: any) {
  return (
    <ScrollView style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>

        <Text style={styles.title}>Historial veterinario</Text>
      </View>

      <View style={styles.petCard}>
        <Text style={styles.petEmoji}>🐕</Text>

        <View>
          <Text style={styles.petName}>Luna</Text>
          <Text style={styles.petInfo}>
            Labrador · 2 años
          </Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>
        Consultas anteriores
      </Text>

      <View style={styles.historyCard}>
        <View style={styles.dateBox}>
          <Text style={styles.day}>12</Text>
          <Text style={styles.month}>AGO</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.historyTitle}>
            Consulta general
          </Text>

          <Text style={styles.description}>
            Revisión general y control de peso.
          </Text>

          <Text style={styles.vet}>
            Veterinaria: Dra. María López
          </Text>
        </View>
      </View>

      <View style={styles.historyCard}>
        <View style={styles.dateBox}>
          <Text style={styles.day}>05</Text>
          <Text style={styles.month}>JUL</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.historyTitle}>
            Control veterinario
          </Text>

          <Text style={styles.description}>
            Revisión de vacunas y desparasitación.
          </Text>

          <Text style={styles.vet}>
            Veterinaria: Dra. María López
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={22} color="#FFFFFF" />

        <Text style={styles.addText}>
          Agregar consulta
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

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 35,
    marginBottom: 25,
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  title: {
    fontSize: 25,
    fontWeight: "800",
    color: "#1F2937",
    flex: 1,
  },

  petCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },

  petEmoji: {
    fontSize: 45,
    marginRight: 15,
  },

  petName: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1F2937",
  },

  petInfo: {
    color: "#6B7280",
    marginTop: 3,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
    color: "#1F2937",
    marginBottom: 12,
  },

  historyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    marginBottom: 12,
  },

  dateBox: {
    width: 55,
    height: 60,
    borderRadius: 12,
    backgroundColor: "#E8F3F0",
    justifyContent: "center",
    alignItems: "center",
  },

  day: {
    fontSize: 20,
    fontWeight: "800",
    color: "#2E7D6B",
  },

  month: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2E7D6B",
  },

  content: {
    flex: 1,
    marginLeft: 14,
  },

  historyTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1F2937",
  },

  description: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 5,
  },

  vet: {
    fontSize: 12,
    color: "#2E7D6B",
    marginTop: 7,
    fontWeight: "600",
  },

  addButton: {
    height: 52,
    borderRadius: 14,
    backgroundColor: "#2E7D6B",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 30,
  },

  addText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },
});

