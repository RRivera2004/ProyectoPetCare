import { NavigatorScreenParams } from "@react-navigation/native";

export type TabsParamList = {
  HomeTab: {email?: string} | undefined;
  Profile: undefined;
  Settings: undefined;
};



export type RootStackParamList = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  UserTabs: NavigatorScreenParams<TabsParamList>;

  Vaccines: undefined;
  Deworming: undefined;
  Reminders: undefined;
  VeterinaryHistory: undefined;
};


