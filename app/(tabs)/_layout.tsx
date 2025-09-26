import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { TouchableOpacity, useColorScheme } from "react-native";
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#C6C3BF",
        tabBarInactiveTintColor: "#C6C3BF",
        tabBarButton: (props) => (
          <TouchableOpacity {...props} activeOpacity={1} />
        ),

        tabBarStyle: {
          backgroundColor: "#444444",
          borderTopColor: "#222",
          height: 80,
          paddingTop: 10,
          paddingBottom: 20,
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.3,
          shadowRadius: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="litstreak"
        options={{
          title: "Lit Streak",

          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="fire" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="createCapsule"
        options={{
          href: null,
          // tabBarButton: () => null,
        }}
      />
    </Tabs>
  );
}
