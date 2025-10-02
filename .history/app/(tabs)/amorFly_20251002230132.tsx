// app/(tabs)/amorFly.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import Animated, { FadeInUp } from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { Href, router } from 'expo-router';

// --- Color Palette Enhancement ---
const ACCENT_COLOR = '#00BCD4'; // Soft Teal/Cyan - Professional primary color
const LIGHT_ACCENT = 'rgba(0, 188, 212, 0.1)'; // Very light tint of the accent
const TEXT_DARK = '#333333';
const TEXT_SECONDARY = '#667085'; // Soft dark gray for less importance
const BACKGROUND_LIGHT = '#F7F8FA'; // Very light gray background
const CARD_WHITE = '#FFFFFF';
const CTA_DARK = ['#2C3E50', '#1C2833']; // Dark Blue/Black gradient for CTA

// --- Type Definitions ---
interface InterestProps {
  icon: React.ReactNode;
  label: string;
}

interface LifeGoalProps {
  icon: React.ReactNode;
  label: string;
}

// --- Reusable Components ---

interface CircularProgressProps {
    percentage: number;
    radius: number;
    strokeWidth: number;
    color: string;
    backgroundColor: string;
    children: React.ReactNode;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
    percentage,
    radius,
    strokeWidth,
    color,
    backgroundColor,
    children,
}) => {
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    const size = radius * 2 + strokeWidth;

    return (
        <View style={{ width: size, height: size, justifyContent: 'center', alignItems: 'center' }}>
            <Svg width={size} height={size} style={{ position: 'absolute' }}>
                <Circle
                    stroke={backgroundColor}
                    fill="none"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                />
                <Circle
                    stroke={color}
                    fill="none"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    transform={`rotate(-90, ${size / 2}, ${size / 2})`}
                />
            </Svg>
            <View style={styles.circularProgressContent}>
                {children}
            </View>
        </View>
    );
};


const InterestTag: React.FC<InterestProps> = ({ icon, label }) => (
  <TouchableOpacity style={styles.tag} activeOpacity={0.7} onPress={() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      console.log(`Tag pressed: ${label}`);
  }}>
    {icon}
    <Text style={styles.tagText}>{label}</Text>
  </TouchableOpacity>
);

const LifeGoalTag: React.FC<LifeGoalProps> = ({ icon, label }) => (
  <TouchableOpacity style={styles.tagGoal} activeOpacity={0.7} onPress={() => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      console.log(`Goal pressed: ${label}`);
  }}>
    {icon}
    <Text style={styles.tagGoalText}>{label}</Text>
  </TouchableOpacity>
);

// --- Main Screen Component ---

