import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Task } from '../context/TaskContext';  // Import Task type from your context file

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  Dashboard: undefined;
  Task: { task?: Task };  // Define task as an optional parameter
};

export type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;
export type RegisterScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Register'>;
export type DashboardScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Dashboard'>;
export type TaskScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Task'>;

export type TaskScreenRouteProp = RouteProp<AuthStackParamList, 'Task'>;
