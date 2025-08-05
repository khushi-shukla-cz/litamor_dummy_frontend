import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';

const TypingDots = () => {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateDot = (dot: Animated.Value, delay: number) => {
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, { toValue: 1, duration: 1000, useNativeDriver: true }),
          Animated.timing(dot, { toValue: 0, duration: 1000, useNativeDriver: true }),
          
        ])
      ).start();
    };
    animateDot(dot1, 0);
    animateDot(dot2, 500);
    animateDot(dot3, 1000);
    
  }, []);

  const dotColors = [
    
    'bg-pink-400',   // darker pink
    'bg-pink-500',   // dark pink
    'bg-violet-500', // light purple
  ];

  return (
    <View className="flex-row items-center h-5">
      {[dot1, dot2, dot3,].map((dot, i) => (
        <Animated.View key={i} className={`w-1.5 h-1.5 rounded-full mx-0.5 ${dotColors[i]}`} style={{ opacity: dot }} />
      ))}
    </View>
  );
};
export default TypingDots;