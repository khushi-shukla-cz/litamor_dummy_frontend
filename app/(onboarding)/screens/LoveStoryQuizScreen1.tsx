import React from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
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
};

const LoveStoryQuizScreen1: React.FC<ScreenProps> = ({ formData, updateFormData, nextScreen, setCurrentScreen }) => {
  const isDateValid = formData.anniversaryDate?.length === 10;
  
  const handleBack = () => {
    setCurrentScreen(18);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={{ paddingRight: 15 }}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: '50%' }]} />
        </View>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.headerText}>About You</Text>
        
        <Text style={styles.titleLarge}>Your Anniversary / Special Day</Text>
        
        <TextInput
          style={styles.dateInput}
          placeholder="DD / MM / YYYY"
          placeholderTextColor={COLORS.darkGray}
          value={formData.anniversaryDate || ''}
          onChangeText={(text) => updateFormData('anniversaryDate', text)}
          keyboardType="numeric"
          maxLength={10}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, !isDateValid && styles.buttonDisabled]}
        onPress={nextScreen}
        disabled={!isDateValid}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoveStoryQuizScreen1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 25,
    paddingVertical: 15,
    backgroundColor: COLORS.background,
  },
  backButton: {
    fontSize: 24,
    color: COLORS.secondary,
    fontWeight: 'bold',
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
  headerText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  titleLarge: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.secondary,
    marginBottom: 40,
  },
  dateInput: {
    width: '100%',
    height: 60,
    paddingHorizontal: 20,
    backgroundColor: COLORS.lightGray,
    borderRadius: 12,
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.secondary,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: COLORS.lightGray,
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
