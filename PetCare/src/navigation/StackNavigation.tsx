import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../type/navigation";
import Login from "../screen/Login";
import Register from "../screen/Register";
import TabsNavigator from "./TabsNavigation";
import Vaccines from "../screen/features/Vaccines";
import Deworming from "../screen/features/Dewarning";
import Reminders from "../screen/features/Reminders";
import VeterinaryHistory from "../screen/features/VeterinaryHistory";






const Stack =
  createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="LoginScreen"
        component={Login}
      />

      <Stack.Screen
        name="RegisterScreen"
        component={Register}
      />

      <Stack.Screen
        name="UserTabs"
        component={TabsNavigator}
      />

      <Stack.Screen
        name="Vaccines"
        component={Vaccines}
      />

      <Stack.Screen
        name="Deworming"
        component={Deworming}
      />

      <Stack.Screen
        name="Reminders"
        component={Reminders}
      />

      <Stack.Screen
        name="VeterinaryHistory"
        component={VeterinaryHistory}
      />
    </Stack.Navigator>
  );
}
