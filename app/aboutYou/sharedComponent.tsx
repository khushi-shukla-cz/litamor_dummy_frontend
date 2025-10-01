// SharedComponents.tsx - Reusable UI components

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export const TagOption: React.FC<{
  label: string;
  isSelected: boolean;
  onPress: () => void;
}> = ({ label, isSelected, onPress }) => (
  <TouchableOpacity
    style={[styles.tagOption, isSelected && styles.tagOptionSelected]}
    onPress={onPress}
  >
    <Text style={[styles.tagText, isSelected && styles.tagTextSelected]}>
      {label}
    </Text>
    <Text style={styles.tagPlusIcon}>+</Text>
  </TouchableOpacity>
);

export const PillOption: React.FC<{
  label: string;
  isSelected: boolean;
  onPress: () => void;
}> = ({ label, isSelected, onPress }) => (
  <TouchableOpacity
    style={[styles.pillOption, isSelected && styles.pillOptionSelected]}
    onPress={onPress}
  >
    <Text style={[styles.pillText, isSelected && styles.pillTextSelected]}>
      {label}
    </Text>
  </TouchableOpacity>
);

export const CheckboxOption: React.FC<{
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

export const RadioOption: React.FC<{
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

export const PhotoUploadSlot: React.FC<{
  index: number;
  hasPhoto: boolean;
  onPress: () => void;
}> = ({ index, hasPhoto, onPress }) => (
  <TouchableOpacity
    style={[styles.photoSlot, index === 0 && styles.primaryPhotoSlot]}
    onPress={onPress}
  >
    {hasPhoto ? (
      <View style={styles.photoPlaceholder}>
        <Text style={styles.photoText}>Photo {index + 1}</Text>
      </View>
    ) : (
      <View style={styles.addPhotoContainer}>
        <Ionicons name="add" size={24} color="#666" />
      </View>
    )}
  </TouchableOpacity>
);

export const SearchInput: React.FC<{
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
}> = ({ placeholder, value, onChangeText }) => (
  <View style={styles.searchInputContainer}>
    <Ionicons name="search" size={18} color="#999" />
    <TextInput
      style={styles.searchInput}
      placeholder={placeholder}
      placeholderTextColor="#999"
      value={value}
      onChangeText={onChangeText}
    />
  </View>
);

const styles = StyleSheet.create({
  // Text Input
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

  // Checkbox Styles
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

  // Radio Styles
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

  // Pill Styles
  pillOption: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillOptionSelected: {
    width: '100%',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#000',
    backgroundColor: '#FFF',
    borderRadius: 8,
  },
  pillText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  pillTextSelected: {
    color: '#000',
    fontWeight: '700',
    fontSize: 18,
  },

  // Tag Styles
  tagOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '48%',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    backgroundColor: '#E6E6E6',
    borderWidth: 2,
    borderColor: '#C6C3BF',
  },
  tagOptionSelected: {
    backgroundColor: '#E5E5E5',
    borderColor: '#666',
  },
  tagText: {
    fontSize: 15,
    color: '#666',
    flex: 1,
  },
  tagTextSelected: {
    color: '#333',
    fontWeight: '500',
  },
  tagPlusIcon: {
    fontSize: 18,
    color: '#999',
    fontWeight: '300',
    marginLeft: 8,
  },

  // Search Input
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 4,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },

  // Photo Upload
  photoSlot: {
    width: '30%',
    aspectRatio: 0.75,
    borderRadius: 12,
    backgroundColor: '#E6E6E6',
    borderWidth: 2,
    borderColor: '#C6C3BF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  primaryPhotoSlot: {
    width: '30%',
    aspectRatio: 0.75,
  },
  addPhotoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoPlaceholder: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
  },
  photoText: {
    fontSize: 12,
    color: '#666',
  },
});

export const componentStyles = styles;