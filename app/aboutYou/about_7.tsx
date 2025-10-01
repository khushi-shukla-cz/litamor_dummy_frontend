import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { QuestionComponentProps } from '../../components/QuestionContainer';
import { SearchInput, TagOption } from './sharedComponent';

const learningOptions = [
  '🎵 Music',
  '📚 Reading',
  '👨‍💻 Coding',
  '✍️ Creativity',
  '🏋️ Fitness',
  '🌍 Languages',
];

const MAX_SELECTIONS = 3;

const Question07: React.FC<QuestionComponentProps> = ({ answer, onAnswer }) => {
  const selectedOptions = answer || [];

  const handleToggle = (option: string) => {
    if (selectedOptions.includes(option)) {
      onAnswer(selectedOptions.filter((item: string) => item !== option));
    } else if (selectedOptions.length < MAX_SELECTIONS) {
      onAnswer([...selectedOptions, option]);
    }
  };

  return (
    <View>
      <SearchInput placeholder="Your Interests" />

      <View style={styles.tagsContainer}>
        {learningOptions.map((option) => (
          <TagOption
            key={option}
            label={option}
            isSelected={selectedOptions.includes(option)}
            onPress={() => handleToggle(option)}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.addYourOwnButton}>
        <Ionicons name="add" size={18} color="#666" />
        <Text style={styles.addYourOwnText}>Add your own</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 16,
    marginBottom: 16,
  },
  addYourOwnButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E6E6E6',
    borderRadius: 8,
    paddingVertical: 14,
    marginTop: 16,
    gap: 8,
  },
  addYourOwnText: {
    fontSize: 15,
    color: '#666',
    fontWeight: '500',
  },
});

export default Question07;
