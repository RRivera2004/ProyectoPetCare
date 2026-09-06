import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Home from "../screens/Home";
import Profile from "../screens/features/Profile";
import Settings from "../screens/features/Settings";
import { TabsParamList } from "../src/type/navigation";


const Tab =
  createBottomTabNavigator<TabsParamList>();

export default function TabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarActiveTintColor: "#2E7D6B",
        tabBarInactiveTintColor: "#9CA3AF",

        tabBarStyle: {
          height: 65,
          paddingBottom: 8,
          paddingTop: 5,
        },

        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === "HomeTab") {
            iconName = "home-outline";
          } else if (route.name === "Profile") {
            iconName = "paw-outline";
          } else {
            iconName = "settings-outline";
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={Home}
        options={{
          title: "Inicio",
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Mascota",
        }}
      />

      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          title: "Preferencias",
        }}
      />
    </Tab.Navigator>
  );
}