
import React, { useState } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { FormData } from './types';
import { styles } from './styles';
import {
  NameScreen,
  DateOfBirthScreen,
  HeightScreen,
  GenderScreen,
  PronounsScreen,
  JoyActivitiesScreen,
  MainInterestsScreen,
  SecondaryInterestsScreen,
  LifeGoalsScreen,
  BioScreen,
  PhotoUploadScreen,
  PartnerInviteScreen,
  InvitationMaleScreen,
  InvitationFemaleScreen,
  CoupleModeUnlockedScreen,
  LoveStoryQuizScreen,
  HowMetScreen,
  RelationshipDurationScreen,
} from './screens';

const LitAmorOnboarding = () => {
  const [currentScreen, setCurrentScreen] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    dateOfBirth: '',
    height: '',
    gender: '',
    pronouns: 'They/Them',
    showPronouns: false,
    joyActivities: [],
    mainInterests: [],
    secondaryInterests: [],
    lifeGoals: [],
    bio: '',
    photos: [],
    partnerInvite: '',
    howMet: '',
    relationshipDuration: '',
  });

  const nextScreen = () => {
    setCurrentScreen(currentScreen + 1);
  };

  const updateFormData = (key: string, value: string | boolean) => {
    setFormData((prev: FormData) => ({ ...prev, [key]: value }));
  };

  const toggleJoyActivity = (activity: string) => {
    setFormData((prev) => {
      const selected = prev.joyActivities.includes(activity);
      if (selected) {
        return { ...prev, joyActivities: prev.joyActivities.filter(a => a !== activity) };
      } else if (prev.joyActivities.length < 4) {
        return { ...prev, joyActivities: [...prev.joyActivities, activity] };
      }
      return prev;
    });
  };

  const toggleMainInterest = (interest: string) => {
    setFormData((prev) => {
      const selected = prev.mainInterests.includes(interest);
      if (selected) {
        return { ...prev, mainInterests: prev.mainInterests.filter(a => a !== interest) };
      } else {
        return { ...prev, mainInterests: [...prev.mainInterests, interest] };
      }
    });
  };

  const toggleSecondaryInterest = (interest: string) => {
    setFormData((prev) => {
      const selected = prev.secondaryInterests.includes(interest);
      if (selected) {
        return { ...prev, secondaryInterests: prev.secondaryInterests.filter(a => a !== interest) };
      } else {
        return { ...prev, secondaryInterests: [...prev.secondaryInterests, interest] };
      }
    });
  };

  const toggleLifeGoal = (goal: string) => {
    setFormData((prev) => {
      const selected = prev.lifeGoals.includes(goal);
      if (selected) {
        return { ...prev, lifeGoals: prev.lifeGoals.filter(a => a !== goal) };
      } else if (prev.lifeGoals.length < 2) {
        return { ...prev, lifeGoals: [...prev.lifeGoals, goal] };
      }
      return prev;
    });
  };

  const screenProps = {
    formData,
    updateFormData,
    toggleJoyActivity,
    toggleMainInterest,
    toggleSecondaryInterest,
    toggleLifeGoal,
    nextScreen,
    setCurrentScreen,
  };

  // Screen routing
  switch (currentScreen) {
    case 1:
      return <NameScreen {...screenProps} />;
    case 2:
      return <DateOfBirthScreen {...screenProps} />;
    case 3:
      return <HeightScreen {...screenProps} />;
    case 4:
      return <GenderScreen {...screenProps} />;
    case 5:
      return <PronounsScreen {...screenProps} />;
    case 6:
      return <JoyActivitiesScreen {...screenProps} />;
    case 7:
      return <MainInterestsScreen {...screenProps} />;
    case 8:
      return <SecondaryInterestsScreen {...screenProps} />;
    case 9:
      return <LifeGoalsScreen {...screenProps} />;
    case 10:
      return <BioScreen {...screenProps} />;
    case 11:
      return <PhotoUploadScreen {...screenProps} />;
    case 12:
      return <PartnerInviteScreen {...screenProps} />;
    case 13:
      return <InvitationMaleScreen {...screenProps} />;
    case 14:
      return <InvitationFemaleScreen {...screenProps} />;
    case 15:
      return <CoupleModeUnlockedScreen {...screenProps} />;
    case 16:
      return <LoveStoryQuizScreen {...screenProps} />;
    case 17:
      return <HowMetScreen {...screenProps} />;
    case 18:
      return <RelationshipDurationScreen {...screenProps} />;
    default:
      return (
        <SafeAreaView style={styles.container}>
          <Text>Onboarding complete!</Text>
        </SafeAreaView>
      );
  }
};

export default LitAmorOnboarding;
