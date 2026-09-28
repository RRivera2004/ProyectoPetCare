import React, { useState } from "react";
import {View,Text,StyleSheet,KeyboardAvoidingView, Platform,ScrollView,TouchableOpacity,Alert,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../type/navigation";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { UseAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

type Props = NativeStackScreenProps<RootStackParamList, "RegisterScreen">;

export default function Register({ navigation }: Props) {
  const { register } = UseAuth();
  const { colors } = useTheme();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Campos incompletos", "Por favor completa el correo y la contraseña.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Contraseña corta", "La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Contraseñas no coinciden", "Por favor verifica que ambas contraseñas sean idénticas.");
      return;
    }

    setLoading(true);
    try {
      await register(email.trim(), password);
      Alert.alert(
        "¡Registro exitoso!",
        "Tu cuenta ha sido creada. Ya puedes iniciar sesión.",
        [
          {
            text: "Continuar",
            onPress: () => navigation.navigate("LoginScreen"),
          },
        ]
      );
    } catch (error: any) {
      console.log("Error al registrarse:", error);
      Alert.alert(
        "Error al registrarse",
        error.message || "No se pudo crear la cuenta. Intenta nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={[styles.backButton, { backgroundColor: colors.surface }]}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <Ionicons name="paw" size={38} color="#FFFFFF" />
          </View>

          <Text style={[styles.title, { color: colors.text }]}>Crear cuenta</Text>

          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Únete a PetCare y comienza a cuidar mejor a tu mascota.
          </Text>
        </View>

        <View
          style={[
            styles.card,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            Información personal
          </Text>

          <CustomInput
            label="Nombre completo"
            placeholder="Ej. María López"
            value={name}
            onChangeText={setName}
          />

          <CustomInput
            label="Correo electrónico"
            placeholder="ejemplo@gmail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <CustomInput
            label="Teléfono"
            placeholder="Ej. 99999999"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            maxLength={10}
          />

          <Text style={[styles.sectionTitle, { color: colors.text }]}>
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
            />

            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={22}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <CustomInput
              label="Confirmar contraseña"
              placeholder="Repite tu contraseña"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showConfirmPassword}
              autoCapitalize="none"
            />

            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <Ionicons
                name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                size={22}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
          </View>

          <CustomButton
            title="Registrarme"
            onPress={handleRegister}
            loading={loading}
          />

          <View style={styles.loginContainer}>
            <Text style={[styles.loginText, { color: colors.textSecondary }]}>
              ¿Ya tienes una cuenta?
            </Text>

            <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
              <Text style={styles.loginLink}> Iniciar sesión</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={[styles.footer, { color: colors.textSecondary }]}>
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
  inputContainer: {
    position: "relative",
  },
  eyeButton: {
    position: "absolute",
    right: 15,
    bottom: 25,
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