import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { RootStackParamList } from "../type/navigation";
import { KeyboardAvoidingView,Platform, ScrollView,StyleSheet,Text,TouchableOpacity,View,Alert,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { UseAuth } from "../contexts/AuthContext";

type Props = NativeStackScreenProps<RootStackParamList, "LoginScreen">;

export default function Login({ navigation }: Props) {
  const { login } = UseAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const handleLogin = async () => {
  
    try {
      await login(email, password);
      navigation.navigate("UserTabs", {screen: "HomeTab",params: { email },
      });
    } catch (error: any) {
      console.log("usuario no tiene acceso", error);
   
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
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

          <Text style={styles.title}>PetCare</Text>

          <Text style={styles.subtitle}>
            El mejor cuidado para tu mejor amigo 🐾
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.welcome}>¡Bienvenido!</Text>

          <Text style={styles.description}>
            Inicia sesión para administrar el cuidado de tu mascota.
          </Text>

          <CustomInput
            label="Correo electrónico"
            placeholder="ejemplo@gmail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
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
                color="#6B7280"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.forgot} onPress={() => {}}>
            <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          <CustomButton
            title={ "Iniciar sesión"}
            onPress={handleLogin}
        
          />

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.orText}>o</Text>
            <View style={styles.divider} />
          </View>

          <CustomButton
            title="Registrarme"
            variant="secondary"
            onPress={() => navigation.navigate("RegisterScreen")}
          
          />
        </View>

        <Text style={styles.footer}>
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
  footer: {
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 13,
    marginTop: 20,
  },
});