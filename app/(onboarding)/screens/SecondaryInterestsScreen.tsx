import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { ScreenProps } from '../types';
import { styles } from '../styles';

const SecondaryInterestsScreen: React.FC<ScreenProps> = ({ formData, nextScreen, toggleSecondaryInterest }) => {
  const interests = [
    { name: 'Music', icon: '🎵' },
    { name: 'Reading', icon: '📚' },
    { name: 'Coding', icon: '💻' },
    { name: 'Creativity', icon: '✏️' },
    { name: 'Fitness', icon: '🏃' },
    { name: 'Languages', icon: '🌍' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>About You</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Do you also have any secondary learning interests?</Text>
        <View style={styles.grid}>
          {interests.map((interest) => (
            <TouchableOpacity
              key={interest.name}
              style={[styles.gridItem, formData.secondaryInterests.includes(interest.name) && styles.gridItemSelected]}
              onPress={() => toggleSecondaryInterest?.(interest.name)}
            >
              <Text style={{ fontSize: 22 }}>{interest.icon}</Text>
              <Text style={[
                styles.gridItemText, 
                formData.secondaryInterests.includes(interest.name) && styles.gridItemTextSelected
              ]}>
                {interest.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={nextScreen}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SecondaryInterestsScreen;