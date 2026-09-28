import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Alert, KeyboardAvoidingView, Platform,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../contexts/ThemeContext";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";

export default function Profile() {
  const { colors } = useTheme();

  const [pet, setPet] = useState({
    name: "Luna",
    breed: "Labrador Retriever",
    age: "2 años",
    weight: "18",
    gender: "Hembra",
    chip: "981098102345",
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [editName, setEditName] = useState(pet.name);
  const [editBreed, setEditBreed] = useState(pet.breed);
  const [editAge, setEditAge] = useState(pet.age);
  const [editWeight, setEditWeight] = useState(pet.weight);
  const [editGender, setEditGender] = useState(pet.gender);

  const openModal = () => {
    setEditName(pet.name);
    setEditBreed(pet.breed);
    setEditAge(pet.age);
    setEditWeight(pet.weight);
    setEditGender(pet.gender);
    setModalVisible(true);
  };

  const handleSave = () => {
    if (!editName.trim()) {
      Alert.alert("Error", "El nombre de la mascota no puede estar vacío.");
      return;
    }

    setPet({
      ...pet,
      name: editName.trim(),
      breed: editBreed.trim() || pet.breed,
      age: editAge.trim() || pet.age,
      weight: editWeight.trim() || pet.weight,
      gender: editGender.trim() || pet.gender,
    });

    setModalVisible(false);
    Alert.alert("Éxito", "La información de tu mascota ha sido actualizada.");
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <Text style={[styles.title, { color: colors.text }]}>Mi mascota</Text>

    
      <View
        style={[
          styles.profileCard,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <View style={styles.photo}>
          <Text style={styles.petEmoji}>🐶</Text>
        </View>

        <Text style={[styles.name, { color: colors.text }]}>{pet.name}</Text>
        <Text style={[styles.breed, { color: colors.textSecondary }]}>
          {pet.breed}
        </Text>

        <View style={styles.details}>
          <View style={styles.detail}>
            <Ionicons name="calendar-outline" size={22} color="#2E7D6B" />
            <Text style={[styles.detailText, { color: colors.textSecondary }]}>
              {pet.age}
            </Text>
          </View>

          <View style={styles.detail}>
            <Ionicons name="scale-outline" size={22} color="#2E7D6B" />
            <Text style={[styles.detailText, { color: colors.textSecondary }]}>
              {pet.weight} kg
            </Text>
          </View>

          <View style={styles.detail}>
            <Ionicons name="male-female-outline" size={22} color="#2E7D6B" />
            <Text style={[styles.detailText, { color: colors.textSecondary }]}>
              {pet.gender}
            </Text>
          </View>
        </View>
      </View>

      <Text style={[styles.sectionTitle, { color: colors.text }]}>
        Ficha Médica y Datos
      </Text>

   
      <View
        style={[
          styles.infoCard,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <View style={styles.row}>
          <Ionicons name="paw-outline" size={22} color="#2E7D6B" />
          <View style={styles.rowText}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>
              Nombre
            </Text>
            <Text style={[styles.value, { color: colors.text }]}>
              {pet.name}
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <Ionicons name="heart-outline" size={22} color="#2E7D6B" />
          <View style={styles.rowText}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>
              Raza / Especie
            </Text>
            <Text style={[styles.value, { color: colors.text }]}>
              {pet.breed}
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <Ionicons name="male-female-outline" size={22} color="#2E7D6B" />
          <View style={styles.rowText}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>
              Sexo
            </Text>
            <Text style={[styles.value, { color: colors.text }]}>
              {pet.gender}
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <Ionicons name="barcode-outline" size={22} color="#2E7D6B" />
          <View style={styles.rowText}>
            <Text style={[styles.label, { color: colors.textSecondary }]}>
              Microchip / Identificador
            </Text>
            <Text style={[styles.value, { color: colors.text }]}>
              {pet.chip}
            </Text>
          </View>
        </View>
      </View>

     
      <TouchableOpacity style={styles.button} onPress={openModal}>
        <Ionicons name="create-outline" size={21} color="#FFFFFF" />
        <Text style={styles.buttonText}>Editar información</Text>
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
                Editar Mascota
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
                label="Nombre"
                placeholder="Nombre de la mascota"
                value={editName}
                onChangeText={setEditName}
              />

              <CustomInput
                label="Raza / Especie"
                placeholder="Ej. Labrador"
                value={editBreed}
                onChangeText={setEditBreed}
              />

              <CustomInput
                label="Edad"
                placeholder="Ej. 2 años"
                value={editAge}
                onChangeText={setEditAge}
              />

              <CustomInput
                label="Peso (kg)"
                placeholder="Ej. 18"
                value={editWeight}
                onChangeText={setEditWeight}
                keyboardType="numeric"
              />

              <CustomInput
                label="Sexo"
                placeholder="Macho / Hembra"
                value={editGender}
                onChangeText={setEditGender}
              />

              <CustomButton title="Guardar cambios" onPress={handleSave} />

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
  title: {
    fontSize: 30,
    fontWeight: "800",
    marginTop: 40,
    marginBottom: 20,
  },
  profileCard: {
    borderRadius: 22,
    alignItems: "center",
    padding: 22,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E8F3F0",
    justifyContent: "center",
    alignItems: "center",
  },
  petEmoji: {
    fontSize: 55,
  },
  name: {
    fontSize: 26,
    fontWeight: "800",
    marginTop: 12,
  },
  breed: {
    fontSize: 16,
    marginTop: 3,
  },
  details: {
    flexDirection: "row",
    marginTop: 18,
    gap: 24,
  },
  detail: {
    alignItems: "center",
  },
  detailText: {
    marginTop: 4,
    fontSize: 13,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    marginTop: 25,
    marginBottom: 12,
  },
  infoCard: {
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  rowText: {
    marginLeft: 14,
    flex: 1,
  },
  label: {
    fontSize: 12,
  },
  value: {
    fontSize: 16,
    fontWeight: "700",
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
    marginBottom: 35,
  },
  buttonText: {
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
