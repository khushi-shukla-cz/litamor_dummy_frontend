import React from 'react';
import { StyleSheet, View } from 'react-native';
import { QuestionComponentProps } from '../../components/QuestionContainer';
import { TagOption } from './sharedComponent';

const lifeGoalOptions = [
  '💼 Career Growth',
  '🎓 Learning',
  '🧘 Personal Growth',
  '🎨 Creating',
  '💕 Finding True Love',
  '💰 Financial Freedom',
  '👨‍👩‍👧‍👦 Building a family',
];

const MAX_SELECTIONS = 3;

const Question09: React.FC<QuestionComponentProps> = ({ answer, onAnswer }) => {
  const selectedOptions = answer || [];

  const handleToggle = (option: string) => {
    if (selectedOptions.includes(option)) {
      onAnswer(selectedOptions.filter((item: string) => item !== option));
    } else if (selectedOptions.length < MAX_SELECTIONS) {
      onAnswer([...selectedOptions, option]);
    }
  };

  return (
    <View style={styles.tagsContainer}>
      {lifeGoalOptions.map((option) => (
        <TagOption
          key={option}
          label={option}
          isSelected={selectedOptions.includes(option)}
          onPress={() => handleToggle(option)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 16,
  },
});

export default Question09;
