export interface FormData {
  name: string;
  dateOfBirth: string;
  height: string;
  gender: string;
  pronouns: string;
  showPronouns: boolean;
  joyActivities: string[];
  mainInterests: string[];
  secondaryInterests: string[];
  lifeGoals: string[];
  bio: string;
  photos: string[];
  partnerInvite: string;
  howMet: string;
  relationshipDuration: string;
}

export interface ScreenProps {
  formData: FormData;
  updateFormData: (key: string, value: string | boolean) => void;
  toggleJoyActivity?: (activity: string) => void;
  toggleMainInterest?: (interest: string) => void;
  toggleSecondaryInterest?: (interest: string) => void;
  toggleLifeGoal?: (goal: string) => void;
  nextScreen: () => void;
  setCurrentScreen: (screen: number) => void;
}