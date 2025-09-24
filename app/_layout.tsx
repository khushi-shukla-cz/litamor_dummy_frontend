import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import '../global.css';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Hide the splash screen after the assets have been loaded and the store has hydrated.
    SplashScreen.hideAsync();
  }, []);

  return (
        <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index"/>
      </Stack>
  );
} 