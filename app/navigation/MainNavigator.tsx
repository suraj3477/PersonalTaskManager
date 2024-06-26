// navigation/MainNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DashboardScreen from '../screens/DashboardScreen';
import TaskScreen from '../screens/TaskScreen';

const Stack = createStackNavigator();

const MainNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="Task" component={TaskScreen} />
        </Stack.Navigator>
    );
};

export default MainNavigator;
