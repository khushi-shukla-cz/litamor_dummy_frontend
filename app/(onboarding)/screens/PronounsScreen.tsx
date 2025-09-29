import React from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { ScreenProps } from '../types';
import { styles } from '../styles';

const PronounsScreen: React.FC<ScreenProps> = ({ formData, updateFormData, nextScreen }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>About You</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>What's your pronouns?</Text>
        <Text style={{ color: '#888', marginBottom: 8 }}>(Optional)</Text>
        <View style={{ width: '100%', marginBottom: 24 }}>
          <TextInput
            style={styles.input}
            value={formData.pronouns}
            onChangeText={text => updateFormData('pronouns', text)}
            placeholder="They/Them"
            placeholderTextColor="#aaa"
          />
        </View>
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          width: '100%', 
          marginBottom: 24 
        }}>
          <Text style={{ color: '#333', fontSize: 16 }}>Show on profile</Text>
          <TouchableOpacity
            onPress={() => updateFormData('showPronouns', !formData.showPronouns)}
            style={{ 
              width: 50, 
              height: 30, 
              borderRadius: 15, 
              backgroundColor: formData.showPronouns ? '#FF3CAC' : '#ccc', 
              justifyContent: 'center' 
            }}
          >
            <View style={{ 
              width: 26, 
              height: 26, 
              borderRadius: 13, 
              backgroundColor: '#fff', 
              marginLeft: formData.showPronouns ? 22 : 2 
            }} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={nextScreen}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PronounsScreen;