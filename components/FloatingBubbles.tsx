import * as React from 'react';
import { Dimensions, GestureResponderEvent, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

// Different heart shapes and colors
const heartVariants = [
  {
    path: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z",
    colors: ['#FF6B9D', '#FF8FA3', '#FFB3C1', '#FFC3E0']
  },
  {
    path: "M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.429-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z",
    colors: ['#E91E63', '#F06292', '#F48FB1', '#F8BBD9']
  },
  {
    path: "M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z",
    colors: ['#9C27B0', '#BA68C8', '#CE93D8', '#E1BEE7']
  }
];

interface HeartProps {
  id: number;
  tapLocation: { x: number; y: number; timestamp: number } | null;
}

function FloatingHeart({ id, tapLocation }: HeartProps) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotation = useSharedValue(0);
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const isScattered = useSharedValue(false);
  const lastTapTimestamp = React.useRef(0);

  // Random properties for each heart
  const [heartProps] = React.useState(() => {
    const variant = heartVariants[Math.floor(Math.random() * heartVariants.length)];
    
    // Create zones for better distribution
    const zones = [
      { xMin: 0, xMax: width * 0.3, yMin: 0, yMax: height * 0.3 }, // Top-left
      { xMin: width * 0.7, xMax: width - 60, yMin: 0, yMax: height * 0.3 }, // Top-right
      { xMin: 0, xMax: width * 0.3, yMin: height * 0.7, yMax: height - 100 }, // Bottom-left
      { xMin: width * 0.7, xMax: width - 60, yMin: height * 0.7, yMax: height - 100 }, // Bottom-right
      { xMin: width * 0.1, xMax: width * 0.9, yMin: height * 0.1, yMax: height * 0.2 }, // Top edge
      { xMin: width * 0.1, xMax: width * 0.9, yMin: height * 0.8, yMax: height * 0.9 }, // Bottom edge
      { xMin: 0, xMax: width * 0.2, yMin: height * 0.3, yMax: height * 0.7 }, // Left edge
      { xMin: width * 0.8, xMax: width - 60, yMin: height * 0.3, yMax: height * 0.7 }, // Right edge
      { xMin: width * 0.2, xMax: width * 0.8, yMin: height * 0.2, yMax: height * 0.8 }, // Center (less dense)
    ];
    
    // Give preference to edge zones (avoid center concentration)
    const edgeZones = zones.slice(0, 8); // First 8 zones are edges
    const centerZone = zones[8]; // Last zone is center
    
    // 85% chance for edge zones, 15% for center (reduced center concentration)
    const selectedZone = Math.random() < 0.85 ? 
      edgeZones[Math.floor(Math.random() * edgeZones.length)] : 
      centerZone;
    
    const startX = selectedZone.xMin + Math.random() * (selectedZone.xMax - selectedZone.xMin);
    const startY = selectedZone.yMin + Math.random() * (selectedZone.yMax - selectedZone.yMin);
    
    return {
      size: 16 + Math.random() * 24, // Smaller hearts: 16-40px
      startX,
      startY,
      color: variant.colors[Math.floor(Math.random() * variant.colors.length)],
      path: variant.path,
      scaleVariation: 0.8 + Math.random() * 0.3, // 0.8 to 1.1
      floatSpeed: 2000 + Math.random() * 2000, // FASTER: 2-4 seconds (was 6-12 seconds)
      // More movement - larger radius for more dynamic motion
      movementRadius: 40 + Math.random() * 60, // Increased to 40-100px radius (was 20-50px)
      rotationSpeed: 3000 + Math.random() * 3000, // FASTER rotation: 3-6 seconds (was 12-20 seconds)
      rotationAmount: (Math.random() - 0.5) * 180, // Larger rotation: -90 to +90 degrees (was -45 to +45)
    };
  });

  const movementIntervalRef = React.useRef<NodeJS.Timeout>();
  const popIntervalRef = React.useRef<NodeJS.Timeout>();

  const createSubtleMovement = React.useCallback(() => {
    if (isScattered.value) return;
    
    const angle = Math.random() * Math.PI * 2;
    const radius = heartProps.movementRadius * (0.5 + Math.random() * 0.5); // Increased movement range
    
    const offsetX = Math.cos(angle) * radius;
    const offsetY = Math.sin(angle) * radius;
    
    // Ensure we stay within screen bounds
    const targetX = Math.max(30, Math.min(width - 90, heartProps.startX + offsetX));
    const targetY = Math.max(30, Math.min(height - 130, heartProps.startY + offsetY));
    
    translateX.value = withTiming(targetX, {
      duration: heartProps.floatSpeed,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1) // Smooth bezier easing
    });
    
    translateY.value = withTiming(targetY, {
      duration: heartProps.floatSpeed * 1.1, // Reduced multiplier for faster Y movement
      easing: Easing.bezier(0.25, 0.1, 0.25, 1) // Smooth bezier easing
    });
  }, [heartProps, isScattered]);

  const startNormalAnimation = React.useCallback(() => {
    // Clear existing intervals
    if (movementIntervalRef.current) {
      clearInterval(movementIntervalRef.current);
    }
    if (popIntervalRef.current) {
      clearInterval(popIntervalRef.current);
    }

    // Start subtle movement
    createSubtleMovement();

    // Continue movement more frequently
    movementIntervalRef.current = setInterval(() => {
      createSubtleMovement();
    }, heartProps.floatSpeed);

    // Faster rotation with more dramatic effect
    rotation.value = withRepeat(
      withTiming(heartProps.rotationAmount, {
        duration: heartProps.rotationSpeed,
        easing: Easing.bezier(0.4, 0.0, 0.6, 1) // Smooth ease-in-out
      }),
      -1,
      true // Reverse direction
    );

    // Faster and more noticeable pulsing scale effect
    setTimeout(() => {
      if (!isScattered.value) {
        scale.value = withRepeat(
          withTiming(heartProps.scaleVariation * 1.15, { // Larger scale change (was 1.08)
            duration: 1500 + Math.random() * 1500, // FASTER pulsing: 1.5-3 seconds (was 4-7 seconds)
            easing: Easing.bezier(0.4, 0.0, 0.6, 1) // Smooth bezier
          }),
          -1,
          true
        );
      }
    }, 800); // Shorter delay

    // More frequent "pop" effect
    popIntervalRef.current = setInterval(() => {
      if (Math.random() < 0.15 && !isScattered.value) { // Increased chance to 15% (was 8%)
        scale.value = withTiming(heartProps.scaleVariation * 1.25, { // Larger pop (was 1.15)
          duration: 300, // Faster pop duration
          easing: Easing.bezier(0.34, 1.56, 0.64, 1) // Gentle bounce
        }, () => {
          if (!isScattered.value) {
            scale.value = withRepeat(
              withTiming(heartProps.scaleVariation * 1.15, {
                duration: 1500 + Math.random() * 1500,
                easing: Easing.bezier(0.4, 0.0, 0.6, 1)
              }),
              -1,
              true
            );
          }
        });
      }
    }, 4000 + Math.random() * 6000); // More frequent: 4-10 seconds (was 12-30 seconds)
  }, [createSubtleMovement, heartProps, isScattered]);

  const pushHeart = React.useCallback((tapX: number, tapY: number) => {
    // Calculate distance from tap location to heart's current position
    const heartX = translateX.value;
    const heartY = translateY.value;
    const distance = Math.sqrt((tapX - heartX) ** 2 + (tapY - heartY) ** 2);
    
    // Define push radius (hearts within this radius will be affected)
    const pushRadius = 150; // Slightly larger radius for gentle push effect
    
    // Only push if heart is within tap radius
    if (distance > pushRadius) return;
    
    isScattered.value = true;
    
    // Clear existing intervals
    if (movementIntervalRef.current) {
      clearInterval(movementIntervalRef.current);
    }
    if (popIntervalRef.current) {
      clearInterval(popIntervalRef.current);
    }

    // Calculate push direction based on tap location
    const angle = Math.atan2(heartY - tapY, heartX - tapX);
    
    // Faster push distance
    const maxPushDistance = 90; // Increased push distance (was 60)
    const pushStrength = (1 - distance / pushRadius); // Strength based on distance
    const pushDistance = maxPushDistance * pushStrength;
    
    const pushX = Math.cos(angle) * pushDistance;
    const pushY = Math.sin(angle) * pushDistance;
    
    // Calculate target position - push away from tap
    let targetX = heartX + pushX;
    let targetY = heartY + pushY;
    
    // Keep within screen bounds
    targetX = Math.max(30, Math.min(width - 90, targetX));
    targetY = Math.max(30, Math.min(height - 130, targetY));
    
    // Faster push animation
    translateX.value = withTiming(targetX, {
      duration: 500, // FASTER push: 0.5 seconds (was 1 second)
      easing: Easing.bezier(0.25, 0.1, 0.25, 1) // Smooth, natural easing
    });
    
    translateY.value = withTiming(targetY, {
      duration: 500, // FASTER push
      easing: Easing.bezier(0.25, 0.1, 0.25, 1) // Smooth, natural easing
    });
    
    // More dramatic rotation during push
    const rotateAmount = pushStrength * 60; // Increased rotation: max 60 degrees (was 30)
    rotation.value = withTiming(rotation.value + (Math.random() > 0.5 ? rotateAmount : -rotateAmount), {
      duration: 500, // Faster rotation
      easing: Easing.bezier(0.25, 0.1, 0.25, 1) // Smooth easing
    });
    
    // More noticeable scale effect during push
    const scaleAmount = 1.1 + pushStrength * 0.2; // Larger scale: max 1.3x (was 1.15x)
    scale.value = withTiming(heartProps.scaleVariation * scaleAmount, {
      duration: 300, // Faster scale animation
      easing: Easing.bezier(0.34, 1.56, 0.64, 1) // Gentle bounce
    });
    
    // Faster return to floating behavior
    setTimeout(() => {
      isScattered.value = false;
      
      // Faster return to normal scale
      scale.value = withTiming(heartProps.scaleVariation, {
        duration: 600, // Faster return (was 1000)
        easing: Easing.bezier(0.25, 0.1, 0.25, 1) // Smooth bezier
      });
      
      // Update the "home" position to current position for natural floating
      heartProps.startX = targetX;
      heartProps.startY = targetY;
      
      // Restart normal animations from new position sooner
      setTimeout(() => {
        startNormalAnimation();
      }, 200); // Faster restart (was 500)
    }, 600); // Shorter wait (was 1200)
  }, [heartProps, translateX, translateY, rotation, scale, isScattered, startNormalAnimation]);

  // Handle push trigger
  React.useEffect(() => {
    if (tapLocation && tapLocation.timestamp !== lastTapTimestamp.current) {
      lastTapTimestamp.current = tapLocation.timestamp;
      pushHeart(tapLocation.x, tapLocation.y);
    }
  }, [tapLocation, pushHeart]);

  React.useEffect(() => {
    // Initial position
    translateX.value = heartProps.startX;
    translateY.value = heartProps.startY;

    // Faster fade in
    opacity.value = withTiming(0.15 + Math.random() * 0.25, { // Even lower opacity: 0.15-0.4
      duration: 1000, // Faster fade in (was 2000)
      easing: Easing.bezier(0.25, 0.1, 0.25, 1) // Smooth bezier
    });

    // Faster scale up
    scale.value = withTiming(heartProps.scaleVariation, {
      duration: 900, // Faster scale up (was 1800)
      easing: Easing.bezier(0.34, 1.56, 0.64, 1) // Gentle bounce
    });

    // Start normal animations
    startNormalAnimation();

    return () => {
      if (movementIntervalRef.current) {
        clearInterval(movementIntervalRef.current);
      }
      if (popIntervalRef.current) {
        clearInterval(popIntervalRef.current);
      }
    };
  }, [heartProps, startNormalAnimation]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
        { rotate: `${rotation.value}deg` }
      ],
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          width: heartProps.size,
          height: heartProps.size,
          zIndex: 1,
        },
        animatedStyle,
      ]}
    >
      <Svg width={heartProps.size} height={heartProps.size} viewBox="0 0 24 24">
        <Path d={heartProps.path} fill={heartProps.color} />
      </Svg>
    </Animated.View>
  );
}

