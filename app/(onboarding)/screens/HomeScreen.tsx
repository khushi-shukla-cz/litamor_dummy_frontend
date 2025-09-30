import { Href, router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, Dimensions, Image } from 'react-native';

const { width } = Dimensions.get('window');

const COLORS = {
  primary: '#FF4757',
  secondary: '#3A3A3A', // Dark text/elements
  background: '#FFFFFF',
  lightGray: '#F0F0F0',
  darkGray: '#A9A9A9',
  white: '#FFFFFF',
  fire: '#FF8C00', // For Streak text
  progressFill: '#7B61FF', // Purple/Pink gradient start
  progressEnd: '#17B8A0', // Teal/Cyan gradient end
};

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const dates = [22, 23, 24, 25, 26, 27, 28]; // Example dates
const moods = ['😀', '🙂', '😐', '💖', '🤩'];
const TODAY_INDEX = 2; // Assuming Tuesday 24th is today

// Dummy Data
const progressData = {
  youXP: 10,
  himXP: 20,
  maxXP: 30,
  youAvatar: 'https://placehold.co/50x50/B833FF/FFF', // Replace with actual avatar URL
  himAvatar: 'https://placehold.co/50x50/33A3FF/FFF', // Replace with actual avatar URL
};

const Header: React.FC = () => (
  <View style={headerStyles.container}>
    <View style={headerStyles.logoContainer}>
      <Text style={headerStyles.heart}>💖</Text>
      <Text style={headerStyles.logoText}>Lit Amor</Text>
    </View>
    <View style={headerStyles.icons}>
      <Text style={headerStyles.iconText}>🕒 10 XP</Text>
      <Text style={headerStyles.iconText}>👍 0</Text>
      <Text style={headerStyles.iconText}>💬 0</Text>
    </View>
  </View>
);

const DayButton: React.FC<{ day: string, date: number, isSelected: boolean }> = ({ day, date, isSelected }) => (
  <TouchableOpacity style={[dayStyles.button, isSelected && dayStyles.selectedButton]}>
    <Text style={[dayStyles.dayText, isSelected && dayStyles.selectedDayText]}>{day}</Text>
    <Text style={[dayStyles.dateText, isSelected && dayStyles.selectedDateText]}>{date}</Text>
  </TouchableOpacity>
);

const ProgressBar: React.FC<{ youXP: number, himXP: number, maxXP: number }> = ({ youXP, himXP, maxXP }) => {
  const youWidth = (youXP / maxXP) * 100;
  const himWidth = (himXP / maxXP) * 100;
  
  return (
    <View style={progressStyles.progressContainer}>
      {/* Avatars and Names */}
      <View style={progressStyles.avatarRow}>
        <View style={progressStyles.profile}>
          <Image source={{ uri: progressData.youAvatar }} style={progressStyles.avatar} />
          <Text style={progressStyles.name}>You</Text>
        </View>
        <View style={progressStyles.profile}>
          <Image source={{ uri: progressData.himAvatar }} style={progressStyles.avatar} />
          <Text style={progressStyles.name}>Him</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View style={progressStyles.barWrapper}>
        <View style={progressStyles.barBackground}>
          {/* You Progress Bar */}
          <View style={[progressStyles.youBar, { width: `${youWidth}%` }]} />
          {/* Him Progress Bar (Starts from the right) */}
          <View style={[progressStyles.himBar, { width: `${himWidth}%`, right: 0 }]} />
        </View>
      </View>

      {/* XP and Level */}
      <View style={progressStyles.xpLevelRow}>
        <Text style={progressStyles.xpText}>{youXP}/{maxXP} XP</Text>
        <Text style={progressStyles.levelText}>Level 1: New Sparks</Text>
      </View>
      
      <Text style={progressStyles.badgeText}>
        You've earned {youXP} XP — just {maxXP - youXP} XP more to unlock your first badge!
      </Text>
    </View>
  );
};


