import React, { useEffect, useRef } from "react";
import { Animated, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");

interface Heart {
  left: number;
  size: number;
  opacity: number;
  rotation: number;
  animY: Animated.Value;
  animX: Animated.Value;
  delay: number;
}

const FloatingHearts: React.FC = () => {
  const hearts: Heart[] = useRef(
    [...Array(12)].map(() => ({
      left: Math.random() * width,
      size: 16 + Math.random() * 16,
      opacity: 0.3 + Math.random() * 0.7,
      rotation: Math.random() * 360,
      animY: new Animated.Value(height),
      animX: new Animated.Value(0),
      delay: Math.random() * 4000,
    }))
  ).current;

  useEffect(() => {
    hearts.forEach((heart) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(heart.animY, {
            toValue: -100,
            duration: 8000 + Math.random() * 2000,
            delay: heart.delay,
            useNativeDriver: true,
          }),
          Animated.timing(heart.animY, {
            toValue: height,
            duration: 0,
            useNativeDriver: true,
          }),
        ])
      ).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(heart.animX, {
            toValue: Math.random() * 20 - 10,
            duration: 2000 + Math.random() * 2000,
            useNativeDriver: true,
          }),
          Animated.timing(heart.animX, {
            toValue: 0,
            duration: 2000 + Math.random() * 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    });
  }, [hearts]);

  return (
    <>
      {hearts.map((heart, i) => (
        <Animated.View
          key={i}
          style={{
            position: "absolute",
            left: heart.left,
            transform: [
              { translateY: heart.animY },
              { translateX: heart.animX },
              { rotate: `${heart.rotation}deg` },
            ],
            opacity: heart.opacity,
          }}
        >
          <Ionicons
            name="heart"
            size={heart.size}
            color={`rgba(255,${Math.floor(50 + Math.random() * 200)},${Math.floor(
              50 + Math.random() * 200
            )},${heart.opacity})`}
          />
        </Animated.View>
      ))}
    </>
  );
};

export default FloatingHearts;
