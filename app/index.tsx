import FireSvg from "@/components/fireSvg";
import { router } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const RapidFireIntroScreen = () => {
  const handleStart = () => {
    // Navigate to the questionnaire screen by its file name
    router.push("/rapidFire");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          Get ready for a <Text style={styles.rapidText}>rapid fire</Text> vibe
          check <FireSvg width={46} height={44} />
        </Text>

        <Text style={styles.subtitle}>
          Every answer earns points — the more honest you are, the better your
          matches will be.
        </Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleStart}>
        <Text style={styles.buttonText}>Let's Go</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C6C3BF",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  title: {
    fontSize: 48,
    fontWeight: 400,
    textAlign: "left",
    lineHeight: 56,
    marginBottom: 20,
    color: "#000000",
  },
  rapidText: {
    fontSize: 48,
    fontFamily: "Poppins_600SemiBold",
  },

  subtitle: {
    fontSize: 18,
    textAlign: "left",
    color: "#000000",
    lineHeight: 26,
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#6C6C6C",
    paddingVertical: 18,
    paddingHorizontal: 20,
    width: "100%",
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default RapidFireIntroScreen;
