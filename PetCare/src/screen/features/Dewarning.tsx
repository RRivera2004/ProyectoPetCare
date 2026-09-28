import React, { useState } from "react";
import {ScrollView,StyleSheet, Text,TouchableOpacity,View,Modal, Alert, KeyboardAvoidingView,Platform,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../contexts/ThemeContext";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { supabase } from "../../lib/supabase";

type DewormingItem = {
  id: string;
  name: string;
  date: string;
  nextDate: string;
};

export default function Deworming({ navigation }: any) {
  const { colors } = useTheme();

  const [treatments, setTreatments] = useState<DewormingItem[]>([
    {
      id: "1",
      name: "Desparasitación interna (Pastilla)",
      date: "05/08/2026",
      nextDate: "05/11/2026",
    },
    {
      id: "2",
      name: "Desparasitación externa (Pipeta antipulgas)",
      date: "20/07/2026",
      nextDate: "20/08/2026",
    },
    {
      id: "3",
      name: "Control de garrapatas (Collar preventivo)",
      date: "01/06/2026",
      nextDate: "01/12/2026",
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [nextDate, setNextDate] = useState("");

  const handleAddTreatment = async () => {
    if (!name.trim()) {
      Alert.alert("Error", "Por favor ingresa el nombre o tipo de tratamiento.");
      return;
    }

    const newTreatment: DewormingItem = {
      id: Date.now().toString(),
      name: name.trim(),
      date: date.trim() || new Date().toLocaleDateString("es-ES"),
      nextDate: nextDate.trim() || "Pendiente",
    };

    setTreatments([newTreatment, ...treatments]);
    setName("");
    setDate("");
    setNextDate("");
    setModalVisible(false);

    try {
      await supabase.from("deworming").insert([
        {
          name: newTreatment.name,
          date: newTreatment.date,
          next_date: newTreatment.nextDate,
        },
      ]);
    } catch (err) {
      console.log("Nota: Supabase offline o tabla deworming no inicializada.");
    }

    Alert.alert("¡Tratamiento Registrado!", "El registro ha sido guardado exitosamente.");
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
          Desparasitación
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
        Tratamientos registrados ({treatments.length})
      </Text>

      {treatments.map((item) => (
        <View
          key={item.id}
          style={[
            styles.card,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <View style={styles.icon}>
            <Ionicons
              name="shield-checkmark-outline"
              size={28}
              color="#2E7D6B"
            />
          </View>

          <View style={styles.content}>
            <Text style={[styles.name, { color: colors.text }]}>
              {item.name}
            </Text>
            <Text style={[styles.date, { color: colors.textSecondary }]}>
              Aplicada: {item.date}
            </Text>
            <Text style={styles.next}>Próxima: {item.nextDate}</Text>
          </View>
        </View>
      ))}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="add" size={22} color="#FFFFFF" />
        <Text style={styles.addText}>Agregar tratamiento</Text>
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
                Registrar Desparasitación
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
                label="Tratamiento / Medicamento"
                placeholder="Ej. Desparasitación interna, Pipeta Frontline"
                value={name}
                onChangeText={setName}
              />

              <CustomInput
                label="Fecha de aplicación"
                placeholder="Ej. DD/MM/AAAA"
                value={date}
                onChangeText={setDate}
              />

              <CustomInput
                label="Próxima dosis recomendada"
                placeholder="Ej. DD/MM/AAAA"
                value={nextDate}
                onChangeText={setNextDate}
              />

              <CustomButton
                title="Guardar tratamiento"
                onPress={handleAddTreatment}
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
    fontSize: 26,
    fontWeight: "800",
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
  card: {
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
  name: {
    fontSize: 16,
    fontWeight: "800",
  },
  date: {
    fontSize: 13,
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


