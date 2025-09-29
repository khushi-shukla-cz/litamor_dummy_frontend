import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { ScreenProps } from '../types';
import { styles } from '../styles';

const PhotoUploadScreen: React.FC<ScreenProps> = ({ nextScreen }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>About You</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Upload your Photos</Text>
        <Text style={{ color: '#888', marginBottom: 8 }}>
          Your photos will be visible after 3-4 days of matching
        </Text>
        <View style={styles.photoGrid}>
          {[1, 2, 3, 4, 5, 6].map((slot) => (
            <View key={slot} style={styles.photoSlot}>
              <Text style={{ fontSize: 32, color: '#ccc' }}>+</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={nextScreen}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PhotoUploadScreen;