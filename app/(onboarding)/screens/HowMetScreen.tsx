import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { ScreenProps } from '../types';
import { styles } from '../styles';

const HowMetScreen: React.FC<ScreenProps> = ({ formData, updateFormData, nextScreen }) => {
  const options = [
    'Through friends',
    'Online / Social Media',
    'College / Workplace',
    'Family / Relatives',
    'Other',
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Bond & Preferences</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>How did you both meet?</Text>
        <View style={{ width: '100%', marginBottom: 32 }}>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.optionButton, formData.howMet === option && styles.optionButtonSelected]}
              onPress={() => updateFormData('howMet', option)}
            >
              <Text style={[
                styles.optionButtonText, 
                formData.howMet === option && styles.optionButtonTextSelected
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          style={[styles.button, !formData.howMet && styles.buttonDisabled]}
          onPress={nextScreen}
          disabled={!formData.howMet}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HowMetScreen;