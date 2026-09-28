import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { RootStackParamList } from "../type/navigation";
import {KeyboardAvoidingView,Platform, ScrollView,StyleSheet,Text,TouchableOpacity,View,Alert} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { UseAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

type Props = NativeStackScreenProps<RootStackParamList, "LoginScreen">;

export default function Login({ navigation }: Props) {
  const { login, loginGuest } = UseAuth();
  const { colors } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Campos requeridos", "Por favor ingresa tu correo y contraseña.");
      return;
    }

    setLoading(true);
    try {
      await login(email.trim(), password);
      navigation.navigate("UserTabs", {
        screen: "HomeTab",
        params: { email: email.trim() },
      });
    } catch (error: any) {
      console.log("Error de login:", error);
      Alert.alert(
        "Error al iniciar sesión",
        error.message || "Credenciales incorrectas o usuario no registrado."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = () => {
    loginGuest();
    navigation.navigate("UserTabs", {
      screen: "HomeTab",
      params: { email: "invitado@petcare.com" },
    });
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
          <View style={styles.logoContainer}>
            <Ionicons name="paw" size={42} color="#FFFFFF" />
          </View>

          <Text style={[styles.title, { color: colors.text }]}>PetCare</Text>

          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            El mejor cuidado para tu mejor amigo 🐾
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
          <Text style={[styles.welcome, { color: colors.text }]}>
            ¡Bienvenido!
          </Text>

          <Text style={[styles.description, { color: colors.textSecondary }]}>
            Inicia sesión para administrar el cuidado de tu mascota.
          </Text>

          <CustomInput
            label="Correo electrónico"
            placeholder="ejemplo@gmail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <View>
            <CustomInput
              label="Contraseña"
              placeholder="Ingresa tu contraseña"
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

          <TouchableOpacity
            style={styles.forgot}
            onPress={() =>
              Alert.alert(
                "Recuperación",
                "Puedes ingresar directamente en el modo invitado o registrar una cuenta nueva."
              )
            }
          >
            <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          <CustomButton
            title="Iniciar sesión"
            onPress={handleLogin}
            loading={loading}
          />

          <View style={styles.dividerContainer}>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
            <Text style={[styles.orText, { color: colors.textSecondary }]}>
              o
            </Text>
            <View style={[styles.divider, { backgroundColor: colors.border }]} />
          </View>

          <CustomButton
            title="Registrarme"
            variant="secondary"
            onPress={() => navigation.navigate("RegisterScreen")}
          />

          <TouchableOpacity
            style={styles.guestButton}
            onPress={handleGuestLogin}
          >
            <Ionicons name="sparkles-outline" size={18} color="#2E7D6B" />
            <Text style={styles.guestText}>Ingresar en Modo Demostración</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.footer, { color: colors.textSecondary }]}>
          🐾 Cuida, recuerda y disfruta cada momento.
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
    justifyContent: "center",
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 25,
  },
  logoContainer: {
    width: 78,
    height: 78,
    borderRadius: 39,
    backgroundColor: "#2E7D6B",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#1F2937",
  },
  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
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
  welcome: {
    fontSize: 25,
    fontWeight: "800",
    color: "#1F2937",
  },
  description: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 21,
    marginTop: 5,
    marginBottom: 22,
  },
  eyeButton: {
    position: "absolute",
    right: 15,
    bottom: 29,
  },
  forgot: {
    alignSelf: "flex-end",
    marginTop: -5,
    marginBottom: 10,
  },
  forgotText: {
    color: "#2E7D6B",
    fontSize: 14,
    fontWeight: "600",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 18,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  orText: {
    marginHorizontal: 12,
    color: "#9CA3AF",
    fontSize: 14,
  },
  guestButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 14,
    paddingVertical: 10,
  },
  guestText: {
    color: "#2E7D6B",
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 6,
  },
  footer: {
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 13,
    marginTop: 20,
  },
});