import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Href, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import FloatingHearts from "@/component/Floatingheart";

const LandingScreen: React.FC = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  // Fade + Scale animation on load
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 60,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  // Button press animation
  const onPressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.95,
      useNativeDriver: true,
      friction: 3,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
      friction: 3,
    }).start();
  };

  const [showChoice, setShowChoice] = useState(false);
  const handleGetStarted = () => {
    setShowChoice(true);
  };
  const handleChoice = (type: 'single' | 'couple') => {
    setShowChoice(false);
    if (type === 'couple') {
      router.push("/(onboarding)/coupleOnboarding" as Href);
    } else {
      router.push("/(tabs)" as Href);
    }
  };

  return (
    <LinearGradient
      colors={["#FF6B6B", "#FF8E53", "#FF3CAC"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <FloatingHearts />

      <Animated.View
        style={[
          styles.content,
          { opacity: fadeAnim, transform: [{ scale: scaleAnim }] },
        ]}
      >
  <Text style={styles.logo}>LitAmor 💘</Text>
        <View style={styles.underline} />
        <Text style={styles.subtitle}>
          Find Love, Share Stories & Fly High Together
        </Text>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={handleGetStarted}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          style={{ borderRadius: 35, overflow: "hidden" }}
        >
          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <LinearGradient
              colors={["#FF8E53", "#FF3CAC"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.button}
            >
              <Ionicons name="heart-outline" size={22} color="white" />
              <Text style={styles.buttonText}>Get Started</Text>
              <Ionicons name="arrow-forward" size={22} color="white" />
            </LinearGradient>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
      {showChoice && (
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10,
        }}>
          <View style={{ backgroundColor: 'white', borderRadius: 20, padding: 30, alignItems: 'center', width: 280 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: '#FF3CAC' }}>Are you Single or a Couple?</Text>
            <TouchableOpacity onPress={() => handleChoice('single')} style={{ backgroundColor: '#FF6B6B', borderRadius: 10, padding: 12, marginBottom: 12, width: 180 }}>
              <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>Single</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleChoice('couple')} style={{ backgroundColor: '#FF8E53', borderRadius: 10, padding: 12, width: 180 }}>
              <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>Couple</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </LinearGradient>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 30,
  },
  logo: {
    fontSize: 42,
    fontWeight: "800",
    color: "white",
    marginBottom: 10,
    textAlign: "center",
    letterSpacing: 1.5,
  },
  underline: {
    width: 120,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.7)",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    marginBottom: 50,
    opacity: 0.95,
    lineHeight: 24,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 36,
    paddingVertical: 16,
    borderRadius: 35,
    shadowColor: "#FF3CAC",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 10,
    gap: 12,
    borderWidth: 1.5,
    borderColor: "rgba(255,255,255,0.3)",
  },
  buttonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: 1,
  },
});
