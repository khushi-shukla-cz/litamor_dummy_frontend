import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { ScreenProps } from '../types';
import { styles } from '../styles';

const InvitationFemaleScreen: React.FC<ScreenProps> = ({ nextScreen, setCurrentScreen }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Invite</Text>
      </View>
      <View style={[styles.content, { alignItems: 'center' }]}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 16 }}>Hello 👋</Text>
        <View style={{ 
          width: 96, 
          height: 96, 
          borderRadius: 48, 
          backgroundColor: '#ffe0bb', 
          alignItems: 'center', 
          justifyContent: 'center', 
          marginBottom: 24 
        }}>
          <Text style={{ fontSize: 40 }}>👩</Text>
        </View>
        <Text style={{ textAlign: 'center', color: '#666', marginBottom: 32 }}>
          You've got an invitation from <Text style={{ fontWeight: 'bold', color: '#FF3CAC' }}>Amy</Text> to join LitAmor.
        </Text>
        <TouchableOpacity style={styles.button} onPress={nextScreen}>
          <Text style={styles.buttonText}>Accept the Invite</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.button, { 
            backgroundColor: '#fff', 
            borderWidth: 1, 
            borderColor: '#FF3CAC', 
            marginTop: 12 
          }]} 
          onPress={() => setCurrentScreen(1)}
        >
          <Text style={[styles.buttonText, { color: '#FF3CAC' }]}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default InvitationFemaleScreen;