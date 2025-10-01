import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { QuestionComponentProps } from '../../components/QuestionContainer';

const Question01: React.FC<QuestionComponentProps> = ({ answer, onAnswer }) => {
  return (
    <TextInput
      style={styles.textInput}
      placeholder="Your Name"
      value={answer || ''}
      onChangeText={onAnswer}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: '#C6C3BF',
    borderRadius: 8,
    fontSize: 16,
    paddingVertical: 15,
    paddingHorizontal: 10,
    color: '#444',
    backgroundColor: '#E6E6E6',
  },
});

export default Question01;