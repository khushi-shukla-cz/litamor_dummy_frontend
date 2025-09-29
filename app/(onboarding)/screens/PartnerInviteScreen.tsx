import React from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { ScreenProps } from '../types';
import { styles } from '../styles';

const PartnerInviteScreen: React.FC<ScreenProps> = ({ formData, updateFormData, nextScreen }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Invite</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>Invite your partner to LitAmor! 💖</Text>
        <Text style={{ color: '#888', marginBottom: 8, textAlign: 'center' }}>
          Once they accept, your couple features unlock — and the fun begins.
        </Text>
        <View style={{ 
          flexDirection: 'row', 
          width: '100%', 
          marginBottom: 16, 
          backgroundColor: '#f0f0f0', 
          borderRadius: 12 
        }}>
          <TextInput
            style={{ flex: 1, padding: 12, fontSize: 16, color: '#222' }}
            placeholder="Email or Phone number"
            value={formData.partnerInvite}
            onChangeText={text => updateFormData('partnerInvite', text)}
            placeholderTextColor="#aaa"
          />
          <TouchableOpacity style={{ paddingHorizontal: 16, justifyContent: 'center' }}>
            <Text style={{ color: '#FF3CAC', fontWeight: 'bold' }}>Send Invite</Text>
          </TouchableOpacity>
        </View>
        <View style={{ 
          flexDirection: 'row', 
          alignItems: 'center', 
          marginVertical: 16, 
          width: '100%' 
        }}>
          <View style={{ flex: 1, height: 1, backgroundColor: '#ccc' }} />
          <Text style={{ marginHorizontal: 8, color: '#888' }}>OR</Text>
          <View style={{ flex: 1, height: 1, backgroundColor: '#ccc' }} />
        </View>
        <TouchableOpacity style={styles.button} onPress={nextScreen}>
          <Text style={styles.buttonText}>Share the Link</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PartnerInviteScreen;