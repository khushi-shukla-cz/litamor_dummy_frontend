import React from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { ScreenProps } from '../types';
import { styles } from '../styles';

const DateOfBirthScreen: React.FC<ScreenProps> = ({ formData, updateFormData, nextScreen }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>About You</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>What's your date of birth?</Text>
        <TextInput
          style={styles.input}
          placeholder="DD / MM / YYYY"
          value={formData.dateOfBirth}
          onChangeText={text => updateFormData('dateOfBirth', text)}
          placeholderTextColor="#aaa"
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={[styles.button, !formData.dateOfBirth.trim() && styles.buttonDisabled]}
          onPress={nextScreen}
          disabled={!formData.dateOfBirth.trim()}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DateOfBirthScreen;