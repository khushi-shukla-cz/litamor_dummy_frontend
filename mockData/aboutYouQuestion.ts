// ===== FILE 1: aboutYouQuestions.ts =====

export type AboutYouQuestionType = 
  | 'text_input' 
  | 'single_choice' 
  | 'date_selection'
  | 'gender_selection'
  | 'dropdown'
  | 'pronouns_with_toggle'
  | 'multi_choice_tags'
  | 'multi_choice_tags_with_add'
  | 'photo_upload';

export interface AboutYouQuestionOption {
  label: string;
  value: string;
}

export interface AboutYouQuestion {
  id: string;
  title: string;
  question: string;
  subtitle?: string;
  type: AboutYouQuestionType;
  placeholder?: string;
  options?: string[] | AboutYouQuestionOption[];
  maxSelections?: number;
  hasToggle?: boolean;
  toggleLabel?: string;
  hasAddMore?: boolean;
  maxPhotos?: number;
}

// Helper function to check if options are AboutYouQuestionOption[]
export const isQuestionOptionArray = (options: string[] | AboutYouQuestionOption[] | undefined): options is AboutYouQuestionOption[] => {
  return options !== undefined && options.length > 0 && typeof options[0] === 'object' && 'label' in options[0];
};

// The main array of all About You questions
export const ABOUT_YOU_QUESTIONS: AboutYouQuestion[] = [
  {
    id: 'about_01',
    title: 'About you 01',
    question: 'What should we call you?',
    type: 'text_input',
    placeholder: 'Your Name',
  },
  {
    id: 'about_02',
    title: 'About you 2',
    question: "What's your date of birth?",
    type: 'text_input',
    placeholder: 'DD/MM/YYYY',
 },
  {
    id: 'about_03',
    title: 'About you 3',
    question: 'How tall are you?',
    type: 'single_choice',
    options: ['165 cm', '167 cm', '168 cm', '169 cm', '170 cm'],
  },
  {
    id: 'about_04',
    title: 'About you 4',
    question: "What's your Gender?",
    type: 'gender_selection',
    options: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
      { label: 'Non-binary', value: 'non_binary' },
      { label: 'Transgender', value: 'transgender' },
      { label: 'Prefer not to say', value: 'prefer_not_to_say' },
    ],
  },
    {
    id: 'about_05',
    title: 'About you 05',
    question: "What's your pronouns?",
    type: 'dropdown', // Change from 'pronouns_with_toggle' to 'dropdown'
    options: [
      { label: 'they/them', value: 'they_them' },
      { label: 'he/him', value: 'he_him' },
      { label: 'she/her', value: 'she_her' },
    ],
    hasToggle: true,
    toggleLabel: 'Show on profile',
  },
  {
    id: 'about_06',
    title: 'About you 6',
    question: 'Pick a few things that bring you joy',
    subtitle: 'Choose up to 5 options',
    type: 'multi_choice_tags',
    maxSelections: 5,
    options: [ '🎵 Music', '📚 Reading', '🔍 Cooking', '🎮 Gaming', '🎬 Movies', '💃 Dancing', '😴 Sleeping', '✍️ Writing', ],
    hasAddMore: true,
  },
  {
    id: 'about_07',
    title: 'About you 7',
    question: "What's your main learning interest right now?",
    type: 'multi_choice_tags',
    maxSelections: 3,
    options: [ '🎵 Music', '📚 Reading', '👨‍💻 Coding', '✏️ Creativity', '🏋️ Fitness', '🌍 Languages', ],
    hasAddMore: true,
  },
  {
    id: 'about_08',
    title: 'About you 8',
    question: 'Do you snap have any strongest interests?',
    type: 'multi_choice_tags_with_add',
    maxSelections: 5,
    options: [ '🎵 Music', '📚 Reading', '👨‍💻 Coding', '✏️ Creativity', '🏋️ Fitness', '🌍 Languages', ],
    hasAddMore: true,
  },
  {
    id: 'about_09',
    title: 'About you 9',
    question: 'What is your Life Goal',
    subtitle: 'Choose up to 3 options',
    type: 'multi_choice_tags',
    maxSelections: 3,
    options: [ '💼 Career Growth', '🎓 Learning', '🧘 Personal Growth', '🎨 Creating',
      '💕 Finding True Love', '💰 Financial Freedom', '👨‍👩‍👧‍👦 Building a family', ],
  },
  {
    id: 'about_10',
    title: 'About you 10',
    question: 'Write Something short and sweet',
    subtitle: 'Share the secret side of you',
    type: 'text_input',
    placeholder: 'Tell us about yourself...',
  },
  {
    id: 'about_11',
    title: 'About you 11',
    question: 'Upload your Photos',
    subtitle: 'Upload up to 6 photos to show your personality',
    type: 'photo_upload',
    maxPhotos: 6,
  },
];