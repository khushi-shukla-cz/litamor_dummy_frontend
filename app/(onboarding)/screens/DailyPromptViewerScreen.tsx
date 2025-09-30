import { Href, router } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Dimensions, ImageBackground, StatusBar } from 'react-native';

const { width, height } = Dimensions.get('window');

// --- Design Constants (Based on the image) ---
const COLORS = {
  primary: '#FF4757',       // Heart/Accent color (used in Lit Amor logo)
  secondary: '#FFFFFF',     // White text/elements
  background: '#F0F0F0',    // Light background for the main screen container
  cardBackground: '#FFFFFF', // White background for card-like elements (like the date badge)
  overlay: 'rgba(0, 0, 0, 0.45)', // Dark transparent overlay for video
  barBackground: '#FFFFFF', // White for the main header and bottom navigation
  darkGray: '#4A4A4A',
  lightGray: '#A9A9A9',
  dayBadge: '#4A4A4A', // Dark background for 'Day 8' badge
};

// Dummy Data (Matching the screenshot content)
const promptData = {
  date: 'Aug 15, 2025',
  dayCount: 8,
  prompt: 'Show your surroundings and tell them what reminds you of them.',
  // Video thumbnail URL placeholder
  videoThumbnail: 'https://placehold.co/800x1200/404040/FFF?text=Video+Background', 
};


const DailyPromptViewerScreen: React.FC = () => {
    
  // --- UI Overlays (Header, Bottom Prompt, Play Button) ---
  
  const TopHeaderBar = () => (
    <View style={styles.topHeaderBar}>
        <View style={styles.appTitleContainer}>
            <Text style={styles.headerHeart}>❤️</Text>
            <Text style={styles.headerTitle}>Lit Amor</Text>
        </View>
        <View style={styles.headerIcons}>
            <Text style={styles.headerIconText}>⏰ 10 XP</Text>
            <Text style={styles.headerIconText}>👍 3</Text>
            <TouchableOpacity 
            onPress={()=>router.push('/(onboarding)/screens/ChatScreenHome' as Href)}
            >
              <View style={styles.chatIconContainer}>
                <Text style={styles.headerIconText}>💬</Text>
                <View style={styles.chatBadge} />
            </View>
            </TouchableOpacity>
        </View>
    </View>
  );
    
  const VideoHeaderOverlay = () => (
    // Video Header: Date and Day Badge
    <View style={styles.videoHeaderContainer}>
        <View style={styles.dateContainer}>
            <Text style={styles.dateIcon}>📅</Text>
            <Text style={styles.dateText}>{promptData.date}</Text>
        </View>
        
        <View style={styles.dayBadge}>
            <Text style={styles.dayText}>Day {promptData.dayCount}</Text>
        </View>
    </View>
  );

  const VideoBottomOverlay = () => (
    // Video Footer: Prompt Text
    <View style={styles.videoBottomOverlay}>
      <Text style={styles.promptHeader}>❤️ Prompt of the Day:</Text>
      <Text style={styles.promptText}>{promptData.prompt}</Text>
    </View>
  );
    
  const BottomNavBar = () => (
      // Placeholder for Bottom Navigation
      <View style={styles.footer}>
          {/* Icons: Home, Recents/Viewer, Settings, Chat/Notifications (Matching the image style) */}
          <Text style={styles.footerIcon}>🏠</Text>
          <Text style={styles.footerIcon}>🔄</Text>
          <Text style={styles.footerIcon}>⚙️</Text>
          <Text style={styles.footerIcon}>💬</Text>
      </View>
  );


  return (
    // SafeAreaView handles the top notch/status bar area
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
        
      <TopHeaderBar />
        
      {/* --- Main Content: Video Player --- */}
      <View style={styles.contentContainer}>
          <ImageBackground 
            source={{ uri: promptData.videoThumbnail }} 
            style={styles.videoPlayer}
          >
            {/* Dark Overlay on Video */}
            <View style={styles.videoOverlay} />

            {/* Play Button (Centered) */}
            <TouchableOpacity style={styles.playButton}>
                <Text style={styles.playIcon}>▶</Text>
            </TouchableOpacity>

            {/* Top and Bottom UI Overlays on Video */}
            <VideoHeaderOverlay />
            <VideoBottomOverlay />

          </ImageBackground>
      </View>
      
      {/* --- Footer/Bottom Navigation --- */}
      <BottomNavBar />
        
    </SafeAreaView>
  );
};

export default DailyPromptViewerScreen;

// --- Styles ---
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.barBackground, // White background for the header area
    },
    contentContainer: {
        flex: 1, // Video takes up all remaining space
        backgroundColor: COLORS.background, // Light gray border area (if any)
    },
    
    // ----------------- Top Header Bar -----------------
    topHeaderBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: COLORS.barBackground,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.background,
    },
    appTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerHeart: {
        fontSize: 18,
        color: COLORS.primary,
        marginRight: 5,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.darkGray,
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerIconText: {
        fontSize: 14,
        color: COLORS.darkGray,
        marginLeft: 15,
        fontWeight: '500',
    },
    chatIconContainer: {
        position: 'relative',
        marginLeft: 15,
    },
    chatBadge: {
        position: 'absolute',
        top: -2,
        right: -5,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.primary, // Red/Accent color for notification dot
    },

    // ----------------- Video Player Area -----------------
    videoPlayer: {
        flex: 1, 
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        // Note: The main ImageBackground is set in contentContainer which has flex: 1
    },
    videoOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: COLORS.overlay, // Dark transparent layer
    },

    // Play Button
    playButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: COLORS.secondary,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.85,
    },
    playIcon: {
        fontSize: 30,
        marginLeft: 5,
        color: COLORS.darkGray,
    },
    
    // Video Header (Date & Day Badge)
    videoHeaderContainer: {
        position: 'absolute',
        top: 20, // Padding from the top of the video area
        left: 20,
        right: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    dateIcon: {
        fontSize: 14,
        marginRight: 5,
    },
    dateText: {
        fontSize: 14,
        color: COLORS.secondary,
        fontWeight: '500',
    },
    dayBadge: {
        backgroundColor: COLORS.dayBadge,
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    dayText: {
        fontSize: 14,
        color: COLORS.secondary,
        fontWeight: '600',
    },
    
    // Video Bottom Overlay (Prompt)
    videoBottomOverlay: {
        position: 'absolute',
        bottom: 20, 
        left: 20,
        right: 20,
    },
    promptHeader: {
        fontSize: 14,
        color: COLORS.secondary,
        fontWeight: '600',
        marginBottom: 5,
    },
    promptText: {
        fontSize: 18,
        color: COLORS.secondary,
        fontWeight: '700',
    },

    // ----------------- Footer/Bottom Nav -----------------
    footer: {
        height: 60, 
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: COLORS.barBackground,
        borderTopWidth: 1,
        borderTopColor: COLORS.background,
        width: width,
    },
    footerIcon: {
        color: COLORS.darkGray,
        fontSize: 22,
        opacity: 0.6,
    }
});