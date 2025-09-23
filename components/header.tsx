import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface HeaderProps {
  isPremium: boolean;
}

const Header: React.FC<HeaderProps> = ({ isPremium }) => (
  <View style={styles.header}>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Text style={styles.headerTitle}>💌 Today’s Match</Text>
    </View>
    <TouchableOpacity
      style={
        isPremium ? styles.premiumButtonActive : styles.premiumButtonInactive
      }
    >
      <Text
        style={
          isPremium
            ? styles.premiumButtonTextActive
            : styles.premiumButtonTextInactive
        }
      >
        {isPremium ? "Premium" : "Go premium"}
      </Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#FFF",
    color: "#000000",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
  },
  premiumButtonInactive: {
    backgroundColor: "#666666",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 18,
  },
  premiumButtonTextInactive: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  premiumButtonActive: {
    backgroundColor: "#666666",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  premiumButtonTextActive: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default Header;
