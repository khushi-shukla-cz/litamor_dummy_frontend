import { Feather } from "@expo/vector-icons";
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TabIconProps {
  name: keyof typeof Feather.glyphMap;
  label: string;
  isFocused: boolean;
  onPress: () => void;
}

const TabIcon = ({ name, label, isFocused, onPress }: TabIconProps) => (
  <TouchableOpacity onPress={onPress} style={styles.navItem}>
    <Feather name={name} size={24} color={isFocused ? "#ffffff" : "#C6C3BF"} />
    <Text
      style={[
        styles.navText,
        isFocused ? styles.activeNavText : styles.inactiveNavText
      ]}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

interface BottomNavigationProps {
  activeTab: string;
  onTabPress: (tabName: string) => void;
}

const BottomNavigation: React.FC<BottomNavigationProps> = ({ activeTab, onTabPress }) => {
  return (
    <View style={styles.bottomNavigation}>
      <TabIcon
        name="home"
        label="Home"
        isFocused={activeTab === "Home"}
        onPress={() => onTabPress("Home")}
      />
      <TabIcon
        name="search"
        label="Explore"
        isFocused={activeTab === "Explore"}
        onPress={() => onTabPress("Explore")}
      />
      <TabIcon
        name="message-circle"
        label="Message"
        isFocused={activeTab === "Message"}
        onPress={() => onTabPress("Message")}
      />
      <TabIcon
        name="user"
        label="Profile"
        isFocused={activeTab === "Profile"}
        onPress={() => onTabPress("Profile")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNavigation: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#444444',
    paddingVertical: 8,
    paddingBottom: 8,
    height: 65,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  activeNavText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  inactiveNavText: {
    color: '#C6C3BF',
    fontWeight: 'semibold',
  },
});

export default BottomNavigation; 