import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Video } from 'lucide-react-native';
import { Href, router } from 'expo-router';

export default function HomeScreen() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);

  const moods = ['😊', '😐', '😔', '💖', '🤩'];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.streakInfo}>
            <Text style={styles.fireEmoji}>🔥</Text>
            <Text style={styles.streakText}>Streak 12</Text>
          </View>
          <Text style={styles.longestStreak}>Longest Streak: 27</Text>
        </View>

        {/* Date Card */}
        <View style={styles.dateCard}>
          <View style={styles.dateHeader}>
            <View style={styles.calendarIcon}>
              <Text style={styles.calendarDay}>17</Text>
            </View>
            <Text style={styles.dateText}>Sep 6, 2025</Text>
            <View style={styles.dayBadge}>
              <Text style={styles.dayBadgeText}>Day 12</Text>
            </View>
          </View>

          {/* Video Recording Area */}
          <TouchableOpacity style={styles.videoArea}>
            <Video size={40} color="#FFFFFF" strokeWidth={1.5} />
            <Text style={styles.videoText}>Record a Video Note</Text>
          </TouchableOpacity>

          {/* Prompt Section */}
          <View style={styles.promptSection}>
            <Text style={styles.promptLabel}>❤️ Prompt of the Day:</Text>
            <Text style={styles.promptText}>
              Show your surroundings and tell them what reminds you of them.
            </Text>
          </View>
        </View>

        {/* Mood Selection */}
        <View style={styles.moodSection}>
          <Text style={styles.moodQuestion}>What's your mood like right now?</Text>
          <View style={styles.moodGrid}>
            {moods.map((mood, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.moodButton,
                  selectedMood === index && styles.selectedMoodButton,
                ]}
                onPress={() => setSelectedMood(index)}
              >
                <Text style={styles.moodEmoji}>{mood}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Explore Button */}
          <TouchableOpacity 
            style={styles.exploreButton}
            onPress={() => router.push('/amorstreak/explore' as Href)}
          >
            <Text style={styles.exploreButtonText}>Explore</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 20,
  },
  streakInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fireEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  streakText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  longestStreak: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: '500',
  },
  dateCard: {
    backgroundColor: '#E8E8E8',
    marginHorizontal: 20,
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
  },
  dateHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  calendarIcon: {
    width: 35,
    height: 35,
    backgroundColor: '#FF6B6B',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  calendarDay: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    flex: 1,
  },
  dayBadge: {
    backgroundColor: '#999999',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  dayBadgeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
  },
  videoArea: {
    backgroundColor: '#777777',
    borderRadius: 15,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  videoText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
    marginTop: 10,
  },
  promptSection: {
    marginTop: 10,
  },
  promptLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },
  promptText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    lineHeight: 26,
  },
  moodSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  moodQuestion: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 15,
  },
  moodGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  moodButton: {
    width: 60,
    height: 60,
    backgroundColor: '#E8E8E8',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedMoodButton: {
    backgroundColor: '#FFE5E5',
  },
  moodEmoji: {
    fontSize: 24,
  },
  exploreButton: {
    backgroundColor: '#FFA500',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 25,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  exploreButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
