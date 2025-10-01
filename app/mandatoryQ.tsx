import { MANDATORY_QUESTIONS, MandatoryQuestionOption, isQuestionOptionArray } from '@/mockData/mandatoryQuestion';
import { Ionicons } from '@expo/vector-icons';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

interface MandatoryQuestionProps {
  currentStep?: number;
  onNext?: (answers: Record<string, any>) => void;
  onBack?: () => void;
}

const CheckboxOption: React.FC<{
  label: string;
  isSelected: boolean;
  onPress: () => void;
}> = ({ label, isSelected, onPress }) => (
  <TouchableOpacity
    style={[styles.checkboxOption, isSelected && styles.checkboxOptionSelected]}
    onPress={onPress}
  >
    <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
      {isSelected && <Ionicons name="checkmark" size={16} color="#4A4A4A" />}
    </View>
    <Text style={styles.checkboxText}>{label}</Text>
  </TouchableOpacity>
);

const RadioOption: React.FC<{
  label: string;
  isSelected: boolean;
  onPress: () => void;
}> = ({ label, isSelected, onPress }) => (
  <TouchableOpacity style={styles.radioOption} onPress={onPress}>
    <View style={[styles.radioCircle, isSelected && styles.radioCircleSelected]}>
      {isSelected && <View style={styles.radioInner} />}
    </View>
    <Text style={styles.radioText}>{label}</Text>
  </TouchableOpacity>
);

