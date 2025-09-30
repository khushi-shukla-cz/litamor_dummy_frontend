import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

const CompleteScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Tick Icon */}
        <View style={styles.tickIconContainer}><Text style={styles.tickIcon}>✓</Text></View>
        
        <Text style={styles.title}>Completed</Text>
        <Text style={styles.message}>
          You've shared your story, now let's find the people who truly match your vibe.
        </Text>
      </View>

      {/* Button at Bottom */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Start')}
        >
          <Text style={styles.buttonText}>Let's Find My Match</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 250,
  },
  tickIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  tickIcon: {
    fontSize: 60,
    color: '#666666',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 40,
    color: '#333333', // Darker color
    lineHeight: 22,
    fontWeight: '600',
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 40, // Extra padding to push button further from bottom
  },
  button: {
    backgroundColor: '#666666',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default CompleteScreen;