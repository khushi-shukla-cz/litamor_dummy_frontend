import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { ScreenProps } from '../types';
import { styles } from '../styles';

const RelationshipDurationScreen: React.FC<ScreenProps> = ({ formData, updateFormData }) => {
  const options = [
    'Just started dating (0-3 months)',
    'In a steady relationship (3-12 months)',
    'Long-term (1-3 years)',
    'Very long-term (3+ years)',
  ];

  const handleComplete = () => {
    Alert.alert('Onboarding Complete!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Bond & Preferences</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>How long have you been together?</Text>
        <View style={{ width: '100%', marginBottom: 32 }}>
          {options.map((option) => (
            <TouchableOpacity
              key={option}
              style={[styles.optionButton, formData.relationshipDuration === option && styles.optionButtonSelected]}
              onPress={() => updateFormData('relationshipDuration', option)}
            >
              <Text style={[
                styles.optionButtonText, 
                formData.relationshipDuration === option && styles.optionButtonTextSelected
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          style={[styles.button, !formData.relationshipDuration && styles.buttonDisabled]}
          onPress={handleComplete}
          disabled={!formData.relationshipDuration}
        >
          <Text style={styles.buttonText}>Complete</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RelationshipDurationScreen;