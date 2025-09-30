import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { ScreenProps } from '../types';

const { width } = Dimensions.get('window');

const COLORS = {
  primary: '#FF4757',
  secondary: '#3A3A3A',
  background: '#FFFFFF',
  lightGray: '#F0F0F0',
  darkGray: '#A9A9A9',
  white: '#FFFFFF',
  disabled: '#FF99A4',
  black: '#000000',
};

const dateIdeas = [
  'Watching the sunset', 'Dinner & deep talks', 'Fun activity or game night', 
  'Music, dancing, or a live event', 'A cozy night in',
];

const LoveStoryQuizScreen7: React.FC<ScreenProps> = ({ formData, updateFormData, nextScreen, setCurrentScreen }) => {
  const toggleDateIdea = (idea: string) => {
    const selected = formData.perfectDateIdea?.includes(idea) || false;
    let newIdeas = selected
      ? formData.perfectDateIdea.filter((i) => i !== idea)
      : [...(formData.perfectDateIdea || []), idea];
    
    updateFormData('perfectDateIdea', newIdeas);
  };

  const isNextEnabled = formData.perfectDateIdea && formData.perfectDateIdea.length > 0;
  
  const handleBack = () => {
    setCurrentScreen(24); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.headerBackContainer}>
            <Text style={styles.backButton}>← 🌟 Bond & Preferences</Text>
        </TouchableOpacity>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: '100%' }]} />
        </View>
      </View>

      <Text style={styles.subHeader}>
        Find out your Love Story Score and discover how in-sync you really are.
      </Text>
      
      <ScrollView style={styles.content}>
        <Text style={styles.title}>What's your idea of a perfect date together?</Text>
        
        {dateIdeas.map((idea) => (
          <TouchableOpacity
            key={idea}
            style={styles.checkboxOption}
            onPress={() => toggleDateIdea(idea)}
            activeOpacity={0.7}
          >
            <View 
              style={formData.perfectDateIdea?.includes(idea) ? styles.checkboxChecked : styles.checkboxUnchecked} 
            >
                {formData.perfectDateIdea?.includes(idea) && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.optionText}>{idea}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={[styles.button, !isNextEnabled && styles.buttonDisabled]}
        onPress={nextScreen}
        disabled={!isNextEnabled}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoveStoryQuizScreen7;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: 25,
    paddingTop: 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 15,
    backgroundColor: COLORS.background,
  },
  headerBackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 15,
  },
  backButton: {
    fontSize: 16,
    color: COLORS.secondary,
    fontWeight: '600',
  },
  progressBarContainer: {
    flex: 1,
    height: 6,
    backgroundColor: COLORS.lightGray,
    borderRadius: 3,
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  subHeader: {
    fontSize: 14,
    color: COLORS.darkGray,
    textAlign: 'center',
    marginHorizontal: 25,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.secondary,
    marginBottom: 20,
  },
  
  checkboxOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.lightGray,
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.secondary,
    marginLeft: 15,
  },
  
  checkboxUnchecked: {
    height: 24,
    width: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.darkGray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    height: 24,
    width: 24,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmark: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: -2,
  },

  button: {
    width: width - 50,
    height: 55,
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 30,
    elevation: 3,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
  },
  buttonDisabled: {
    backgroundColor: COLORS.disabled,
  },
});