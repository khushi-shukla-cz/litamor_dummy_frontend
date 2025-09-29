import React from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { ScreenProps } from '../types';
import { styles } from '../styles';

const BioScreen: React.FC<ScreenProps> = ({ formData, updateFormData, nextScreen }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>About You</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Write Something short and sweet</Text>
        <Text style={{ color: '#888', marginBottom: 8 }}>(max 150 chars)</Text>
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
          placeholder="About you"
          value={formData.bio}
          onChangeText={text => updateFormData('bio', text)}
          placeholderTextColor="#aaa"
          maxLength={150}
          multiline
        />
        <Text style={{ alignSelf: 'flex-end', color: '#888', marginBottom: 16 }}>
          {formData.bio.length}/150
        </Text>
        <TouchableOpacity
          style={[styles.button, !formData.bio.trim() && styles.buttonDisabled]}
          onPress={nextScreen}
          disabled={!formData.bio.trim()}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default BioScreen;