import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Reminders({ navigation }: any) {
  return (
    <ScrollView style={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>

        <Text style={styles.title}>Recordatorios</Text>
      </View>

      <Text style={styles.subtitle}>
        Próximas actividades de Luna
      </Text>

      <View style={styles.reminderCard}>
        <View style={styles.icon}>
          <Ionicons
            name="medical-outline"
            size={28}
            color="#2E7D6B"
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.reminderTitle}>
            Vacuna antirrábica
          </Text>

          <Text style={styles.date}>
            15 de septiembre de 2026
          </Text>
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>Próximo</Text>
        </View>
      </View>

      <View style={styles.reminderCard}>
        <View style={styles.icon}>
          <Ionicons
            name="restaurant-outline"
            size={28}
            color="#2E7D6B"
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.reminderTitle}>
            Alimentación
          </Text>

          <Text style={styles.date}>
            Todos los días · 7:00 PM
          </Text>
        </View>
      </View>

      <View style={styles.reminderCard}>
        <View style={styles.icon}>
          <Ionicons
            name="calendar-outline"
            size={28}
            color="#2E7D6B"
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.reminderTitle}>
            Visita al veterinario
          </Text>

          <Text style={styles.date}>
            25 de septiembre de 2026
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.addButton}>
        <Ionicons name="add" size={22} color="#FFFFFF" />
        <Text style={styles.addText}>
          Agregar recordatorio
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
    marginBottom: 10,
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
    fontSize: 27,
    fontWeight: "800",
    color: "#1F2937",
  },

  subtitle: {
    color: "#6B7280",
    fontSize: 14,
    marginBottom: 20,
  },

  reminderCard: {
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
    flex: 1,
    marginLeft: 14,
  },

  reminderTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1F2937",
  },

  date: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 5,
  },

  badge: {
    backgroundColor: "#E8F3F0",
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },

  badgeText: {
    color: "#2E7D6B",
    fontSize: 11,
    fontWeight: "700",
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
