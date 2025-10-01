import { ABOUT_YOU_QUESTIONS } from '@/mockData/aboutYouQuestion';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// Import all question components
import { router } from 'expo-router';
import Question01 from '../app/aboutYou/about_1';
import Question10 from '../app/aboutYou/about_10';
import Question11 from '../app/aboutYou/about_11';
import Question02 from '../app/aboutYou/about_2';
import Question03 from '../app/aboutYou/about_3';
import Question04 from '../app/aboutYou/about_4';
import Question05 from '../app/aboutYou/about_5';
import Question06 from '../app/aboutYou/about_6';
import Question07 from '../app/aboutYou/about_7';
import Question08 from '../app/aboutYou/about_8';
import Question09 from '../app/aboutYou/about_9';

interface QuestionContainerProps {
  currentStep?: number;
  onComplete?: (answers: Record<string, any>) => void;
  onBack?: () => void;
}

export interface QuestionComponentProps {
  answer: any;
  onAnswer: (value: any) => void;
  toggleState?: boolean;
  onToggle?: (value: boolean) => void;
}

const QuestionContainer: React.FC<QuestionContainerProps> = ({
  currentStep: propCurrentStep,
  onComplete,
  onBack,
}) => {
  const [currentStep, setCurrentStep] = useState(propCurrentStep || 0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>({});

  const currentQuestion = ABOUT_YOU_QUESTIONS[currentStep];
  const progress = ((currentStep + 1) / ABOUT_YOU_QUESTIONS.length) * 100;

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleToggle = (questionId: string, value: boolean) => {
    setToggleStates(prev => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < ABOUT_YOU_QUESTIONS.length - 1) {
      setCurrentStep(prevStep => prevStep + 1);
    } else {
      // Last question completed
      console.log('Final Answers:', answers);
      if (onComplete) {
        onComplete(answers);
      }
      // Navigate to mandatory questions
      router.push('/mandatoryQ'  as any);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prevStep => prevStep - 1);
    } else {
      if (onBack) {
        onBack();
      }
    }
  };

  const isAnswerValid = () => {
    const currentAnswer = answers[currentQuestion.id];
    
    switch (currentQuestion.type) {
      case 'text_input':
      case 'single_choice':
      case 'date_selection':
      case 'gender_selection':
      case 'dropdown':
        return !!currentAnswer;
      case 'multi_choice_tags':
      case 'multi_choice_tags_with_add':
        return currentAnswer && currentAnswer.length > 0;
      case 'photo_upload':
        return currentAnswer && currentAnswer.length > 0;
      default:
        return true;
    }
  };

  const renderQuestion = () => {
    const questionId = currentQuestion.id;
    const currentAnswer = answers[questionId];
    const toggleState = toggleStates[questionId];

    const props: QuestionComponentProps = {
      answer: currentAnswer,
      onAnswer: (value: any) => handleAnswer(questionId, value),
      toggleState: toggleState,
      onToggle: (value: boolean) => handleToggle(questionId, value),
    };

    switch (questionId) {
      case 'about_01':
        return <Question01 {...props} />;
      case 'about_02':
        return <Question02 {...props} />;
      case 'about_03':
        return <Question03 {...props} />;
      case 'about_04':
        return <Question04 {...props} />;
      case 'about_05':
        return <Question05 {...props} />;
      case 'about_06':
        return <Question06 {...props} />;
      case 'about_07':
        return <Question07 {...props} />;
      case 'about_08':
        return <Question08 {...props} />;
      case 'about_09':
        return <Question09 {...props} />;
      case 'about_10':
        return <Question10 {...props} />;
      case 'about_11':
        return <Question11 {...props} />;
      default:
        return <Text>Question not found</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="chevron-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{currentQuestion.title}</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Question */}
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
        
        {/* Subtitle if exists */}
        {currentQuestion.subtitle && (
          <Text style={styles.subtitleText}>{currentQuestion.subtitle}</Text>
        )}

        {/* Question Content */}
        <View style={styles.answerContainer}>
          {renderQuestion()}
        </View>
      </ScrollView>

      {/* Next Button */}
      <TouchableOpacity
        style={[
          styles.nextButton,
          !isAnswerValid() && styles.nextButtonDisabled,
        ]}
        onPress={handleNext}
        disabled={!isAnswerValid()}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginBottom: 20,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4A4A4A',
    borderRadius: 3,
  },
  content: {
    flex: 1,
  },
  questionText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    marginBottom: 15,
    lineHeight: 32,
  },
  subtitleText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 25,
    lineHeight: 22,
  },
  answerContainer: {
    flex: 1,
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: '#4A4A4A',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  nextButtonDisabled: {
    backgroundColor: '#A0A0A0',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default QuestionContainer;