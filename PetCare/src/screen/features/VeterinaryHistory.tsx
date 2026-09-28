import React, { useState } from "react";
import {View,Text,StyleSheet, ScrollView,TouchableOpacity,Modal,Alert,KeyboardAvoidingView,Platform,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../contexts/ThemeContext";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { supabase } from "../../lib/supabase";

type HistoryItem = {
  id: string;
  day: string;
  month: string;
  title: string;
  description: string;
  vet: string;
};

export default function VeterinaryHistory({ navigation }: any) {
  const { colors } = useTheme();

  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: "1",
      day: "12",
      month: "AGO",
      title: "Consulta general y control de peso",
      description: "Revisión general, peso 18 kg, condición corporal óptima.",
      vet: "Veterinaria: Dra. María López",
    },
    {
      id: "2",
      day: "05",
      month: "JUL",
      title: "Control de vacunas y desparasitación",
      description: "Revisión de cartilla preventiva y aplicación de antiparasitario.",
      vet: "Veterinaria: Dra. María López",
    },
    {
      id: "3",
      day: "18",
      month: "MAY",
      title: "Limpieza y profilaxis dental",
      description: "Revisión de placa bacteriana, encías saludables y recomendaciones.",
      vet: "Dr. Carlos Méndez",
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [vetName, setVetName] = useState("");
  const [description, setDescription] = useState("");

  const handleAddConsultation = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Por favor ingresa el motivo o título de la consulta.");
      return;
    }

    const today = new Date();
    const months = [
      "ENE", "FEB", "MAR", "ABR", "MAY", "JUN",
      "JUL", "AGO", "SEP", "OCT", "NOV", "DIC",
    ];

    let day = today.getDate().toString().padStart(2, "0");
    let month = months[today.getMonth()];

    if (dateStr.trim().includes("/")) {
      const parts = dateStr.trim().split("/");
      if (parts[0]) day = parts[0].padStart(2, "0");
      if (parts[1] && !isNaN(Number(parts[1]))) {
        const mIdx = Number(parts[1]) - 1;
        if (months[mIdx]) month = months[mIdx];
      }
    }

    const newItem: HistoryItem = {
      id: Date.now().toString(),
      day,
      month,
      title: title.trim(),
      description: description.trim() || "Revisión rutinaria sin novedades.",
      vet: vetName.trim()
        ? `Veterinario/a: ${vetName.trim()}`
        : "Veterinaria: Dra. María López",
    };

    setHistory([newItem, ...history]);
    setTitle("");
    setDateStr("");
    setVetName("");
    setDescription("");
    setModalVisible(false);

    try {
      await supabase.from("veterinary_history").insert([
        {
          title: newItem.title,
          description: newItem.description,
          vet: newItem.vet,
          day: newItem.day,
          month: newItem.month,
        },
      ]);
    } catch (err) {
      console.log("Nota: Supabase offline o tabla veterinary_history no inicializada.");
    }

    Alert.alert("¡Consulta registrada!", "Se ha guardado en el historial médico.");
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

        <Text style={[styles.title, { color: colors.text }]}>
          Historial veterinario
        </Text>
      </View>

      <View
        style={[
          styles.petCard,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <Text style={styles.petEmoji}>🐕</Text>

        <View>
          <Text style={[styles.petName, { color: colors.text }]}>Luna</Text>
          <Text style={[styles.petInfo, { color: colors.textSecondary }]}>
            Labrador · 2 años
          </Text>
        </View>
      </View>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Consultas y atenciones ({history.length})
      </Text>

      {history.map((item) => (
        <View
          key={item.id}
          style={[
            styles.historyCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <View style={styles.dateBox}>
            <Text style={styles.day}>{item.day}</Text>
            <Text style={styles.month}>{item.month}</Text>
          </View>

          <View style={styles.content}>
            <Text style={[styles.historyTitle, { color: colors.text }]}>
              {item.title}
            </Text>

            <Text style={[styles.description, { color: colors.textSecondary }]}>
              {item.description}
            </Text>

            <Text style={styles.vet}>{item.vet}</Text>
          </View>
        </View>
      ))}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={22} color="#FFFFFF" />
        <Text style={styles.addText}>Agregar consulta</Text>
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
                Registrar Consulta Veterinaria
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
              <CustomInput
                label="Motivo de la consulta"
                placeholder="Ej. Chequeo anual, Otitis, Control postoperatorio"
                value={title}
                onChangeText={setTitle}
              />

              <CustomInput
                label="Fecha (DD/MM/AAAA)"
                placeholder="Ej. 12/08/2026"
                value={dateStr}
                onChangeText={setDateStr}
              />

              <CustomInput
                label="Veterinario o Clínica"
                placeholder="Ej. Dra. María López - VetCare Clinic"
                value={vetName}
                onChangeText={setVetName}
              />

              <CustomInput
                label="Diagnóstico / Indicaciones"
                placeholder="Detalles de la revisión o tratamiento indicado"
                value={description}
                onChangeText={setDescription}
                multiline={true}
                numberOfLines={3}
              />

              <CustomButton
                title="Guardar consulta"
                onPress={handleAddConsultation}
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
    marginBottom: 25,
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
    fontSize: 25,
    fontWeight: "800",
    flex: 1,
  },
  petCard: {
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    borderWidth: 1,
  },
  petEmoji: {
    fontSize: 45,
    marginRight: 15,
  },
  petName: {
    fontSize: 20,
    fontWeight: "800",
  },
  petInfo: {
    marginTop: 3,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: "800",
    marginBottom: 12,
  },
  historyCard: {
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    marginBottom: 12,
    borderWidth: 1,
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
  },
  description: {
    fontSize: 13,
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
});

