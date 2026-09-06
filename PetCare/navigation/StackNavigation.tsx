import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "../screens/Login";
import Register from "../screens/Register";


import Vaccines from "../screens/features/Vaccines";
import Deworming from "../screens/features/Deworming";
import Reminders from "../screens/features/Reminders";
import VeterinaryHistory from "../screens/features/VeterinaryHistory";
import TabsNavigator from "./TabsNavigation";
import { RootStackParamList } from "../src/type/navigation";



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
