import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const quizData = [
  {
    question: "How do you usually handle conflict?",
    options: [
      "Avoid",
      "Address directly",
      "Deflect with humor"
    ]
  },
  {
    question: "What's your attitude toward money?",
    options: [
      "Saver",
      "Spender",
      "Balanced"
    ]
  },
  {
    question: "How do you prefer to communicate?",
    options: [
      "Text",
      "Voice call",
      "Video call",
      "In person"
    ]
  },
  {
    question: "What's your sleep schedule like?",
    options: [
      "Early Bird",
      "Night Owl",
      "Flexible / Depends"
    ]
  },
  {
    question: "What's your ideal weekend?",
    options: [
      "Outdoor & Adventure",
      "Netflix & Chill",
      "Socializing with friends",
      "President & Self-care"
    ]
  },
  {
    question: "Who do you live with?",
    options: [
      "Alone",
      "Parent/Family",
      "Roommates",
      "Partner"
    ]
  },
  {
    question: "Do you want kids in the future?",
    options: [
      "Definitely",
      "Maybe / Not sure",
      "Don't want",
      "Prefer not to say"
    ]
  },
  {
    question: "How spiritual are you?",
    options: [
      "Very spiritual",
      "Somewhat spiritual",
      "Not spiritual at all"
    ]
  }
];

const QuizScreen = ({ navigation, route }) => {
  const { screenIndex = 0 } = route.params || {};
  const [selectedOptions, setSelectedOptions] = useState({});
  
  const currentQuestion = quizData[screenIndex];
  const progress = (screenIndex / (quizData.length - 1)) * 100;

  const handleOptionSelect = (option) => {
    setSelectedOptions({
      ...selectedOptions,
      [screenIndex]: option,
    });
  };

  const handleNext = () => {
    if (screenIndex < quizData.length - 1) {
      navigation.push('Quiz', { screenIndex: screenIndex + 1 });
    } else {
      navigation.navigate('Complete');
    }
  };

  const handleBack = () => {
    if (screenIndex > 0) {
      navigation.goBack();
    } else {
      navigation.navigate('Start');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Compatibility Quiz</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill,
              { width: `${progress}%` }
            ]} 
          />
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.content}>
        {/* Description Text */}
        <Text style={styles.description}>
          These thoughtful questions uncover your values, habits, and lifestyle to match you with the right vibe.
        </Text>
        
        {/* Question */}
        <Text style={styles.question}>{currentQuestion.question}</Text>
        
        {/* Options */}
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              selectedOptions[screenIndex] === option && styles.optionSelected
            ]}
            onPress={() => handleOptionSelect(option)}
          >
            <View style={styles.checkbox}>
              {selectedOptions[screenIndex] === option && (
                <View style={styles.checkboxSelected} />
              )}
            </View>
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Next Button */}
      <View style={styles.footer}>
        <TouchableOpacity 
          style={[
            styles.nextButton,
            !selectedOptions[screenIndex] && styles.nextButtonDisabled
          ]}
          onPress={handleNext}
          disabled={!selectedOptions[screenIndex]}
        >
          <Text style={styles.nextButtonText}>
            {screenIndex < quizData.length - 1 ? 'Next' : 'Complete'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    paddingTop: 50,
  },
  backButton: {
    padding: 5,
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#666666',
    borderRadius: 2,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  description: {
    fontSize: 20,
    color: '#666',
    textAlign: 'left',
    marginBottom: 30,
    lineHeight: 26,
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
    textAlign: 'left',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionSelected: {
    borderColor: '#666666',
    backgroundColor: '#f0f0f0',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#666666',
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxSelected: {
    width: 10,
    height: 10,
    borderRadius: 2,
    backgroundColor: '#666666',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    textAlign: 'left',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  nextButton: {
    backgroundColor: '#666666',
    paddingVertical: 15,
    borderRadius: 8,
  },
  nextButtonDisabled: {
    backgroundColor: '#cccccc',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default QuizScreen;