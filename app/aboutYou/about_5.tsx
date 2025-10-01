import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';
import { QuestionComponentProps } from '../../components/QuestionContainer';

const pronounOptions = [
  { label: 'they/them', value: 'they_them' },
  { label: 'he/him', value: 'he_him' },
  { label: 'she/her', value: 'she_her' },
];

const Question05: React.FC<QuestionComponentProps> = ({ 
  answer, 
  onAnswer, 
  toggleState, 
  onToggle 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <View>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <Text style={styles.dropdownButtonText}>
          {answer
            ? pronounOptions.find(opt => opt.value === answer)?.label
            : 'Select...'}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#666" />
      </TouchableOpacity>

      {isDropdownOpen && (
        <View style={styles.dropdownOptionsContainer}>
          {pronounOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={styles.dropdownOption}
              onPress={() => {
                onAnswer(option.value);
                setIsDropdownOpen(false);
              }}
            >
              <Text>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.toggleContainer}>
        <Text style={styles.toggleLabel}>Show on profile</Text>
        <Switch
          value={toggleState || false}
          onValueChange={onToggle}
          trackColor={{ false: '#E0E0E0', true: '#4A4A4A' }}
          thumbColor={'#FFFFFF'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#E6E6E6',
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownOptionsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    overflow: 'hidden',
  },
  dropdownOption: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  toggleLabel: {
    fontSize: 16,
    color: '#333',
  },
});

export default Question05;
