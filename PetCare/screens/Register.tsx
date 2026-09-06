import React, { useState } from "react";
import {View,Text,StyleSheet,KeyboardAvoidingView,Platform, ScrollView,TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import CustomInput from "../src/components/CustomInput";
import CustomButton from "../src/components/CustomButton";
import { RootStackParamList } from "../src/type/navigation";


type Props = NativeStackScreenProps<
  RootStackParamList,
  "RegisterScreen"
>;

export default function Register({ navigation }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] =
    useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const validatePhone = (value: string) => {
    return /^[0-9]{8}$/.test(value);
  };

  const handleRegister = () => {
    let valid = true;

    setNameError("");
    setEmailError("");
    setPhoneError("");
    setPasswordError("");
    setConfirmPasswordError("");

  
    if (!name.trim()) {
      setNameError("El nombre es obligatorio.");
      valid = false;
    }

   
    if (!email.trim()) {
      setEmailError("El correo electrónico es obligatorio.");
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Ingresa un correo electrónico válido.");
      valid = false;
    }

    
    if (!phone.trim()) {
      setPhoneError("El teléfono es obligatorio.");
      valid = false;
    } else if (!validatePhone(phone)) {
      setPhoneError(
        "El teléfono debe contener 8 números."
      );
      valid = false;
    }

  
    if (!password.trim()) {
      setPasswordError("La contraseña es obligatoria.");
      valid = false;
    } else if (password.length < 6) {
      setPasswordError(
        "La contraseña debe tener al menos 6 caracteres."
      );
      valid = false;
    }

   
    if (!confirmPassword.trim()) {
      setConfirmPasswordError(
        "Debes confirmar la contraseña."
      );
      valid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError(
        "Las contraseñas no coinciden."
      );
      valid = false;
    }

    if (!valid) {
      return;
    }

    
    navigation.replace("LoginScreen");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === "ios" ? "padding" : undefined
      }
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        {/* Encabezado */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color="#1F2937"
            />
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <Ionicons
              name="paw"
              size={38}
              color="#FFFFFF"
            />
          </View>

          <Text style={styles.title}>Crear cuenta</Text>

          <Text style={styles.subtitle}>
            Únete a PetCare y comienza a cuidar mejor a tu
            mascota.
          </Text>
        </View>

        {/* Formulario */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Información personal
          </Text>

          <CustomInput
            label="Nombre completo"
            placeholder="Ej. María López"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            error={nameError}
          />

          <CustomInput
            label="Correo electrónico"
            placeholder="ejemplo@gmail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            error={emailError}
          />

          <CustomInput
            label="Teléfono"
            placeholder="Ej. 99999999"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            maxLength={8}
            error={phoneError}
          />

          <Text style={styles.sectionTitle}>
            Seguridad
          </Text>

          <View>
            <CustomInput
              label="Contraseña"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              error={passwordError}
            />

            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() =>
                setShowPassword(!showPassword)
              }
            >
              <Ionicons
                name={
                  showPassword
                    ? "eye-off-outline"
                    : "eye-outline"
                }
                size={22}
                color="#6B7280"
              />
            </TouchableOpacity>
          </View>

          <View>
            <CustomInput
              label="Confirmar contraseña"
              placeholder="Repite tu contraseña"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
              error={confirmPasswordError}
            />

            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
            >
              <Ionicons
                name={
                  showConfirmPassword
                    ? "eye-off-outline"
                    : "eye-outline"
                }
                size={22}
                color="#6B7280"
              />
            </TouchableOpacity>
          </View>

          <CustomButton
            title="Crear mi cuenta"
            onPress={handleRegister}
          />

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>
              ¿Ya tienes una cuenta?
            </Text>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate("LoginScreen")
              }
            >
              <Text style={styles.loginLink}>
                Iniciar sesión
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.footer}>
          🐾 Tu mascota merece el mejor cuidado.
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F9FC",
  },

  scroll: {
    flexGrow: 1,
    padding: 20,
  },

  header: {
    alignItems: "center",
    marginBottom: 20,
  },

  backButton: {
    alignSelf: "flex-start",
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  logoContainer: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: "#2E7D6B",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#1F2937",
  },

  subtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
    marginTop: 5,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 22,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 4,
  },

  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#1F2937",
    marginBottom: 15,
    marginTop: 5,
  },

  eyeButton: {
    position: "absolute",
    right: 15,
    bottom: 29,
  },

  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  loginText: {
    color: "#6B7280",
    fontSize: 14,
  },

  loginLink: {
    color: "#2E7D6B",
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 5,
  },

  footer: {
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 13,
    marginTop: 20,
  },
});