const HomeScreen: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState<string>('🙂'); // Default mood

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      
      <ScrollView style={styles.scrollViewContent} showsVerticalScrollIndicator={false}>
        
        {/* Prompt of the Day Card */}
        <View style={styles.card}>
          <Text style={styles.promptHeader}>
            <Text style={styles.dot}>●</Text> Prompt of the Day:
          </Text>
          <Text style={styles.promptText}>
            Show your surroundings and tell them what reminds you of them.
          </Text>
        </View>

        {/* Weekly Calendar/Day Selector */}
        <View style={styles.weekContainer}>
          {days.map((day, index) => (
            <DayButton 
              key={day} 
              day={day} 
              date={dates[index]} 
              isSelected={index === TODAY_INDEX} 
            />
          ))}
        </View>

        {/* Mood Selector */}
        <Text style={styles.sectionTitle}>What's your mood like right now?</Text>
        <View style={styles.moodContainer}>
          {moods.map((mood) => (
            <TouchableOpacity 
              key={mood} 
              onPress={() => setSelectedMood(mood)}
            >
              <Text style={[
                styles.moodEmoji, 
                selectedMood === mood && styles.selectedMoodEmoji
              ]}>
                {mood}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Couple Progress Section */}
        <View style={styles.progressSection}>
            <Text style={styles.sectionTitle}>Couple Progress</Text>
            <Text style={styles.nextTimeText}>Next in 8 Hrs !</Text>
        </View>

        <ProgressBar {...progressData} />

        {/* Nudge Button */}
        <TouchableOpacity style={styles.nudgeButton}
        onPress={()=>router.push('/(onboarding)/screens/StreakCompletedModal' as Href)}
        >
          <Text style={styles.nudgeButtonText}>Nudge him to complete the task</Text>
        </TouchableOpacity>
        
      </ScrollView>

      {/* Heart Icon Floating */}
      <View style={styles.floatingHeartContainer}>
        <Image 
            source={{ uri: 'https://placehold.co/40x40/FF4757/FFF?text=♥' }} // Replace with actual heart icon
            style={styles.floatingHeart} 
        />
      </View>
      
    </SafeAreaView>
  );
};

export default HomeScreen;

// --- Styles ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollViewContent: {
    paddingHorizontal: 20,
  },
  
  // Prompt Card Styles
  card: {
    backgroundColor: COLORS.lightGray,
    borderRadius: 15,
    padding: 20,
    marginTop: 15,
    marginBottom: 20,
  },
  promptHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.secondary,
    marginBottom: 5,
  },
  dot: {
    color: COLORS.primary,
    fontSize: 18,
    lineHeight: 18,
    marginRight: 5,
  },
  promptText: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.secondary,
  },
  
  // Weekly Calendar Styles
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  
  // Mood Selector Styles
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.secondary,
    marginBottom: 10,
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginBottom: 30,
  },
  moodEmoji: {
    fontSize: 30,
    opacity: 0.5,
  },
  selectedMoodEmoji: {
    opacity: 1,
    borderBottomWidth: 3,
    borderBottomColor: COLORS.primary,
  },

  // Couple Progress Section
  progressSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      marginBottom: 15,
  },
  nextTimeText: {
      fontSize: 12,
      fontWeight: '600',
      color: COLORS.primary,
  },

  // Nudge Button
  nudgeButton: {
    width: width - 40,
    height: 50,
    backgroundColor: COLORS.secondary, // Dark Gray button as in image
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
    alignSelf: 'center',
  },
  nudgeButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  
  // Floating Heart
  floatingHeartContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  floatingHeart: {
    width: 40,
    height: 40,
    borderRadius: 20,
  }
});

// --- Header Styles ---
const headerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  heart: {
    fontSize: 20,
    marginRight: 5,
  },
  logoText: {
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.secondary,
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 14,
    color: COLORS.secondary,
    marginLeft: 15,
    fontWeight: '500',
  },
});

// --- Day Button Styles ---
const dayStyles = StyleSheet.create({
  button: {
    width: 40, // Fixed width for clean alignment
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: COLORS.background,
  },
  selectedButton: {
    backgroundColor: COLORS.secondary, // Dark background for selected day
  },
  dayText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.secondary,
    marginBottom: 4,
  },
  selectedDayText: {
    color: COLORS.white,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.secondary,
  },
  selectedDateText: {
    color: COLORS.white,
  },
});

// --- Progress Bar Styles ---
const progressStyles = StyleSheet.create({
    progressContainer: {
        marginBottom: 30,
    },
    avatarRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    profile: {
        alignItems: 'center',
        width: '50%',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: COLORS.primary,
        marginBottom: 5,
    },
    name: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.secondary,
    },
    barWrapper: {
        marginTop: 15,
        marginBottom: 10,
        alignSelf: 'center',
        width: '100%',
    },
    barBackground: {
        height: 10,
        backgroundColor: COLORS.lightGray,
        borderRadius: 5,
        flexDirection: 'row',
        overflow: 'hidden',
    },
    youBar: {
        height: '100%',
        backgroundColor: COLORS.progressEnd, // Used a fixed color for simplicity
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    himBar: {
        height: '100%',
        backgroundColor: COLORS.progressFill, // Used a fixed color for simplicity
        position: 'absolute',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
    },
    xpLevelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    xpText: {
        fontSize: 14,
        fontWeight: '500',
        color: COLORS.secondary,
    },
    levelText: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.primary,
    },
    badgeText: {
        fontSize: 14,
        color: COLORS.darkGray,
        marginTop: 10,
        textAlign: 'center',
    }
});