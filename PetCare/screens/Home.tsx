import React from "react";
import {StyleSheet,View,Text,ScrollView,TouchableOpacity,} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function Home({ navigation }: any) {
  return (
    <ScrollView style={styles.container}>
      
      
      <View style={styles.header}>
        <View>
          <Text style={styles.smallText}>Bienvenida a</Text>
          <Text style={styles.title}>PetCare 🐾</Text>
        </View>

        <View style={styles.notification}>
          <Ionicons
            name="notifications-outline"
            size={25}
            color="#2E7D6B"
          />
        </View>
      </View>

     
      <View style={styles.welcomeCard}>
        <View>
          <Text style={styles.welcomeTitle}>
            ¡Hola! 👋
          </Text>

          <Text style={styles.welcomeText}>
            Todo listo para cuidar de tu mejor amigo.
          </Text>
        </View>

        <Text style={styles.paw}>🐶</Text>
      </View>

      {/* Mascota */}
      <Text style={styles.sectionTitle}>
        Mi mascota
      </Text>

      <View style={styles.petCard}>
        <View style={styles.petIcon}>
          <Text style={styles.petEmoji}>🐕</Text>
        </View>

        <View style={styles.petInfo}>
          <Text style={styles.petName}>Luna</Text>
          <Text style={styles.petDetails}>
            Labrador · 2 años
          </Text>
          <Text style={styles.petDetails}>
            Peso: 18 kg
          </Text>
        </View>

        <TouchableOpacity>
          <Ionicons
            name="chevron-forward"
            size={25}
            color="#2E7D6B"
          />
        </TouchableOpacity>
      </View>

      
      <Text style={styles.sectionTitle}>
        Acciones rápidas
      </Text>

      <View style={styles.grid}>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate("Vaccines")}
        >
          <View style={styles.iconContainer}>
            <Ionicons
              name="medical-outline"
              size={28}
              color="#2E7D6B"
            />
          </View>

          <Text style={styles.actionTitle}>
            Vacunas
          </Text>

          <Text style={styles.actionText}>
            Ver registros
          </Text>
        </TouchableOpacity>

      
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate("Deworming")}
        >
          <View style={styles.iconContainer}>
            <Ionicons
              name="shield-checkmark-outline"
              size={28}
              color="#2E7D6B"
            />
          </View>

          <Text style={styles.actionTitle}>
            Desparasitación
          </Text>

          <Text style={styles.actionText}>
            Ver tratamientos
          </Text>
        </TouchableOpacity>

          <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate("Reminders")}
        >
          <View style={styles.iconContainer}>
            <Ionicons
              name="alarm-outline"
              size={28}
              color="#2E7D6B"
            />
          </View>

          <Text style={styles.actionTitle}>
            Recordatorios
          </Text>

          <Text style={styles.actionText}>
            Próximas actividades
          </Text>
        </TouchableOpacity>

      
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() =>
            navigation.navigate("VeterinaryHistory")
          }
        >
          <View style={styles.iconContainer}>
            <Ionicons
              name="document-text-outline"
              size={28}
              color="#2E7D6B"
            />
          </View>

          <Text style={styles.actionTitle}>
            Historial
          </Text>

          <Text style={styles.actionText}>
            Historial veterinario
          </Text>
        </TouchableOpacity>

      </View>


      <Text style={styles.sectionTitle}>
        Próximo recordatorio
      </Text>

      <View style={styles.reminderCard}>
        <View style={styles.reminderIcon}>
          <Ionicons
            name="calendar-outline"
            size={26}
            color="#2E7D6B"
          />
        </View>

        <View style={styles.reminderInfo}>
          <Text style={styles.reminderTitle}>
            Vacuna antirrábica
          </Text>

          <Text style={styles.reminderText}>
            Próximo: 15 de septiembre
          </Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={22}
          color="#9CA3AF"
        />
      </View>

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
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 35,
    marginBottom: 20,
  },

  smallText: {
    fontSize: 14,
    color: "#6B7280",
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1F2937",
  },

  notification: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },

  welcomeCard: {
    backgroundColor: "#2E7D6B",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },

  welcomeTitle: {
    color: "#FFFFFF",
    fontSize: 23,
    fontWeight: "800",
  },

  welcomeText: {
    color: "#E8F3F0",
    fontSize: 14,
    marginTop: 5,
    width: 230,
  },

  paw: {
    fontSize: 55,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1F2937",
    marginBottom: 12,
  },

  petCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },

  petIcon: {
    width: 65,
    height: 65,
    borderRadius: 33,
    backgroundColor: "#E8F3F0",
    justifyContent: "center",
    alignItems: "center",
  },

  petEmoji: {
    fontSize: 38,
  },

  petInfo: {
    flex: 1,
    marginLeft: 15,
  },

  petName: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1F2937",
  },

  petDetails: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 3,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  actionCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },

  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E8F3F0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  actionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1F2937",
  },

  actionText: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },

  reminderCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },

  reminderIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E8F3F0",
    justifyContent: "center",
    alignItems: "center",
  },

  reminderInfo: {
    flex: 1,
    marginLeft: 14,
  },

  reminderTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1F2937",
  },

  reminderText: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
  },
});
