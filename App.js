import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChracterListScreen from './screens/ChractersListScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ChractersListScreen"
        screenOptions={{headerShown: false}}
      >
        <Stack.Screen name="ChractersListScreen" component={ChracterListScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}