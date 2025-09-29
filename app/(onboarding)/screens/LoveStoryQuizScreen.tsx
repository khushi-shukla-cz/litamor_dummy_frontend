import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { ScreenProps } from '../types';
import { styles } from '../styles';

const LoveStoryQuizScreen: React.FC<ScreenProps> = ({ nextScreen }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Love Story Quiz</Text>
      </View>
      <View style={[styles.content, { alignItems: 'center', flex: 1, justifyContent: 'center' }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
          <View style={{ 
            width: 48, 
            height: 48, 
            borderRadius: 24, 
            backgroundColor: '#ffe0bb', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <Text style={{ fontSize: 22 }}>👩</Text>
          </View>
          <View style={{ 
            width: 56, 
            height: 56, 
            borderRadius: 28, 
            backgroundColor: '#baffbb', 
            alignItems: 'center', 
            justifyContent: 'center', 
            marginHorizontal: 8 
          }}>
            <Text style={{ fontSize: 26 }}>👫</Text>
          </View>
          <View style={{ 
            width: 48, 
            height: 48, 
            borderRadius: 24, 
            backgroundColor: '#e0bbff', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <Text style={{ fontSize: 22 }}>👨</Text>
          </View>
        </View>
        <Text style={{ 
          fontSize: 20, 
          fontWeight: 'bold', 
          color: '#333', 
          textAlign: 'center', 
          marginBottom: 12 
        }}>
          How well do you two really know your love story?
        </Text>
        <Text style={{ color: '#888', textAlign: 'center', marginBottom: 32 }}>
          Time to test your match!
        </Text>
        <TouchableOpacity style={styles.button} onPress={nextScreen}>
          <Text style={styles.buttonText}>Let's Go</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LoveStoryQuizScreen;