const FlightMatchScreen: React.FC = () => {
  const [isReadyToFly, setIsReadyToFly] = useState(true);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const matchPercentage = 90;

  const toggleSwitch = (value: boolean) => {
    setIsReadyToFly(value);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    console.log(`Ready to fly status: ${value}`);
  };

  const handlePauseTimer = () => {
    setIsTimerPaused(!isTimerPaused);
    Haptics.selectionAsync();
    console.log(`Timer paused: ${!isTimerPaused}`);
  };

  const handleStartChat = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    console.log('Start Chat button pressed!');
    router.push('/(amorfly)/chatScreen' as Href);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* Header - Status and Profile Icon */}
        <View style={styles.header}>
          <View style={styles.statusToggleContainer}>
            <Text style={styles.statusText}>Ready to fly</Text>
            <Switch
              // Color updated to ACCENT_COLOR
              trackColor={{ false: '#767577', true: ACCENT_COLOR }} 
              thumbColor={CARD_WHITE}
              onValueChange={toggleSwitch}
              value={isReadyToFly}
              style={styles.switch}
            />
          </View>
          <TouchableOpacity onPress={() => console.log('Profile icon pressed')} style={styles.profileIconContainer}>
            <Ionicons name="person-circle-outline" size={36} color={TEXT_SECONDARY} />
          </TouchableOpacity>
        </View>

        {/* Next Match Timer - Cleaner look, subtle border */}
        <View style={styles.timerCard}>
          <Text style={styles.timerTitle}>Your Next Match in :</Text>
          <View style={styles.timerControls}>
            <Text style={[styles.timerText, isTimerPaused && styles.timerTextPaused]}>
              {isTimerPaused ? 'Paused' : '08:40:10'}
            </Text>
            <View style={styles.controlButtons}>
              <TouchableOpacity onPress={handlePauseTimer} style={styles.controlButton}>
                <Ionicons name={isTimerPaused ? 'play' : 'pause'} size={20} color={TEXT_DARK} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log('Stop timer pressed')} style={styles.controlButton}>
                <Ionicons name="stop-circle-outline" size={20} color={TEXT_DARK} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Match Profile Card */}
        <Animated.View style={styles.matchCard} entering={FadeInUp.duration(600).delay(200)}>
          
          {/* Match Percentage and Basic Info */}
          <View style={styles.matchHeader}>
            
            {/* Circular Progress (Using ACCENT_COLOR) */}
            <CircularProgress
                percentage={matchPercentage}
                radius={28}
                strokeWidth={5}
                color={ACCENT_COLOR}
                backgroundColor={LIGHT_ACCENT}
            >
                <View style={styles.matchBadgeContent}>
                    <Text style={styles.matchBadgeText}>{matchPercentage}%</Text>
                    <Text style={styles.matchBadgeTextSmall}>Match</Text>
                </View>
            </CircularProgress>
            
            <View style={styles.nameAgeContainer}>
                <Text style={styles.nameAgeText}>Aisha, 24</Text>
            </View>
            <TouchableOpacity onPress={() => console.log('Expand/Collapse profile')} style={styles.expandButton}>
                <Ionicons name="chevron-up" size={24} color={TEXT_SECONDARY} />
            </TouchableOpacity>
          </View>

          {/* Profile Details */}
          <Text style={styles.bioText}>
            "Curious designer who loves music and travel."
          </Text>
          <View style={styles.professionContainer}>
            {/* Color updated to ACCENT_COLOR for a professional pop */}
            <MaterialIcons name="work" size={18} color={ACCENT_COLOR} /> 
            <Text style={styles.professionText}>
              UX Designer at a digital product studio
            </Text>
          </View>

          {/* Interests */}
          <Text style={styles.sectionTitle}>Interests</Text>
          <View style={styles.tagsContainer}>
            <InterestTag icon={<FontAwesome5 name="hiking" size={16} color={TEXT_DARK} />} label="Hiking" />
            <InterestTag icon={<FontAwesome5 name="guitar" size={16} color={TEXT_DARK} />} label="Guitar" />
            <InterestTag icon={<Ionicons name="book-outline" size={16} color={TEXT_DARK} />} label="Reading" /> 
          </View>

          {/* Life Goal */}
          <Text style={styles.sectionTitle}>Life goal</Text>
          <View style={styles.tagsContainer}>
            <LifeGoalTag icon={<MaterialIcons name="business-center" size={16} color={TEXT_SECONDARY} />} label="Career Growth" />
            <LifeGoalTag icon={<FontAwesome5 name="hand-holding-heart" size={16} color={TEXT_SECONDARY} />} label="Personal Growth" />
          </View>

          {/* Start a Chat Button with Professional Gradient */}
          <TouchableOpacity
            onPress={handleStartChat}
            activeOpacity={0.8}
            style={styles.chatButtonWrapper}
          >
            <LinearGradient
              colors={CTA_DARK} // Using new dark blue/black gradient
              style={styles.chatButton}
            >
              <Text style={styles.chatButtonText}>
                START CHAT
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </Animated.View>

      </ScrollView>
    </SafeAreaView>
  );
};

