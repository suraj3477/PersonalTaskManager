import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import DashboardScreen from '../screens/DashboardScreen';
import { AuthStackParamList } from './types';
import { TaskProvider } from '../context/TaskContext';
import { AuthProvider } from '../context/AuthContext';
import TaskScreen from '../screens/TaskScreen';

const Stack = createStackNavigator<AuthStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <AuthProvider>
        <TaskProvider>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="Task" component={TaskScreen} />
          </Stack.Navigator>
        </TaskProvider>
      </AuthProvider>
    </NavigationContainer>
  );
};

export default AppNavigator;
