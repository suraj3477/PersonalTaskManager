import { StackNavigationProp } from '@react-navigation/stack';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  Dashboard: undefined;
};

export type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;
export type RegisterScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Register'>;
export type DashboardScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Dashboard'>;
