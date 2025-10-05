import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const TabBar = () => (
  <View style={styles.tabBar}>
    <View style={styles.tabItem}>
      <Ionicons name="home" size={24} color="#FFF" />
      <Text style={[styles.tabText, { color: "#FFF" }]}>Home</Text>
    </View>
    <View style={styles.tabItem}>
      <Ionicons name="search" size={24} color="#FFF" />
      <Text style={styles.tabText}>Explore</Text>
    </View>
    <View style={styles.tabItem}>
      <Ionicons name="chatbubble-ellipses-outline" size={24} color="#FFF" />
      <Text style={styles.tabText}>Message</Text>
    </View>
    <View style={styles.tabItem}>
      <Ionicons name="person-circle-outline" size={24} color="#FFF" />
      <Text style={styles.tabText}>Profile</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    backgroundColor: "#444444",
  },
  tabItem: {
    alignItems: "center",
    gap: 2,
  },
  tabText: {
    fontSize: 12,
    color: "#FFF",
  },
});

export default TabBar;