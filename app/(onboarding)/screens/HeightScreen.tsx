import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { ScreenProps } from '../types';
import { styles } from '../styles';

const HeightScreen: React.FC<ScreenProps> = ({ formData, updateFormData, nextScreen }) => {
  const heights = ['165', '166', '167', '168', '169', '170'];
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>About You</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>How tall are you?</Text>
        <View style={{ width: '100%', marginBottom: 32 }}>
          {heights.map((height) => (
            <TouchableOpacity
              key={height}
              style={[styles.optionButton, formData.height === height && styles.optionButtonSelected]}
              onPress={() => updateFormData('height', height)}
            >
              <Text style={[styles.optionButtonText, formData.height === height && styles.optionButtonTextSelected]}>
                {height} cm
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          style={[styles.button, !formData.height && styles.buttonDisabled]}
          onPress={nextScreen}
          disabled={!formData.height}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HeightScreen;