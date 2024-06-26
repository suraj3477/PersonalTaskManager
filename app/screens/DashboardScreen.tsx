// screens/DashboardScreen.tsx
import React from 'react';
import { View, Text, Button } from 'react-native';
import { DashboardScreenNavigationProp } from '../navigation/types';
 
type Props = {
  navigation: DashboardScreenNavigationProp;
};

const DashboardScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View>
      <Text>Dashboard Screen</Text>
      <Button title="Task" onPress={() => navigation.navigate('Task')} />
    </View>
  );
};

export default DashboardScreen;