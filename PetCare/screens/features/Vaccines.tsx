import React from "react";
import { View,Text,StyleSheet,ScrollView,TouchableOpacity,} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Vaccines({ navigation }: any) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>

        <Text style={styles.title}>Vacunas</Text>
      </View>

      <View style={styles.infoCard}>
        <Ionicons
          name="medical-outline"
          size={40}
          color="#2E7D6B"
        />

        <View style={styles.info}>
          <Text style={styles.petName}>Luna</Text>
          <Text style={styles.petInfo}>Labrador · 2 años</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Registro de vacunas</Text>

      <View style={styles.vaccineCard}>
        <View style={styles.icon}>
          <Ionicons name="checkmark-circle" size={30} color="#2E7D6B" />
        </View>

        <View style={styles.content}>
          <Text style={styles.vaccineName}>Vacuna antirrábica</Text>
          <Text style={styles.date}>Aplicada: 15/03/2026</Text>
          <Text style={styles.next}>Próxima: 15/09/2026</Text>
        </View>
      </View>

      <View style={styles.vaccineCard}>
        <View style={styles.icon}>
          <Ionicons name="checkmark-circle" size={30} color="#2E7D6B" />
        </View>

        <View style={styles.content}>
          <Text style={styles.vaccineName}>Vacuna múltiple</Text>
          <Text style={styles.date}>Aplicada: 10/01/2026</Text>
          <Text style={styles.next}>Próxima: 10/01/2027</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={22} color="#FFFFFF" />
        <Text style={styles.addText}>Agregar vacuna</Text>
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
    fontSize: 28,
    fontWeight: "800",
    color: "#1F2937",
  },

  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },

  info: {
    marginLeft: 15,
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

  vaccineCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },

  icon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E8F3F0",
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    marginLeft: 14,
    flex: 1,
  },

  vaccineName: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1F2937",
  },

  date: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 5,
  },

  next: {
    fontSize: 13,
    color: "#2E7D6B",
    fontWeight: "600",
    marginTop: 3,
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

