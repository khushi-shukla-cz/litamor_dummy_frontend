import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import "../global.css";

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
        headerStyle: {
          backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
        },
        headerTintColor: colorScheme === 'dark' ? '#fff' : '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShown: false

      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="screens" />
      <Stack.Screen name="chat" />
      <Stack.Screen name="chatScreen" />
      <Stack.Screen name="request" />

      {/* Hide header only for PremiumUpgrade */}
      <Stack.Screen name="loveLetterPremium" options={{ headerShown: false }} />

      {/* Hide header only for PremiumUpgrade */}
      <Stack.Screen name="loveLetter" options={{ headerShown: false }} />
    </Stack>
  );
}