export default function FloatingBubbles({ children }: { children: React.ReactNode }) {
  const [hearts, setHearts] = React.useState<number[]>([]);
  const [tapLocation, setTapLocation] = React.useState<{ x: number; y: number; timestamp: number } | null>(null);
  const heartIdCounter = React.useRef(0);

  const addHeart = React.useCallback(() => {
    const newId = heartIdCounter.current++;
    setHearts(prev => [...prev, newId]);
  }, []);

  const handleScreenTap = React.useCallback((event: GestureResponderEvent) => {
    const { locationX, locationY } = event.nativeEvent;
    
    // Set tap location with timestamp to trigger scatter effect
    setTapLocation({
      x: locationX || 0,
      y: locationY || 0,
      timestamp: Date.now()
    });
  }, []);

  React.useEffect(() => {
    // Create initial hearts with better distribution
    const createInitialHearts = () => {
      return Array.from({ length: 20 }, () => heartIdCounter.current++); // 10 hearts (reduced from 25)
    };
    
    setHearts(createInitialHearts());

    // Less frequent addition of new hearts
    const interval = setInterval(() => {
      if (Math.random() < 0.35) { // 20% chance (was 45%)
        addHeart();
      }
    }, 3000 + Math.random() * 4000); // Every 5-9 seconds (was 3-7)

    return () => clearInterval(interval);
  }, [addHeart]);

  return (
    <TouchableWithoutFeedback onPress={handleScreenTap}>
      <View style={[StyleSheet.absoluteFill, { width: '100%', height: '100%' }]}>
        {hearts.map((heartId) => (
          <FloatingHeart
            key={heartId}
            id={heartId}
            tapLocation={tapLocation}
          />
        ))}
        <View style={[StyleSheet.absoluteFill, { zIndex: 10, width: '100%', height: '100%' }]}>
          {children}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}