import React from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { ScreenProps } from '../types';
import { styles } from '../styles';

const NameScreen: React.FC<ScreenProps> = ({ formData, updateFormData, nextScreen }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>About You</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>What should we call you?</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          value={formData.name}
          onChangeText={text => updateFormData('name', text)}
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity
          style={[styles.button, !formData.name.trim() && styles.buttonDisabled]}
          onPress={nextScreen}
          disabled={!formData.name.trim()}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NameScreen;