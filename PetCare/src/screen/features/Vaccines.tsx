import React, { useState } from "react";
import { View,Text,StyleSheet, ScrollView,TouchableOpacity,Modal,Alert,KeyboardAvoidingView,Platform,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../contexts/ThemeContext";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { supabase } from "../../lib/supabase";

type VaccineItem = {
  id: string;
  name: string;
  date: string;
  nextDate: string;
};

export default function Vaccines({ navigation }: any) {
  const { colors } = useTheme();

  const [vaccines, setVaccines] = useState<VaccineItem[]>([
    {
      id: "1",
      name: "Vacuna antirrábica",
      date: "15/03/2026",
      nextDate: "15/09/2026",
    },
    {
      id: "2",
      name: "Vacuna séxtuple (DHPP)",
      date: "10/01/2026",
      nextDate: "10/01/2027",
    },
    {
      id: "3",
      name: "Tos de las perreras (Bordetella)",
      date: "05/11/2025",
      nextDate: "05/11/2026",
    },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [nextDate, setNextDate] = useState("");

  const handleAddVaccine = async () => {
    if (!name.trim()) {
      Alert.alert("Error", "Por favor ingresa el nombre de la vacuna.");
      return;
    }

    const newVaccine: VaccineItem = {
      id: Date.now().toString(),
      name: name.trim(),
      date: date.trim() || new Date().toLocaleDateString("es-ES"),
      nextDate: nextDate.trim() || "Pendiente",
    };

    setVaccines([newVaccine, ...vaccines]);
    setName("");
    setDate("");
    setNextDate("");
    setModalVisible(false);

    
    try {
      await supabase.from("vaccines").insert([
        {
          name: newVaccine.name,
          date: newVaccine.date,
          next_date: newVaccine.nextDate,
        },
      ]);
    } catch (err) {
      console.log("Nota: Supabase offline o tabla vaccines no inicializada.");
    }

    Alert.alert("¡Registrado!", "La vacuna ha sido agregada con éxito.");
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

        <Text style={[styles.title, { color: colors.text }]}>Vacunas</Text>
      </View>

    
      <View
        style={[
          styles.infoCard,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <Ionicons name="medical-outline" size={40} color="#2E7D6B" />

        <View style={styles.info}>
          <Text style={[styles.petName, { color: colors.text }]}>Luna</Text>
          <Text style={[styles.petInfo, { color: colors.textSecondary }]}>
            Labrador · 2 años
          </Text>
        </View>
      </View>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Registro de vacunas ({vaccines.length})
      </Text>

      {vaccines.map((item) => (
        <View
          key={item.id}
          style={[
            styles.vaccineCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <View style={styles.icon}>
            <Ionicons name="checkmark-circle" size={30} color="#2E7D6B" />
          </View>

          <View style={styles.content}>
            <Text style={[styles.vaccineName, { color: colors.text }]}>
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
        <Text style={styles.addText}>Agregar vacuna</Text>
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
                Registrar Nueva Vacuna
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
                label="Nombre de la vacuna"
                placeholder="Ej. Antirrábica, Parvovirus, Polivalente"
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
                label="Fecha próxima dosis"
                placeholder="Ej. DD/MM/AAAA"
                value={nextDate}
                onChangeText={setNextDate}
              />

              <CustomButton
                title="Guardar vacuna"
                onPress={handleAddVaccine}
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
    fontSize: 28,
    fontWeight: "800",
  },
  infoCard: {
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
    borderWidth: 1,
  },
  info: {
    marginLeft: 15,
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
  vaccineCard: {
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
    marginLeft: 14,
    flex: 1,
  },
  vaccineName: {
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

