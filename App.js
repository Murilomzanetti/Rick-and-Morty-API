import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ChractersListScreen from './screens/ChractersListScreen';
import CharacterDetailsScreen from './screens/CharacterDetailsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="ChractersListScreen"
        screenOptions={{headerShown: false}}
      >
        <Stack.Screen name="ChractersListScreen" component={ChractersListScreen}/>
        <Stack.Screen name="CharacterDetailsScreen" component={CharacterDetailsScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}