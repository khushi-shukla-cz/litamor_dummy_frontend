export type MandatoryQuestionType = 
  | 'checkBox'
  | 'pronouns_with_toggle'
  | 'slider';

export interface MandatoryQuestionOption {
  label: string;
  value: string;
}

export interface MandatoryQuestion {
  id: string;
  title: string;
  question: string;
  subtitle?: string;
  type: MandatoryQuestionType;
  placeholder?: string;
  options?: string[] | MandatoryQuestionOption[];
  maxSelections?: number;
  hasToggle?: boolean;
  toggleLabel?: string;
  toggleInfo?: string; 
  hasAddMore?: boolean;
  maxPhotos?: number;
}

// Helper function to check if options are MandatoryQuestionOption[]
export const isQuestionOptionArray = (options: string[] | MandatoryQuestionOption[] | undefined): options is MandatoryQuestionOption[] => {
  return options !== undefined && options.length > 0 && typeof options[0] === 'object' && 'label' in options[0];
};

// The main array of all About You questions
export const MANDATORY_QUESTIONS: MandatoryQuestion[] = [
  {
    id: 'md_01',
    title: 'Mandatory Questions',
    question: "What age range do you prefer to date?",
    type: 'slider',
    // Add default min and max age range
  },
  {
    id: 'md_02',
    title: 'Mandatory Questions',
    question: "What type of connection are you looking for?",
    type: 'checkBox',
    options: [
      { label: 'Long-term Relationship', value: 'long_term' },
      { label: 'Casual Dating', value: 'casual_dating' },
      { label: 'Marriage', value: 'marriage' },
      { label: 'Friendship', value: 'friendship' },
      { label: 'Open to Exploring', value: 'open_to_exploring' },
    ],
  },
  {
    id: 'md_03',
    title: 'Mandatory Questions',
    question: "Who do you want to match with?",
    type: 'checkBox',
    options: [
      { label: 'Male', value: 'male' },
      { label: 'Woman', value: 'woman' },
      { label: 'Non-binary', value: 'non_binary' },
      { label: 'Open to all', value: 'open_to_all' },
    ],
    hasToggle: true,
    toggleLabel: 'Show on profile',
    toggleInfo: 'This will only be shown if you choose to share it.',
  },
];