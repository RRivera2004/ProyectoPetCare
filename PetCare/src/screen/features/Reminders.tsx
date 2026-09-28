import React, { useState } from "react";
import {View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Alert, KeyboardAvoidingView, Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../contexts/ThemeContext";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { supabase } from "../../lib/supabase";

type ReminderType = "Alimentación" | "Medicamento" | "Cita" | "Otro";

type ReminderItem = {
  id: string;
  title: string;
  category: ReminderType;
  date: string;
  icon: keyof typeof Ionicons.glyphMap;
};

export default function Reminders({ navigation }: any) {
  const { colors } = useTheme();

  const [reminders, setReminders] = useState<ReminderItem[]>([
    {
      id: "1",
      title: "Alimentación balanceada",
      category: "Alimentación",
      date: "Todos los días · 8:00 AM y 7:00 PM",
      icon: "restaurant-outline",
    },
    {
      id: "2",
      title: "Administrar suplemento articular",
      category: "Medicamento",
      date: "Cada 24 horas después del desayuno",
      icon: "medical-outline",
    },
    {
      id: "3",
      title: "Consulta y chequeo dental veterinario",
      category: "Cita",
      date: "25 de octubre de 2026 · 10:00 AM",
      icon: "calendar-outline",
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<ReminderType>("Alimentación");
  const [date, setDate] = useState("");

  const getCategoryIcon = (cat: ReminderType): keyof typeof Ionicons.glyphMap => {
    switch (cat) {
      case "Alimentación":
        return "restaurant-outline";
      case "Medicamento":
        return "medical-outline";
      case "Cita":
        return "calendar-outline";
      default:
        return "alarm-outline";
    }
  };

  const handleAddReminder = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Por favor escribe el título del recordatorio.");
      return;
    }

    const newReminder: ReminderItem = {
      id: Date.now().toString(),
      title: title.trim(),
      category: category,
      date: date.trim() || "Hoy",
      icon: getCategoryIcon(category),
    };

    setReminders([newReminder, ...reminders]);
    setTitle("");
    setDate("");
    setModalVisible(false);

    try {
      await supabase.from("reminders").insert([
        {
          title: newReminder.title,
          category: newReminder.category,
          date: newReminder.date,
        },
      ]);
    } catch (err) {
      console.log("Nota: Supabase offline o tabla reminders no inicializada.");
    }

    Alert.alert("¡Recordatorio agregado!", "Te notificaremos a la hora indicada.");
  };

  const handleDeleteReminder = (id: string) => {
    Alert.alert(
      "Eliminar recordatorio",
      "¿Deseas marcar o eliminar este recordatorio?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => {
            setReminders(reminders.filter((r) => r.id !== id));
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.backButton, { backgroundColor: colors.surface }]}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>

        <Text style={[styles.title, { color: colors.text }]}>Recordatorios</Text>
      </View>

      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Próximas actividades y cuidados para Luna
      </Text>

      {reminders.map((item) => (
        <TouchableOpacity
          key={item.id}
          activeOpacity={0.8}
          onLongPress={() => handleDeleteReminder(item.id)}
          style={[
            styles.reminderCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <View style={styles.icon}>
            <Ionicons name={item.icon} size={28} color="#2E7D6B" />
          </View>

          <View style={styles.content}>
            <Text style={[styles.reminderTitle, { color: colors.text }]}>
              {item.title}
            </Text>
            <Text style={[styles.date, { color: colors.textSecondary }]}>
              {item.date}
            </Text>
          </View>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.category}</Text>
          </View>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={22} color="#FFFFFF" />
        <Text style={styles.addText}>Agregar recordatorio</Text>
      </TouchableOpacity>

      
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.modalOverlay}
        >
          <View
            style={[
              styles.modalContent,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                Nuevo Recordatorio
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons
                  name="close-circle-outline"
                  size={26}
                  color={colors.textSecondary}
                />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={[styles.categoryLabel, { color: colors.textSecondary }]}>
                Tipo de recordatorio
              </Text>
              <View style={styles.categoryPicker}>
                {(["Alimentación", "Medicamento", "Cita"] as ReminderType[]).map(
                  (cat) => (
                    <TouchableOpacity
                      key={cat}
                      style={[
                        styles.categoryBtn,
                        category === cat && styles.categoryBtnActive,
                      ]}
                      onPress={() => setCategory(cat)}
                    >
                      <Text
                        style={[
                          styles.categoryBtnText,
                          category === cat && styles.categoryBtnTextActive,
                        ]}
                      >
                        {cat}
                      </Text>
                    </TouchableOpacity>
                  )
                )}
              </View>

              <CustomInput
                label="Título del recordatorio"
                placeholder="Ej. Desayuno de Luna, Dar antibiótico"
                value={title}
                onChangeText={setTitle}
              />

              <CustomInput
                label="Fecha / Hora o Frecuencia"
                placeholder="Ej. Todos los días a las 8:00 AM, 15 de Oct"
                value={date}
                onChangeText={setDate}
              />

              <CustomButton
                title="Guardar recordatorio"
                onPress={handleAddReminder}
              />

              <CustomButton
                title="Cancelar"
                variant="secondary"
                onPress={() => setModalVisible(false)}
                style={{ marginTop: 8 }}
              />
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
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
    alignItems: "center",
    marginTop: 35,
    marginBottom: 10,
  },
  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  title: {
    fontSize: 27,
    fontWeight: "800",
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
  },
  reminderCard: {
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 1,
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
    fontSize: 15,
    fontWeight: "800",
  },
  date: {
    fontSize: 13,
    marginTop: 4,
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
    marginBottom: 35,
  },
  addText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    padding: 22,
    maxHeight: "85%",
    borderWidth: 1,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "800",
  },
  categoryLabel: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 8,
  },
  categoryPicker: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 16,
  },
  categoryBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: "#E8F3F0",
    alignItems: "center",
  },
  categoryBtnActive: {
    backgroundColor: "#2E7D6B",
  },
  categoryBtnText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2E7D6B",
  },
  categoryBtnTextActive: {
    color: "#FFFFFF",
  },
});
