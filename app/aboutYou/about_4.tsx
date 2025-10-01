import React from 'react';
import { StyleSheet, View } from 'react-native';
import { QuestionComponentProps } from '../../components/QuestionContainer';
import { CheckboxOption } from './sharedComponent';

const genderOptions = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Non-binary', value: 'non_binary' },
  { label: 'Transgender', value: 'transgender' },
  { label: 'Prefer not to say', value: 'prefer_not_to_say' },
];

const Question04: React.FC<QuestionComponentProps> = ({ answer, onAnswer }) => {
  return (
    <View style={styles.container}>
      {genderOptions.map((option) => (
        <CheckboxOption
          key={option.value}
          label={option.label}
          isSelected={answer === option.value}
          onPress={() => onAnswer(option.value)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
});

export default Question04;
