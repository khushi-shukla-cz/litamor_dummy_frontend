// ========================================
// FILE: Question11.tsx
// Upload your Photos
// ========================================

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { QuestionComponentProps } from '../../components/QuestionContainer';
import { PhotoUploadSlot } from './sharedComponent';

const MAX_PHOTOS = 6;

const Question11: React.FC<QuestionComponentProps> = ({ answer, onAnswer }) => {
  const selectedPhotos = answer || [];

  const handlePhotoToggle = (index: number) => {
    if (selectedPhotos.includes(index)) {
      // Remove photo if already selected
      onAnswer(selectedPhotos.filter((i: number) => i !== index));
    } else {
      // Add photo
      onAnswer([...selectedPhotos, index]);
    }
  };

  return (
    <View style={styles.photoGrid}>
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <PhotoUploadSlot
          key={index}
          index={index}
          hasPhoto={selectedPhotos.includes(index)}
          onPress={() => handlePhotoToggle(index)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 15,
  },
});

export default Question11;