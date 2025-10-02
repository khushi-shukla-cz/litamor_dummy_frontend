import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  ScrollView,
} from 'react-native';
import { Heart, Share, Star } from 'lucide-react-native';

export default function MessageScreen() {
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

          {/* Prompt Section */}
          <View style={styles.promptSection}>
            <Text style={styles.promptLabel}>❤️ Prompt of the Day:</Text>
            <Text style={styles.promptText}>
              Show your surroundings and tell them what reminds you of them.
            </Text>
          </View>
        </View>

        {/* Photo Collage */}
        <View style={styles.photoCollage}>
          <TouchableOpacity style={styles.heartIcon}>
            <Heart size={20} color="#FFFFFF" fill="#FFFFFF" />
          </TouchableOpacity>
          
          <View style={styles.imageGrid}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg' }}
              style={[styles.gridImage, styles.topLeft]}
            />
            <Image
              source={{ uri: 'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg' }}
              style={[styles.gridImage, styles.topRight]}
            />
            <Image
              source={{ uri: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg' }}
              style={[styles.gridImage, styles.bottomLeft]}
            />
            <Image
              source={{ uri: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg' }}
              style={[styles.gridImage, styles.bottomRight]}
            />
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg' }}
              style={[styles.gridImage, styles.bottomCenter]}
            />
          </View>

          <View style={styles.overlayContent}>
            <View style={styles.profileSection}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' }}
                style={styles.profileImage}
              />
              <Text style={styles.recapText}>✨ Your Love Recap</Text>
            </View>
            <View style={styles.actionIcons}>
              <TouchableOpacity style={styles.actionIcon}>
                <Star size={20} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionIcon}>
                <Share size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Nudge Button */}
        <TouchableOpacity style={styles.nudgeButton}>
          <Text style={styles.nudgeButtonText}>Nudge Your Partner to complete ! 🔥</Text>
        </TouchableOpacity>
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
  promptSection: {
    marginTop: -10,
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
  photoCollage: {
    marginHorizontal: 20,
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
    height: 400,
    marginBottom: 20,
  },
  heartIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 2,
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridImage: {
    position: 'absolute',
  },
  topLeft: {
    width: '50%',
    height: '50%',
    top: 0,
    left: 0,
  },
  topRight: {
    width: '50%',
    height: '50%',
    top: 0,
    right: 0,
  },
  bottomLeft: {
    width: '33%',
    height: '50%',
    bottom: 0,
    left: 0,
  },
  bottomRight: {
    width: '33%',
    height: '50%',
    bottom: 0,
    right: 0,
  },
  bottomCenter: {
    width: '34%',
    height: '50%',
    bottom: 0,
    left: '33%',
  },
  overlayContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileImage: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    marginRight: 10,
  },
  recapText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  actionIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionIcon: {
    marginLeft: 15,
  },
  nudgeButton: {
    backgroundColor: '#E8E8E8',
    marginHorizontal: 20,
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 30,
  },
  nudgeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
});