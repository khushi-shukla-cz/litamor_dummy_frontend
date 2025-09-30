import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, StyleSheet, Dimensions, TextInput } from 'react-native';
import { ScreenProps } from '../types';
import { Href, router } from 'expo-router';

const { width } = Dimensions.get('window');

const COLORS = {
  primary: '#FF4757',
  secondary: '#3A3A3A',
  background: '#FFFFFF',
  lightGray: '#F0F0F0',
  darkGray: '#A9A9A9',
  white: '#FFFFFF',
  disabled: '#FF99A4',
};

const LoveStoryQuizScreen10: React.FC<ScreenProps> = ({ formData, updateFormData, nextScreen, setCurrentScreen }) => {
  // Local state for formatted input
  const [dateInput, setDateInput] = useState<string>(formData.anniversaryDate || '');

  // Function to format the date as DD/MM/YYYY while typing
  const formatAndSetDate = (text: string): void => {
    // Remove all non-digit characters
    let digits = text.replace(/\D/g, '');
    let formattedDate = '';

    // Apply DD/MM/YYYY mask
    if (digits.length > 0) {
      formattedDate += digits.substring(0, 2);
    }
    if (digits.length >= 3) {
      formattedDate += '/' + digits.substring(2, 4);
    }
    if (digits.length >= 5) {
      formattedDate += '/' + digits.substring(4, 8);
    }

    setDateInput(formattedDate);
    // Only save valid 10-character date to formData
    if (formattedDate.length === 10) {
      updateFormData('anniversaryDate', formattedDate);
    } else {
      updateFormData('anniversaryDate', '');
    }
  };

  // Enable Next button only if the date is in DD/MM/YYYY format (length 10)
  const isNextEnabled: boolean = dateInput.length === 10 && dateInput.split('/').length === 3;
  
  const handleBack = (): void => {
    setCurrentScreen(27); 
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.headerBackContainer}>
            <Text style={styles.backButton}>← About You</Text> 
        </TouchableOpacity>
        <View style={styles.progressBarContainer}>
          {/* ProgressBar: मान लीजिए यह यहाँ 10% है (या जो भी आपके फ्लो के अनुसार हो) */}
          <View style={[styles.progressBar, { width: '10%' }]} /> 
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Your Anniversary / Special Day</Text>
        
        <TextInput
          style={styles.dateInput}
          placeholder="DD / MM / YYYY"
          placeholderTextColor={COLORS.darkGray}
          value={dateInput}
          onChangeText={formatAndSetDate}
          keyboardType="numeric"
          maxLength={10}
        />

        {/* Note: यहां कोई subHeader नहीं है, जैसा कि इमेज में है, इसलिए इसे हटा दिया गया है */}
      </View>

      <TouchableOpacity
        style={[styles.button, !isNextEnabled && styles.buttonDisabled]}
        onPress={()=>router.push('/(onboarding)/screens/HomeScreen' as Href)}
        disabled={!isNextEnabled}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoveStoryQuizScreen10;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: 25,
    paddingTop: 40,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 15,
    backgroundColor: COLORS.background,
    // Note: ProgressBar line is already visible
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
    height: 3, // Smaller progress bar for this 'About You' section
    backgroundColor: COLORS.lightGray,
    borderRadius: 3,
    position: 'absolute',
    top: 55, // Positioned below the header text
    left: 25,
    right: 25,
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.secondary,
    marginBottom: 20,
  },
  
  // Date Input Styles
  dateInput: {
    height: 55,
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    paddingHorizontal: 15,
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.secondary,
    textAlign: 'center', // Center the placeholder text as shown in the image
  },

  // Button Styles
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