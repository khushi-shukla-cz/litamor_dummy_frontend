import QuestionContainer from '@/components/QuestionContainer';
import { useRouter } from 'expo-router';
import React from 'react';

export default function AboutYouPage() {
  const router = useRouter();

  return (
    <QuestionContainer
      currentStep={0}
      onComplete={(answers) => {
        console.log('All answers:', answers);
        router.back();
      }}
      onBack={() => {
        router.back();
      }}
    />
  );
}