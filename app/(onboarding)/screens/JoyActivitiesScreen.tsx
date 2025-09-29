import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { ScreenProps } from '../types';
import { styles } from '../styles';

const JoyActivitiesScreen: React.FC<ScreenProps> = ({ formData, nextScreen, toggleJoyActivity }) => {
  const activities = [
    { name: 'Music', icon: '🎵' },
    { name: 'Reading', icon: '📚' },
    { name: 'Cooking', icon: '🍳' },
    { name: 'Gaming', icon: '🎮' },
    { name: 'Movies', icon: '🎬' },
    { name: 'Dancing', icon: '💃' },
    { name: 'Sleeping', icon: '😴' },
    { name: 'Writing', icon: '✍️' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>About You</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Pick a few things that bring you joy</Text>
        <Text style={{ color: '#888', marginBottom: 8 }}>Choose up to 4 options</Text>
        <View style={styles.grid}>
          {activities.map((activity) => (
            <TouchableOpacity
              key={activity.name}
              style={[styles.gridItem, formData.joyActivities.includes(activity.name) && styles.gridItemSelected]}
              onPress={() => toggleJoyActivity?.(activity.name)}
            >
              <Text style={{ fontSize: 22 }}>{activity.icon}</Text>
              <Text style={[
                styles.gridItemText, 
                formData.joyActivities.includes(activity.name) && styles.gridItemTextSelected
              ]}>
                {activity.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity
          style={[styles.button, formData.joyActivities.length === 0 && styles.buttonDisabled]}
          onPress={nextScreen}
          disabled={formData.joyActivities.length === 0}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default JoyActivitiesScreen;