import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";
import PetCard from "../components/PetCard";
import InfoCard from "../components/InfoCard";

export default function Home({ navigation }: any) {
  const { colors, isDark } = useTheme();
  const { user } = useAuth();

  const userName = user?.email
    ? user.email.split("@")[0].charAt(0).toUpperCase() +
      user.email.split("@")[0].slice(1)
    : "";

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
  
      <View style={styles.header}>
        <View>
          <Text style={[styles.smallText, { color: colors.textSecondary }]}>
            Bienvenido/a 
          </Text>
          <Text style={[styles.title, { color: colors.text }]}>
            PetCare 🐾
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.notification, { backgroundColor: colors.surface }]}
          onPress={() => navigation.navigate("Reminders")}
        >
          <Ionicons
            name="notifications-outline"
            size={24}
            color="#2E7D6B"
          />
        </TouchableOpacity>
      </View>

      
      <View style={styles.welcomeCard}>
        <View style={styles.welcomeInfo}>
          <Text style={styles.welcomeTitle}>
            {userName ? `¡Hola, ${userName}! 👋` : "¡Hola! 👋"}
          </Text>

          <Text style={styles.welcomeText}>
            Todo listo para cuidar de tu mejor amigo de cuatro patas.
          </Text>
        </View>

        <Text style={styles.paw}>🐶</Text>
      </View>

      
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Mi mascota
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Text style={styles.sectionLink}>Ver perfil</Text>
        </TouchableOpacity>
      </View>

      <PetCard
        name="Luna"
        breed="Labrador Retriever"
        age={2}
        weight={18}
        onPress={() => navigation.navigate("Profile")}
      />

      
      <Text style={[styles.sectionTitle, { color: colors.text, marginTop: 18 }]}>
        Acciones rápidas
      </Text>

      <View style={styles.grid}>
      
        <TouchableOpacity
          style={[
            styles.actionCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
          onPress={() => navigation.navigate("Vaccines")}
          activeOpacity={0.8}
        >
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: isDark ? "#2A4A62" : "#E8F3F0" },
            ]}
          >
            <Ionicons name="medical-outline" size={26} color="#2E7D6B" />
          </View>

          <Text style={[styles.actionTitle, { color: colors.text }]}>
            Vacunas
          </Text>

          <Text style={[styles.actionText, { color: colors.textSecondary }]}>
            Control y registro
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actionCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
          onPress={() => navigation.navigate("Deworming")}
          activeOpacity={0.8}
        >
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: isDark ? "#2A4A62" : "#E8F3F0" },
            ]}
          >
            <Ionicons
              name="shield-checkmark-outline"
              size={26}
              color="#2E7D6B"
            />
          </View>

          <Text style={[styles.actionTitle, { color: colors.text }]}>
            Desparasitación
          </Text>

          <Text style={[styles.actionText, { color: colors.textSecondary }]}>
            Tratamientos
          </Text>
        </TouchableOpacity>

       
        <TouchableOpacity
          style={[
            styles.actionCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
          onPress={() => navigation.navigate("Reminders")}
          activeOpacity={0.8}
        >
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: isDark ? "#2A4A62" : "#E8F3F0" },
            ]}
          >
            <Ionicons name="alarm-outline" size={26} color="#2E7D6B" />
          </View>

          <Text style={[styles.actionTitle, { color: colors.text }]}>
            Recordatorios
          </Text>

          <Text style={[styles.actionText, { color: colors.textSecondary }]}>
            Comidas y citas
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.actionCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
          onPress={() => navigation.navigate("VeterinaryHistory")}
          activeOpacity={0.8}
        >
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: isDark ? "#2A4A62" : "#E8F3F0" },
            ]}
          >
            <Ionicons
              name="document-text-outline"
              size={26}
              color="#2E7D6B"
            />
          </View>

          <Text style={[styles.actionTitle, { color: colors.text }]}>
            Historial
          </Text>

          <Text style={[styles.actionText, { color: colors.textSecondary }]}>
            Consultas médicas
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>
          Próximo recordatorio
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Reminders")}>
          <Text style={styles.sectionLink}>Ver todos</Text>
        </TouchableOpacity>
      </View>

      <InfoCard
        title="Vacuna antirrábica"
        subtitle="Dosis anual de refuerzo veterinario"
        date="15 de septiembre"
        badge="Prioritario"
        iconName="calendar-outline"
        iconColor="#2E7D6B"
        onPress={() => navigation.navigate("Reminders")}
      />

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontWeight: "500",
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
  },
  notification: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  welcomeCard: {
    backgroundColor: "#2E7D6B",
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },
  welcomeInfo: {
    flex: 1,
  },
  welcomeTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
  },
  welcomeText: {
    color: "#E8F3F0",
    fontSize: 13,
    marginTop: 6,
    lineHeight: 18,
  },
  paw: {
    fontSize: 50,
    marginLeft: 10,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
  },
  sectionLink: {
    color: "#2E7D6B",
    fontSize: 13,
    fontWeight: "700",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 12,
    marginBottom: 16,
  },
  actionCard: {
    width: "48%",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: "800",
  },
  actionText: {
    fontSize: 12,
    marginTop: 4,
  },
});
