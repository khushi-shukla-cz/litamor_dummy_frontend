// types.ts (UPDATED)
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
  photos: any[]; // Assuming photos is an array of something
  partnerInvite: string;
  howMet: string;
  relationshipDuration: string;
  anniversaryDate: string;        // Screen 19
  coupleActivities: string[];     // Screen 20
  expressingLove: string[];       // Screen 21
  milestoneCelebration: string;   // Screen 22
  localExperiences: string;       // Screen 23
  
couplePriorities: string[]; 
perfectDateIdea: string[];
 litAmorHelp: string[] | undefined;
 

// Screen 24
  // ------------------------------------------
}

export interface ScreenProps {
  formData: FormData;
  updateFormData: (key: keyof FormData, value: any) => void;
  toggleJoyActivity: (activity: string) => void;
   toggleMainInterest: (interest: string) => void;
   toggleSecondaryInterest: (interest: string) => void;
   toggleLifeGoal: (goal: string) => void;
   
    
    // Generic Array Toggle Function
    toggleArrayValue: (key: keyof FormData, value: string, maxLimit?: number) => void;
  nextScreen: () => void;
  setCurrentScreen: (screen: number) => void;
}