import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';

export default function StreakScreen() {
  const weekDays = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const completedDays = [0, 1, 2]; // Indices of completed days

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#4A4A4A" />
      <View style={styles.content}>
        {/* Fire Icon */}
        <Text style={styles.fireIcon}>🔥</Text>
        
        {/* Streak Count */}
        <View style={styles.streakContainer}>
          <Text style={styles.streakNumber}>3</Text>
          <Text style={styles.streakLabel}>Days Streak</Text>
        </View>

        {/* Week Calendar */}
        <View style={styles.calendarContainer}>
          <View style={styles.weekRow}>
            {weekDays.map((day, index) => (
              <Text key={index} style={styles.dayLabel}>
                {day}
              </Text>
            ))}
          </View>
          <View style={styles.weekRow}>
            <Text style={styles.dayNumber}>3</Text>
            {weekDays.slice(1).map((_, index) => (
              <View key={index} style={styles.dayStatus}>
                {completedDays.includes(index + 1) ? (
                  <Text style={styles.checkMark}>✓</Text>
                ) : index + 1 === 3 ? (
                  <View style={styles.currentDay}>
                    <Text style={styles.checkMark}>✓</Text>
                  </View>
                ) : null}
              </View>
            ))}
          </View>
        </View>

        {/* Encouragement Text */}
        <View style={styles.encouragementContainer}>
          <Text style={styles.encouragementText}>
            You're halfway to keeping your
          </Text>
          <Text style={styles.perfectStreakText}>
            Perfect Streak <Text style={styles.fireEmoji}>🔥</Text> this week
          </Text>
        </View>

        {/* Waiting Text */}
        <Text style={styles.waitingText}>⏳ Waiting for Partner...</Text>

        {/* Nudge Button */}
        <TouchableOpacity style={styles.nudgeButton}>
          <Text style={styles.nudgeButtonText}>👋 Nudge Your Partner !</Text>
        </TouchableOpacity>

        {/* Continue Button */}
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4A4A4A',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  fireIcon: {
    fontSize: 120,
    marginBottom: 30,
  },
  streakContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 60,
  },
  streakNumber: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginRight: 15,
  },
  streakLabel: {
    fontSize: 32,
    fontWeight: '600',
    color: '#FFA500',
  },
  calendarContainer: {
    marginBottom: 60,
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 280,
    marginBottom: 15,
  },
  dayLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    width: 35,
    textAlign: 'center',
  },
  dayNumber: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    width: 35,
    textAlign: 'center',
  },
  dayStatus: {
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkMark: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  currentDay: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  encouragementContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  encouragementText: {
    fontSize: 18,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 5,
  },
  perfectStreakText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFA500',
    textAlign: 'center',
  },
  fireEmoji: {
    fontSize: 18,
  },
  waitingText: {
    fontSize: 16,
    color: '#CCCCCC',
    marginBottom: 30,
  },
  nudgeButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginBottom: 30,
  },
  nudgeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  continueButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 20,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});