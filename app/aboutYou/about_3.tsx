import React from 'react';
import { StyleSheet, View } from 'react-native';
import { QuestionComponentProps } from '../../components/QuestionContainer';
import { PillOption } from './sharedComponent';

const heights = ['165 cm', '167 cm', '168 cm', '169 cm', '170 cm'];

const Question03: React.FC<QuestionComponentProps> = ({ answer, onAnswer }) => {
  return (
    <View style={styles.container}>
      {heights.map((height) => (
        <PillOption
          key={height}
          label={height}
          isSelected={answer === height}
          onPress={() => onAnswer(height)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
    alignItems: 'center',
  },
});

export default Question03;
