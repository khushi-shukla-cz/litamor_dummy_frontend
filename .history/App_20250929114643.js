import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';

// Import screens
import StartScreen from './screens/StartScreen';
import QuizScreen from './screens/QuizScreen';
import CompleteScreen from './screens/CompleteScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator 
        initialRouteName="Start"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Complete" component={CompleteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}