import React, { useState } from "react";
import {View, Text,StyleSheet,KeyboardAvoidingView,Platform,ScrollView,TouchableOpacity, ActivityIndicator,} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../type/navigation";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { UseAuth } from "../contexts/AuthContext";



type Props = NativeStackScreenProps<
  RootStackParamList,
  "RegisterScreen"
>;

export default function Register({ navigation }: Props) {
  const { register } = UseAuth(); 

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);



 const handleRegister = async () => {
    try {
      await register(email, password);
      navigation.navigate("LoginScreen");
    } catch (error: any) {
      console.log("error al registrarse: ", error.message);
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
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#1F2937" />
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <Ionicons name="paw" size={38} color="#FFFFFF" />
          </View>

          <Text style={styles.title}>Crear cuenta</Text>

          <Text style={styles.subtitle}>
            Únete a PetCare y comienza a cuidar mejor a tu mascota.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Información personal</Text>

          <CustomInput
            label="Nombre completo"
            placeholder="Ej. María López"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
            
          />

          <CustomInput
            label="Correo electrónico"
            placeholder="ejemplo@gmail.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
           
          />

          <CustomInput
            label="Teléfono"
            placeholder="Ej. 99999999"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            maxLength={8}
    
          />

          <Text style={styles.sectionTitle}>Seguridad</Text>

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
                color="#6B7280"
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
                color="#6B7280"
              />
            </TouchableOpacity>
          </View>
          
         
          <CustomButton 
          title={"Registrarme"} 
          onPress={handleRegister} 
          />
          
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>¿Ya tienes una cuenta?</Text>

            <CustomButton
           title="Ya tengo cuenta"
           onPress={() => navigation.navigate("LoginScreen")}
           variant="secondary"
           />
              <Text style={styles.loginLink}>Iniciar sesión</Text>
            
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