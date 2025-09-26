import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width: screenWidth } = Dimensions.get("window");

interface SimpleSlideUnlockProps {
  onSlideComplete: () => void;
  text?: string;
  buttonText?: string;
  containerWidth?: number;
}

const SimpleSlideUnlock: React.FC<SimpleSlideUnlockProps> = ({
  onSlideComplete,
  text = "Seal Your Capsule",

  containerWidth = screenWidth - 40,
}) => {
  const buttonWidth = 90;
  const maxSlideDistance = containerWidth - buttonWidth - 8 - 8;

  const translateX = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(1)).current;
  const [isSliding, setIsSliding] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        return Math.abs(gestureState.dx) > Math.abs(gestureState.dy);
      },
      onPanResponderGrant: () => {
        setIsSliding(true);
      },
      onPanResponderMove: (evt, gestureState) => {
        const newValue = Math.max(
          0,
          Math.min(maxSlideDistance, gestureState.dx)
        );
        translateX.setValue(newValue);

        // Update text opacity based on slide progress
        const progress = newValue / maxSlideDistance;
        textOpacity.setValue(1 - progress * 0.7);
      },
      onPanResponderRelease: (evt, gestureState) => {
        const currentPosition = gestureState.dx;
        const velocity = gestureState.vx;

        setIsSliding(false);

        // Check if slide is completed
        if (currentPosition > maxSlideDistance * 0.8 || velocity > 1) {
          // Complete the slide
          Animated.parallel([
            Animated.spring(translateX, {
              toValue: maxSlideDistance,
              useNativeDriver: false,
            }),
            Animated.timing(textOpacity, {
              toValue: 0,
              duration: 200,
              useNativeDriver: false,
            }),
          ]).start(() => {
            setTimeout(() => onSlideComplete(), 10);
          });
        } else {
          // Snap back to start
          Animated.parallel([
            Animated.spring(translateX, {
              toValue: 0,
              useNativeDriver: false,
            }),
            Animated.timing(textOpacity, {
              toValue: 1,
              duration: 200,
              useNativeDriver: false,
            }),
          ]).start();
        }
      },
    })
  ).current;

  return (
    <View style={[styles.container, { width: containerWidth }]}>
      <Animated.View style={[styles.textContainer, { opacity: textOpacity }]}>
        <Text style={styles.text}>{text}</Text>
        <Text style={styles.sparkle}>✨</Text>
      </Animated.View>

      <Animated.View
        style={[
          styles.button,
          {
            transform: [{ translateX }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <View style={styles.iconRow}>
          <Ionicons name="chevron-forward" size={20} color="#444" />
          <Ionicons name="chevron-forward" size={20} color="#444" />
          <Ionicons name="chevron-forward" size={20} color="#444" />
        </View>
      </Animated.View>

      {/* Track/Rail indicator */}
      <View style={styles.track} />
    </View>
  );
};

export default SimpleSlideUnlock;

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: "#444444", // dark outer pill
    borderRadius: 30,
    position: "relative",
    justifyContent: "center",
    // paddingHorizontal: 4,
    marginTop: 20,
    marginBottom: 10,
    shadowColor: "#D9D9D9", // outer shadow
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 6,
  },
  textContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 70,
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
    marginRight: 5,
  },
  sparkle: {
    fontSize: 14,
    marginLeft: 2,
  },
  button: {
    width: 90,
    height: 44,
    backgroundColor: "#FFFFFF",
    borderRadius: 26,
    position: "absolute",
    left: 8,
    top: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  track: {
    position: "absolute",
    left: 8,
    right: 8,
    top: "50%",
    height: 2,
    // backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 1,
    marginTop: -1,
  },
});
