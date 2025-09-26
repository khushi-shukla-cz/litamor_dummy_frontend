import { router } from "expo-router";
import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import SimpleSlideUnlock from "../components/sliderUnlock";
const SplashScreen: React.FC = () => {
  const handleSlideComplete = () => {
    router.replace("/(tabs)");
  };

  return (
    <ImageBackground
      source={require("../assets/images/mainScreen.jpg")}
      style={styles.splashBackground}
      resizeMode="cover"
    >
      <View style={styles.splashContent}>
        <Text style={styles.splashTitle}>Your Time Capsule</Text>
        <Text style={styles.splashSubtitle}>
          A magical space to capture your memories, seal them with love, and
          unlock them in the future – reliving emotions, surprises, and stories
          across time.
        </Text>

        <SimpleSlideUnlock onSlideComplete={handleSlideComplete} />

        <Text style={styles.splashPrivacyText}>Privacy Policy</Text>
      </View>
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  splashBackground: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 40,
  },
  splashContent: {
    paddingHorizontal: 10,
    alignItems: "flex-start",
    width: "100%",
  },
  splashTitle: {
    fontSize: 50,
    fontWeight: "bold",
    color: "white",
    // textAlign: "center",
    marginBottom: 15,
    left: 0,
  },
  splashSubtitle: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    lineHeight: 24,
  },
  // --- Old button styles are removed ---
  splashPrivacyText: { color: "#AAA", paddingLeft: 140 },
});
