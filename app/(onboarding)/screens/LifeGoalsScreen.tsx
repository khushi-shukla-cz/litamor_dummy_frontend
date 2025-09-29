import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { ScreenProps } from '../types';
import { styles } from '../styles';

const LifeGoalsScreen: React.FC<ScreenProps> = ({ formData, nextScreen, toggleLifeGoal }) => {
  const goals = [
    { name: 'Career Growth', icon: '🏢' },
    { name: 'Learning', icon: '🎓' },
    { name: 'Personal Growth', icon: '💪' },
    { name: 'Creating', icon: '🎨' },
    { name: 'Finding True Love', icon: '💖' },
    { name: 'Building a family', icon: '👨‍👩‍👧‍👦' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>About You</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>What is your Life Goal</Text>
        <Text style={{ color: '#888', marginBottom: 8 }}>Choose up to 2 options</Text>
        <View style={styles.grid}>
          {goals.map((goal) => (
            <TouchableOpacity
              key={goal.name}
              style={[styles.gridItem, formData.lifeGoals.includes(goal.name) && styles.gridItemSelected]}
              onPress={() => toggleLifeGoal?.(goal.name)}
            >
              <Text style={{ fontSize: 22 }}>{goal.icon}</Text>
              <Text style={[
                styles.gridItemText, 
                formData.lifeGoals.includes(goal.name) && styles.gridItemTextSelected
              ]}>
                {goal.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          style={[styles.button, formData.lifeGoals.length === 0 && styles.buttonDisabled]}
          onPress={nextScreen}
          disabled={formData.lifeGoals.length === 0}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LifeGoalsScreen;