const MandatoryQuestion: React.FC<MandatoryQuestionProps> = ({
  currentStep: propCurrentStep,
  onNext,
  onBack,
}) => {
  const [currentStep, setCurrentStep] = useState(propCurrentStep || 0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [toggleStates, setToggleStates] = useState<Record<string, boolean>>({});
  
  // Initialize age range with default values
  const [ageRange, setAgeRange] = useState({ min: 0, max: 25 });

  const currentQuestion = MANDATORY_QUESTIONS[currentStep];
  const progress = ((currentStep + 1) / MANDATORY_QUESTIONS.length) * 100;

  const handleAnswer = (questionId: string, value: any) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleMultiSelect = (questionId: string, option: string) => {
    const currentAnswers = answers[questionId] || [];
    const maxSelections = currentQuestion.maxSelections || 5;
    
    if (currentAnswers.includes(option)) {
      handleAnswer(questionId, currentAnswers.filter((item: string) => item !== option));
    } else if (currentAnswers.length < maxSelections) {
      handleAnswer(questionId, [...currentAnswers, option]);
    }
  };

  const handleToggle = (key: string, value: boolean) => {
    setToggleStates(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleNext = () => {
    if (currentStep < MANDATORY_QUESTIONS.length - 1) {
      setCurrentStep(prevStep => prevStep + 1);
      if (onNext) {
        onNext(answers);
      }
    } else {
      // Last question completed
      console.log('Final Answers:', answers);
      if (onNext) {
        onNext(answers);
      }
      // Navigate to rapid fire entry
      router.push('/rapidFireEntry' as any);
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
      case 'checkBox':
      case 'pronouns_with_toggle':
        return !!currentAnswer;
      case 'slider':
        return !!currentAnswer;
      default:
        return true;
    }
  };

  const renderQuestionContent = () => {
    const questionId = currentQuestion.id;
    const currentAnswer = answers[questionId];

    switch (currentQuestion.type) {
      case 'slider':
        return (
          <View style={styles.sliderContainer}>
            <View style={styles.ageRangeBox}>
              <Text style={styles.ageRangeText}>
                {ageRange.min} - {ageRange.max}
              </Text>
              <View style={styles.sliderWrapper}>
                <MultiSlider 
                  values={[ageRange.min, ageRange.max]} 
                  sliderLength={280} 
                  onValuesChange={(values) => {
                    setAgeRange({ min: values[0], max: values[1] });
                  }}
                  onValuesChangeFinish={(values) => {
                    handleAnswer(questionId, { min: values[0], max: values[1] });
                  }}
                  min={18} 
                  max={80} 
                  step={1}
                  selectedStyle={{ backgroundColor: '#666666', height: 4 }}
                  unselectedStyle={{ backgroundColor: '#D9D9D9', height: 4 }}
                  markerStyle={{ 
                    height: 20, 
                    width: 20, 
                    borderRadius: 10, 
                    backgroundColor: '#FFFFFF', 
                    borderWidth: 2, 
                    borderColor: '#666666' 
                  }}
                  pressedMarkerStyle={{ borderColor: '#999999', borderWidth: 3 }}
                  containerStyle={{ alignSelf: 'center' }}
                  trackStyle={{ borderRadius: 2 }}
                />
              </View>
            </View>
          </View>
        );     
  case 'checkBox':
  return (
    <View>
      <View style={styles.checkboxOptionsContainer}>
        {isQuestionOptionArray(currentQuestion.options) && 
          currentQuestion.options.map((option: MandatoryQuestionOption) => (
            <CheckboxOption
              key={option.value}
              label={option.label}
              isSelected={currentAnswer === option.value}
              onPress={() => handleAnswer(questionId, option.value)}
            />
          ))}
      </View>
      
      {/* Add toggle if exists */}
      {currentQuestion.hasToggle && (
        <View>
          <View style={styles.toggleContainer}>
            <Text style={styles.toggleLabel}>
              <Ionicons name="eye-outline" size={16} color="#666" /> {currentQuestion.toggleLabel}
            </Text>
            <Switch
              value={toggleStates[questionId] || false}
              onValueChange={(value) => handleToggle(questionId, value)}
              trackColor={{ false: '#E0E0E0', true: '#4A4A4A' }}
              thumbColor={'#FFFFFF'}
            />
          </View>
          
          {/* Add info message */}
          {currentQuestion.toggleInfo && (
            <View style={styles.infoContainer}>
              <Ionicons name="information-circle-outline" size={16} color="#999" />
              <Text style={styles.infoText}>{currentQuestion.toggleInfo}</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );

      case 'pronouns_with_toggle':
        return (
          <View>
            <View style={styles.optionsContainer}>
              {isQuestionOptionArray(currentQuestion.options) &&
                currentQuestion.options.map((option: MandatoryQuestionOption) => (
                  <RadioOption
                    key={option.value}
                    label={option.label}
                    isSelected={currentAnswer === option.value}
                    onPress={() => handleAnswer(questionId, option.value)}
                  />
                ))}
            </View>
            {currentQuestion.hasToggle && (
              <View style={styles.toggleContainer}>
                <Text style={styles.toggleLabel}>{currentQuestion.toggleLabel}</Text>
                <Switch
                  value={toggleStates[questionId] || false}
                  onValueChange={(value) => handleToggle(questionId, value)}
                  trackColor={{ false: '#E0E0E0', true: '#4A4A4A' }}
                  thumbColor={'#FFFFFF'}
                />
              </View>
            )}
          </View>
        );

      default:
        return <Text>Question type not implemented</Text>;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="chevron-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{currentQuestion.title}</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
      </View>
      
      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>
          These are essential questions to help us understand you and the type of relationship you're looking for.
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
        
        {currentQuestion.subtitle && (
          <Text style={styles.subtitleText}>{currentQuestion.subtitle}</Text>
        )}

        <View style={styles.answerContainer}>
          {renderQuestionContent()}
        </View>
      </ScrollView>

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
    justifyContent: 'space-between',
    alignItems: 'center',
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
  descriptionContainer: {
    marginBottom: 20,
  },
  descriptionText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  content: {
    flex: 1,
  },
  questionText: {
    fontSize: 22,
    fontWeight: '500',
    color: '#000',
    marginBottom: 30,
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
  
  // Slider Styles
  sliderContainer: {
  paddingTop: 10,
},
ageRangeBox: {
  backgroundColor: '#E8E8E8',
  borderRadius: 10,
  paddingVertical: 10,
  paddingHorizontal: 10,
},
ageRangeText: {
  fontSize: 14,
  color: '#666',
  marginBottom: 15,
},
sliderWrapper: {
  paddingVertical: 10,
},
  ageRangeDisplay: {
    backgroundColor: '#E6E6E6',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  
  sliderTrack: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  slider: {
    width: '100%',
    height: 10,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rangeSlider: {
    flex: 1,
    height: 40,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#666',
  },
  rail: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#CCC',
  },
  railSelected: {
    height: 4,
    backgroundColor: '#666',
    borderRadius: 2,
  },
  
  // Checkbox Options
  checkboxOptionsContainer: {
    gap: 12,
  },
  checkboxOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6E6E6',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  checkboxOptionSelected: {
    backgroundColor: '#E8E8E8',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#444444',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkboxSelected: {
    borderColor: '#4A4A4A',
    backgroundColor: '#FFFFFF',
  },
  checkboxText: {
    fontSize: 16,
    color: '#333',
  },

  //Toggle Styles
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  toggleLabel: {
    fontSize: 16,
    color: '#333',
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 0,
    gap: 8,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: '#999',
    lineHeight: 18,
  },
  
  // Radio Options
  optionsContainer: {
    gap: 15,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#DDD',
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioCircleSelected: {
    borderColor: '#4A4A4A',
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4A4A4A',
  },
  radioText: {
    fontSize: 16,
    color: '#333',
  }, 
  // Next Button
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

export default MandatoryQuestion;