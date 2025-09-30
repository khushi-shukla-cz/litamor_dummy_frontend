import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

const StartScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Title Section */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Get ready for a </Text>
          <Text style={styles.titleHighlight}>Compatibility </Text>
          <Text style={styles.titleHighlight}>Quiz 🔥</Text>
        </View>
        
        {/* Subtitle */}
        <Text style={styles.subtitle}>
          Every answer earns points — the more honest you are, the better your matches will be.
        </Text>
      </View>

      {/* Button at Bottom */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => navigation.navigate('Quiz', { screenIndex: 0 })}
        >
          <Text style={styles.buttonText}>Let's find My Match</Text>
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
    alignItems: 'flex-start',
    padding: 20,
    paddingTop: 150,
  },
  titleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'left',
    marginBottom: 20,
  },
  title: {
    fontSize: 35,
    fontWeight: '600',
    textAlign: 'left',
    color: '#333',
  },
  titleHighlight: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000000', // Darker color for the span part
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    lineHeight: 22,
    paddingHorizontal: 10,
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

export default StartScreen;