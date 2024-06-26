// navigation/types.ts
import { StackNavigationProp } from "@react-navigation/stack";

export type MainStackParamList = {
  Dashboard: undefined;
  Task: undefined;
  Main: undefined;
};

export type DashboardScreenNavigationProp = StackNavigationProp<
  MainStackParamList,
  "Dashboard"
>;


export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  Dashboard: undefined;  
};

export type LoginScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "Login"
>;
export type RegisterScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "Register"
>;
