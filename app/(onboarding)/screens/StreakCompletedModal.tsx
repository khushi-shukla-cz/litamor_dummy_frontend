import { Href, router } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const COLORS = {
  primary: '#FF4757', // Fire accent color (used on 'Perfect Streak')
  secondary: '#FFFFFF', // White text color
  background: '#3A3A3A', // Dark grey background
  lightGray: '#A9A9A9', // Grey text/border color
  fire: '#FF8C00', // Orange/Yellowish for Streak text
  buttonLight: '#FFFFFF', // Button background (Nudge)
  buttonDark: '#000000', // Button text (Continue)
};

const StreakCompletedModal: React.FC = () => {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  // Assuming 3 days completed: Monday, Tuesday, Wednesday (M, T, W)
  const streakStatus = [true, true, true, false, false, false, false];

  // Helper function to render day status icon
  const getDayIcon = (isCompleted: boolean, index: number) => {
    if (isCompleted) {
      // Completed day checkmark
      return <Text style={styles.dayCheck}>✓</Text>; 
    }
    // Current day checked circle (Wednesday, index 2)
    if (index === 2) {
      return <View style={styles.dayCurrentCircle}><Text style={styles.dayCheckCurrent}>✓</Text></View>;
    }
    // Future days (no icon)
    return null; 
  };
  
  // Custom Render for the Checked Circle for the 3rd day
  const renderStatus = (index: number) => {
      if (index === 0 || index === 1) {
          return <Text style={styles.dayCheck}>✓</Text>; // M, T (Completed)
      } else if (index === 2) {
          return <View style={styles.dayCurrentCircle}><Text style={styles.dayCheckCurrent}>✓</Text></View>; // W (Current/Checked)
      }
      return null;
  }

  const handleNudge = () => {
    console.log('Nudge Your Partner pressed');
    // Implement API call for nudging
  };

  const handleContinue = () => {
    router.push('/(onboarding)/screens/DailyPromptViewerScreen' as Href)
  };

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.statusText}>Streak completed</Text>

        <View style={styles.content}>
            
            {/* Fire Icon */}
            <Text style={styles.fireIcon}>🔥</Text> 

            {/* Streak Count */}
            <View style={styles.streakTextContainer}>
                <Text style={styles.streakNumber}>3</Text>
                <Text style={styles.daysStreakText}>Days Streak</Text>
            </View>

            {/* Weekly Calendar */}
            <View style={styles.weeklyCalendar}>
                <View style={styles.dayRow}>
                    {days.map((day, index) => (
                        <Text key={index} style={styles.dayName}>{day}</Text>
                    ))}
                </View>
                <View style={styles.statusRow}>
                    {days.map((day, index) => (
                        <View key={index} style={styles.statusCell}>
                            {renderStatus(index)}
                        </View>
                    ))}
                </View>
            </View>

            {/* Streak Message */}
            <Text style={styles.halfwayText}>
                You're halfway to keeping your {' '}
                <Text style={styles.perfectStreak}>Perfect Streak</Text> this week 🔥
            </Text>

            {/* Waiting for Partner */}
            <View style={styles.partnerWait}>
                <Text style={styles.partnerWaitIcon}>⏳</Text>
                <Text style={styles.partnerWaitText}>Waiting for Partner...</Text>
            </View>
            
            {/* Buttons */}
            <TouchableOpacity style={styles.nudgeButton} onPress={handleNudge}>
                <Text style={styles.nudgeButtonText}>👋 Nudge Your Partner !</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleContinue}>
                <Text style={styles.continueText}>Continue</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

export default StreakCompletedModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  statusText: {
    color: COLORS.lightGray,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: -30, // Adjusting for SafeAreaView padding
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  // Fire Icon and Streak Text
  fireIcon: {
    fontSize: 100,
    marginBottom: 10,
  },
  streakTextContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 30,
  },
  streakNumber: {
    fontSize: 55,
    fontWeight: '800',
    color: COLORS.secondary,
    marginRight: 10,
  },
  daysStreakText: {
    fontSize: 30,
    fontWeight: '700',
    color: COLORS.fire,
  },

  // Weekly Calendar
  weeklyCalendar: {
    width: '100%',
    maxWidth: 350,
    alignItems: 'center',
    marginBottom: 40,
  },
  dayRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  dayName: {
    color: COLORS.secondary,
    fontSize: 18,
    fontWeight: '600',
    width: '10%',
    textAlign: 'center',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  statusCell: {
    width: '10%',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayCheck: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.background, // Checkmark inside the grey background circle
    backgroundColor: COLORS.lightGray,
    borderRadius: 15,
    width: 28,
    height: 28,
    textAlign: 'center',
    textAlignVertical: 'center',
    overflow: 'hidden',
  },
  dayCurrentCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: COLORS.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayCheckCurrent: {
      fontSize: 18,
      fontWeight: 'bold',
      color: COLORS.secondary,
      marginTop: -2,
  },
  
  // Messages
  halfwayText: {
    fontSize: 18,
    color: COLORS.lightGray,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 25,
  },
  perfectStreak: {
    color: COLORS.fire,
    fontWeight: '700',
  },
  
  // Waiting for Partner
  partnerWait: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 50,
  },
  partnerWaitIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  partnerWaitText: {
    color: COLORS.lightGray,
    fontSize: 18,
    fontWeight: '600',
  },

  // Buttons
  nudgeButton: {
    width: width * 0.75,
    height: 55,
    backgroundColor: COLORS.lightGray,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  nudgeButtonText: {
    color: COLORS.background, // Dark gray text on light button
    fontSize: 18,
    fontWeight: '700',
  },
  continueText: {
    color: COLORS.secondary,
    fontSize: 16,
    fontWeight: '600',
  },
});