import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { ScreenProps } from '../types';
import { styles } from '../styles';

const CoupleModeUnlockedScreen: React.FC<ScreenProps> = ({ nextScreen }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Couple Mode</Text>
      </View>
      <View style={[styles.content, { alignItems: 'center' }]}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 16 }}>Hello 👋</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 24 }}>
          <View style={{ 
            width: 64, 
            height: 64, 
            borderRadius: 32, 
            backgroundColor: '#ffe0bb', 
            alignItems: 'center', 
            justifyContent: 'center', 
            marginRight: 8 
          }}>
            <Text style={{ fontSize: 28 }}>👩</Text>
          </View>
          <View style={{ 
            width: 64, 
            height: 64, 
            borderRadius: 32, 
            backgroundColor: '#e0bbff', 
            alignItems: 'center', 
            justifyContent: 'center', 
            marginLeft: 8 
          }}>
            <Text style={{ fontSize: 28 }}>👨</Text>
          </View>
        </View>
        <Text style={{ textAlign: 'center', color: '#666', marginBottom: 32, fontSize: 16 }}>
          Your partner just said <Text style={{ fontWeight: 'bold', color: '#FF3CAC' }}>YES!</Text> Couple mode is now unlocked — let the fun begin.
        </Text>
        <TouchableOpacity style={styles.button} onPress={nextScreen}>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CoupleModeUnlockedScreen;