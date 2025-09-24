// Helper to render partner icon in monthly view
const PartnerIcon = ({ size = 32, style = {} }) => (
  <Image
    source={require('./assets/icons/male.png')}
    style={[
      {
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: '#fff',
        resizeMode: 'cover',
        overflow: 'hidden',
      },
      style,
    ]}
  />
);
// Example usage in monthly view for partners:
// <PartnerIcon size={40} />
import React, { useState } from 'react';
import { Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from './components/Icon';

const { width } = Dimensions.get('window');

const CouplesApp = () => {
  const [currentScreen, setCurrentScreen] = useState('weekly');
  const [sliderValue, setSliderValue] = useState(60);
  const [goodDifficult, setGoodDifficult] = useState('');
  const [improvement, setImprovement] = useState('');

  // Header Component
  type HeaderProps = {
    title: string;
    subtitle?: string;
    showHeart?: boolean;
  };
  const Header = ({ title, subtitle, showHeart = true }: HeaderProps) => (
    <View style={styles.headerContainer}>
      <View style={styles.headerContent}>
        <View>
          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle}>{title}</Text>
          </View>
          <View style={styles.subtitleContainer}>
            <Text style={styles.clockIcon}>🕐</Text>
            <Text style={styles.headerSubtitle}>{subtitle}</Text>
          </View>
          {/* Add current screen name below subtitle */}
          <View style={{ marginTop: 4 }}>
            <Text style={{ color: '#6B7280', fontWeight: 'bold', fontSize: 14 }}>
              {currentScreen === 'weekly' && 'Weekly'}
              {currentScreen === 'after-submitting' && 'After Submit'}
              {currentScreen === 'monthly' && 'Monthly'}
            </Text>
          </View>
        </View>
        {showHeart && (
          <View style={styles.heartContainer}>
            <View style={styles.heartInner}>
              <Icon name="heart" size={36} style={styles.heartIconStyle} />
            </View>
          </View>
        )}
      </View>
    </View>
  );

  // Progress Bar Component
  type ProgressBarProps = {
    title: string;
    current: number;
    total: number;
    week?: string | number;
    isCompleted?: boolean;
  };
  const ProgressBar = ({ title, current, total, week, isCompleted = false }: ProgressBarProps) => {
    const progress = (current / total) * 100;
    
    return (
      <View style={styles.progressBarContainer}>
        <Text style={styles.weekText}>{week}</Text>
        <View style={styles.progressHeader}>
          <Text style={styles.progressTitle}>{title}</Text>
          <Text style={styles.progressNumbers}>
            <Text style={isCompleted ? styles.completedText : styles.currentText}>
              {current}
            </Text>
            <Text style={styles.totalText}>/{total}</Text>
          </Text>
        </View>
        
        <View style={styles.progressBarTrack}>
          <View 
            style={[styles.progressBarFill, { width: `${progress}%` }]}
          >
            <View style={styles.progressIndicator}>
              <Text style={styles.checkIcon}>✓</Text>
            </View>
          </View>
          {!isCompleted && (
            <>
              <View style={styles.progressBarLocked}>
                <Text style={styles.lockIcon}>🔒</Text>
              </View>
            </>
          )}
        </View>
      </View>
    );
  };

  // User Avatar Component
  type UserAvatarProps = {
    name: string;
    status?: string;
    isCompleted?: boolean;
    avatar: string;
  };
  const UserAvatar = ({ name, status, isCompleted, avatar }: UserAvatarProps) => (
    <View style={styles.avatarContainer}>
      <View style={styles.avatarCircle}>
          {avatar === 'female' ? (
            <Image
              source={require('./assets/icons/female.png')}
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                backgroundColor: '#fff',
                resizeMode: 'cover',
                overflow: 'hidden',
              }}
            />
          ) : avatar === 'male' ? (
            <Image
              source={require('./assets/icons/male.png')}
              style={styles.avatarIconFilled}
            />
          ) : (
            <Text style={styles.avatarEmoji}>{avatar}</Text>
          )}
      </View>
      <Text style={styles.avatarName}>{name}</Text>
      <Text style={[styles.avatarStatus, isCompleted ? styles.completedStatus : styles.pendingStatus]}>
        {status}
      </Text>
    </View>
  );

  // Week Tabs Component
  const WeekTabs = ({ activeWeek = 2 }) => {
    const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    
    return (
      <View style={styles.weekTabsContainer}>
        <View style={styles.weekTabsHeader}>
          <View style={styles.partnerInfo}>
            <View style={styles.partnerAvatar}>
              <Image
                source={require('./assets/icons/partner.png')}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 16,
                  backgroundColor: '#F87171',
                  transform: [{ scaleX: -1 }],
                }}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.partnerName}>Partner</Text>
          </View>
          <Text style={styles.youName}>You</Text>
        </View>
        
        <View style={styles.progressLine} />
        
        <View style={styles.weekButtonsContainer}>
          {weeks.map((week, index) => (
            <TouchableOpacity
              key={week}
              style={[
                styles.weekButton,
                activeWeek === index + 1 ? styles.activeWeekButton : styles.inactiveWeekButton
              ]}
            >
              <Text style={[
                styles.weekButtonText,
                activeWeek === index + 1 ? styles.activeWeekText : styles.inactiveWeekText
              ]}>
                {week}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  // Weekly Feedback Screen
  const WeeklyFeedbackScreen = () => (
    <View style={styles.screenContainer}>
      <View style={styles.greyBackground}>
        <Header title="Week 2" subtitle="14 days" />
        <ProgressBar 
          title="Earn 50 Quest Points"
          current={20}
          total={50}
          week="Week 1 completed"
        />
      </View>
      
      <View style={styles.whiteBackground}>
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackTitle}>
            How did your partner's effort feel this week?
          </Text>
          <Text style={styles.feedbackSubtitle}>
            Take a few minutes to reflect on your love this week.
          </Text>
          
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderEmoji}>💚</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={100}
              value={sliderValue}
              onValueChange={setSliderValue}
              minimumTrackTintColor="#10B981"
              maximumTrackTintColor="#E5E7EB"
            />
          </View>
          
          <Text style={styles.sliderDescription}>
            You were present and consistent. I felt balanced and supported.
          </Text>
          
          <TextInput
            style={styles.textArea}
            placeholder="What was good or difficult in the relationship this week?"
            value={goodDifficult}
            onChangeText={setGoodDifficult}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          
          <TextInput
            style={styles.textArea}
            placeholder="What small thing can we try or change next week to feel more connected?"
            value={improvement}
            onChangeText={setImprovement}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          
          <TouchableOpacity 
            style={styles.submitButton}
            onPress={() => setCurrentScreen('after-submitting')}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  // After Submitting Screen
  const AfterSubmittingScreen = () => (
    <View style={styles.screenContainer}>
      <View style={styles.greyBackground}>
        <Header title="Week 2" subtitle="14 days" />
        <ProgressBar 
          title="Earn 50 Quest Points"
          current={20}
          total={50}
          week="Week 1 completed"
        />
      </View>
      
      <View style={styles.whiteBackground}>
        <View style={styles.feedbackContainer}>
          <View style={styles.reflectionHeader}>
            <Text style={styles.reflectionTitle}>Couple Reflections</Text>
            <Text style={styles.nextInText}>NEXT IN 7 DAYS</Text>
          </View>
          
          <View style={styles.waitingContainer}>
            <Text style={styles.waitingTitle}>
              Waiting for your partner to share theirs.
            </Text>
            
            <View style={styles.completionProgress}>
              <View style={styles.completionBar}>
                <Text style={styles.rocketIcon}>🚀</Text>
              </View>
            </View>
            
            <Text style={styles.completedText}>You completed !</Text>
            
            <View style={styles.avatarsContainer}>
              <UserAvatar 
                name="You"
                status="Completed ✅"
                isCompleted={true}
                avatar="female"
              />
              <UserAvatar 
                name="Your Partner"
                status="Pending ⏳"
                isCompleted={false}
                avatar="male"
              />
            </View>
            
            <TouchableOpacity style={styles.nudgeButton}>
              <Text style={styles.nudgeButtonText}>🚀 Nudge them to complete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  // Monthly View Screen
  const MonthlyViewScreen = () => (
    <View style={styles.screenContainer}>
      <View style={styles.greyBackground}>
        <Header title="September" subtitle="Completed !" />
        <ProgressBar 
          title="Earn 50 Quest Points"
          current={50}
          total={50}
          week="Week 4 Completed !"
          isCompleted={true}
        />
      </View>
      
      <ScrollView style={styles.whiteBackground} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <WeekTabs activeWeek={2} />
        
        <View style={[styles.feedbackContainer, styles.monthlyContainer]}>
          <Text style={styles.feedbackTitle}>
            How did your partner's effort feel this week?
          </Text>
          <Text style={styles.feedbackSubtitle}>
            Take a few minutes to reflect on your love this week.
          </Text>
          
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderEmoji}>❤️</Text>
            <Slider
              style={styles.slider}
              minimumValue={0}
              maximumValue={100}
              value={40}
              disabled
              minimumTrackTintColor="#EF4444"
              maximumTrackTintColor="#E5E7EB"
            />
          </View>
          
          <Text style={styles.sliderDescription}>
            You really showed up this week. Your effort made me feel loved and seen.
          </Text>
          
          <View style={styles.responseSection}>
            <Text style={styles.responseTitle}>
              What was good or difficult this week?
            </Text>
            <View style={styles.responseContainer}>
              <Text style={styles.responseText}>
                We spent quality time together, but got busy midweek. I felt distant because we barely 
                talked some days. We laughed a lot, but argued about chores.
              </Text>
            </View>
          </View>
          
          <View style={styles.responseSection}>
            <Text style={styles.responseTitle}>
              What small thing can we try or change next week to feel more connected?
            </Text>
            <View style={styles.responseContainer}>
              <Text style={styles.responseText}>
                Plan one dinner without phones. Send a good morning text daily. Take a short evening walk together.
              </Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Show You Care 💜</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );

  // Navigation
  const screens: { [key: string]: () => JSX.Element } = {
    weekly: WeeklyFeedbackScreen,
    'after-submitting': AfterSubmittingScreen,
    monthly: MonthlyViewScreen
  };

  const Screen = screens[currentScreen];

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {/* Screen Navigation */}
        <View style={styles.navigationContainer}>
          <View style={styles.navigationButtons}>
            <TouchableOpacity
              onPress={() => setCurrentScreen('weekly')}
              style={[styles.navButton, currentScreen === 'weekly' && styles.activeNavButton]}
            >
              <Text style={[styles.navButtonText, currentScreen === 'weekly' && styles.activeNavText]}>
                Weekly
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setCurrentScreen('after-submitting')}
              style={[styles.navButton, currentScreen === 'after-submitting' && styles.activeNavButton]}
            >
              <Text style={[styles.navButtonText, currentScreen === 'after-submitting' && styles.activeNavText]}>
                After Submit
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setCurrentScreen('monthly')}
              style={[styles.navButton, currentScreen === 'monthly' && styles.activeNavButton]}
            >
              <Text style={[styles.navButtonText, currentScreen === 'monthly' && styles.activeNavText]}>
                Monthly
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Screen />
        <StatusBar style="light" />
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4B5563',
  },
  screenContainer: {
    flex: 1,
    backgroundColor: '#4B5563',
  },
  greyBackground: {
    backgroundColor: '#4B5563',
    paddingBottom: 0,
  },
  whiteBackground: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingTop: 20,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  navigationContainer: {
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    zIndex: 50,
    alignItems: 'center',
  },
  navigationButtons: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  navButton: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginHorizontal: 4,
    borderRadius: 6,
  },
  activeNavButton: {
    backgroundColor: 'white',
  },
  navButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  activeNavText: {
    color: 'black',
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 24,
    position: 'relative',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleContainer: {
    backgroundColor: '#D1D5DB',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 8,
  },
  headerTitle: {
    color: '#1F2937',
    fontWeight: '600',
    fontSize: 18,
  },
  subtitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clockIcon: {
    marginRight: 8,
    fontSize: 16,
  },
  headerSubtitle: {
    color: '#D1D5DB',
  },
  heartContainer: {
    backgroundColor: '#D1D5DB',
    borderRadius: 28,
    width: 56,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  heartInner: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartIcon: {
    fontSize: 20,
  },
  heartIconStyle: {
    borderRadius: 20, // Make it circular to fill the white background
  },
  progressBarContainer: {
    backgroundColor: '#E5E7EB',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 24,
  },
  weekText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  progressNumbers: {
    fontSize: 18,
    fontWeight: '600',
  },
  completedText: {
    color: '#059669',
  },
  currentText: {
    color: '#6B7280',
  },
  totalText: {
    color: '#9CA3AF',
  },
  progressBarTrack: {
    backgroundColor: '#D1D5DB',
    height: 16,
    borderRadius: 8,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  progressBarFill: {
    backgroundColor: '#10B981',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 4,
  },
  progressIndicator: {
    backgroundColor: 'white',
    borderRadius: 6,
    width: 12,
    height: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    color: '#10B981',
    fontSize: 8,
  },
  progressBarLocked: {
    backgroundColor: '#9CA3AF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lockIcon: {
    fontSize: 10,
  },
  contentContainer: {
    paddingBottom: 32,
  },
  feedbackContainer: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 24,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  monthlyContainer: {
    // No border for monthly view - matches s3 design
  },
  feedbackTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  feedbackSubtitle: {
    color: '#6B7280',
    marginBottom: 24,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sliderEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  slider: {
    flex: 1,
    height: 8,
  },
  sliderDescription: {
    color: '#6B7280',
    fontSize: 14,
    marginBottom: 24,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 16,
    height: 120,
    marginBottom: 16,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#4B5563',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
  reflectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  reflectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  nextInText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  waitingContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 16,
  },
  waitingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  completionProgress: {
    backgroundColor: '#10B981',
    height: 12,
    borderRadius: 6,
    marginBottom: 12,
    position: 'relative',
  },
  completionBar: {
    position: 'absolute',
    right: 8,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  rocketIcon: {
    fontSize: 16,
  },
  avatarsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  avatarContainer: {
    alignItems: 'center',
  },
  avatarCircle: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarEmoji: {
    fontSize: 32,
  },
  avatarIcon: {
    // No borderRadius on the icon itself - let the container handle the circular clipping
  },
  avatarIconFilled: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  avatarName: {
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  avatarStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  completedStatus: {
    color: '#059669',
  },
  pendingStatus: {
    color: '#F59E0B',
  },
  nudgeButton: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  nudgeButtonText: {
    color: '#374151',
    fontWeight: '500',
  },
  weekTabsContainer: {
    backgroundColor: 'transparent',
    padding: 16,
    marginHorizontal: 16,
    marginTop: 16,
  },
  weekTabsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  partnerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  partnerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F87171',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  partnerAvatarText: {
    color: 'white',
    fontSize: 16,
  },
  partnerName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  youName: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  progressLine: {
    backgroundColor: '#10B981',
    height: 8,
    borderRadius: 4,
    marginBottom: 16,
  },
  weekButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  weekButton: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  activeWeekButton: {
    backgroundColor: '#1F2937',
  },
  inactiveWeekButton: {
    backgroundColor: '#E5E7EB',
  },
  weekButtonText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  activeWeekText: {
    color: 'white',
  },
  inactiveWeekText: {
    color: '#6B7280',
  },
  responseSection: {
    marginBottom: 16,
  },
  responseTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  responseContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 16,
  },
  responseText: {
    color: '#374151',
    lineHeight: 24,
  },
});

export default CouplesApp;
