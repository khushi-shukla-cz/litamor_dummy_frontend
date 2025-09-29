import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { ScreenProps } from '../types';
import { styles } from '../styles';

const GenderScreen: React.FC<ScreenProps> = ({ formData, updateFormData, nextScreen }) => {
  const genders = ['Male', 'Female', 'Non-binary', 'Transgender', 'Prefer not to say'];
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>About You</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>What's your Gender?</Text>
        <View style={{ width: '100%', marginBottom: 32 }}>
          {genders.map((gender) => (
            <TouchableOpacity
              key={gender}
              style={[styles.optionButton, formData.gender === gender && styles.optionButtonSelected]}
              onPress={() => updateFormData('gender', gender)}
            >
              <Text style={[styles.optionButtonText, formData.gender === gender && styles.optionButtonTextSelected]}>
                {gender}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          style={[styles.button, !formData.gender && styles.buttonDisabled]}
          onPress={nextScreen}
          disabled={!formData.gender}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default GenderScreen;