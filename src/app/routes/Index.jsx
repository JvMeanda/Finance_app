import React from 'react';
import 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TabRoutes from './Tab.routes';

export default function Routes() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <NavigationContainer>
        <TabRoutes />
      </NavigationContainer>
    </SafeAreaView>
  );
}