// --- Stylesheet ---
const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: CARD_WHITE },
  container: { 
    padding: 20, 
    backgroundColor: BACKGROUND_LIGHT, // Light background
    minHeight: '100%',
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  statusToggleContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: LIGHT_ACCENT, // Light accent tint
    paddingVertical: 4, 
    paddingHorizontal: 12, 
    borderRadius: 20, 
    borderWidth: 1, 
    borderColor: ACCENT_COLOR, // Accent border
  },
  statusText: { fontSize: 14, fontWeight: '600', color: ACCENT_COLOR, marginRight: 5 },
  switch: { transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] },
  profileIconContainer: { padding: 2 },
  timerCard: { 
    backgroundColor: CARD_WHITE, 
    borderRadius: 16, 
    padding: 20, 
    marginBottom: 20, 
    // Subtler shadows for professional look
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.05, 
    shadowRadius: 4, 
    elevation: 2, 
    borderWidth: 1, // Added a very subtle border
    borderColor: '#E0E6ED', 
  },
  timerTitle: { fontSize: 16, color: TEXT_SECONDARY, marginBottom: 10 },
  timerControls: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  timerText: { fontSize: 48, fontWeight: '300', color: TEXT_DARK, fontVariant: ['tabular-nums'] },
  timerTextPaused: { fontSize: 32, fontWeight: '600', color: TEXT_SECONDARY },
  controlButtons: { flexDirection: 'row' },
  controlButton: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: '#E0E6ED', // Lighter, more casual gray
    justifyContent: 'center', 
    alignItems: 'center', 
    marginLeft: 10 
  },
  matchCard: { 
    backgroundColor: CARD_WHITE, 
    borderRadius: 16, 
    padding: 20, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 8, 
    elevation: 4, 
    paddingBottom: 40,
    borderWidth: 1, // Subtle border
    borderColor: '#E0E6ED',
  },
  matchHeader: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 15 },
  nameAgeContainer: { flex: 1, marginLeft: 15 },
  nameAgeText: { fontSize: 26, fontWeight: '800', color: TEXT_DARK, marginTop: 5 },
  expandButton: { padding: 5 },
  bioText: { fontSize: 16, fontStyle: 'italic', color: TEXT_SECONDARY, marginBottom: 15, lineHeight: 24 },
  professionContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  professionText: { fontSize: 15, color: TEXT_SECONDARY, marginLeft: 8 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: TEXT_DARK, marginBottom: 10 },
  tagsContainer: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 },
  tag: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#E0E6ED', // Lighter tag background
    borderRadius: 20, 
    paddingVertical: 8, 
    paddingHorizontal: 14, 
    marginRight: 10, 
    marginBottom: 10 
  },
  tagText: { fontSize: 14, fontWeight: '600', color: TEXT_DARK, marginLeft: 6 },
  tagGoal: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F0F0F5', // Very light gray for subtle difference
    borderRadius: 20, 
    paddingVertical: 8, 
    paddingHorizontal: 14, 
    marginRight: 10, 
    marginBottom: 10 
  },
  tagGoalText: { fontSize: 14, fontWeight: '600', color: TEXT_SECONDARY, marginLeft: 6 },
  chatButtonWrapper: { borderRadius: 12, marginTop: 30, overflow: 'hidden' },
  chatButton: { paddingVertical: 18, alignItems: 'center' },
  chatButtonText: { color: CARD_WHITE, fontSize: 18, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1 }, // Increased letter spacing for clean CTA
  
  // --- CIRCULAR PROGRESS STYLES (MATCH BADGE) ---
  circularProgressContent: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: LIGHT_ACCENT, // Light accent background
      borderRadius: 100, 
      padding: 10,
  },
  matchBadgeContent: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50, 
    height: 50,
  },
  matchBadgeText: {
    fontSize: 14, 
    fontWeight: '800',
    color: ACCENT_COLOR, // Accent color for the percentage
  },
  matchBadgeTextSmall: {
    fontSize: 9, 
    fontWeight: '600',
    color: ACCENT_COLOR,
    marginTop: -2,
  },
});

export default FlightMatchScreen;