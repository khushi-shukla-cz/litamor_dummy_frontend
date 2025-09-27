export type QuestionType = "single-choice" | "dropdown";

export interface QuestionOption {
  label: string;
  value: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  questionText: string;
  options: QuestionOption[];
}

// The main array of all questions
export const RAPID_FIRE_QUESTIONS: Question[] = [
  {
    id: "q1_habits",
    type: "single-choice",
    questionText: "Do you smoke or drink?",
    options: [
      { label: "I don't smoke or drink", value: "none" },
      { label: "I drink occasionally", value: "drink_occasionally" },
      { label: "I smoke occasionally", value: "smoke_occasionally" },
      { label: "I smoke and drink regularly", value: "both_regularly" },
    ],
  },
  {
    id: "q2_religion",
    type: "single-choice",
    questionText:
      "How important is religion/ethnicity in your life or partner choice?",
    options: [
      { label: "Very important", value: "very_important" },
      { label: "Somewhat important", value: "somewhat_important" },
      { label: "Not important at all", value: "not_important" },
    ],
  },
  {
    id: "q3_language",
    type: "dropdown",
    questionText: "What's your first language?",
    options: [
      { label: "English", value: "english" },
      { label: "Spanish", value: "spanish" },
      { label: "Mandarin", value: "mandarin" },
      { label: "Hindi", value: "hindi" },
      { label: "French", value: "french" },
    ],
  },
  {
    id: "q4_diet",
    type: "single-choice",
    questionText: "Which best describes your diet?",
    options: [
      { label: "Vegetarian", value: "vegetarian" },
      { label: "Non-Vegetarian", value: "non_vegetarian" },
      { label: "Vegan", value: "vegan" },
      { label: "Eggetarian", value: "eggetarian" },
    ],
  },
  {
    id: "q5_profession",
    type: "dropdown",
    questionText: "What's your current profession/field?",
    options: [
      { label: "Student", value: "student" },
      { label: "Technology / Engineering", value: "technology" },
      { label: "Healthcare / Medical", value: "healthcare" },
      { label: "Arts / Design", value: "arts" },
      { label: "Business / Finance", value: "business" },
    ],
  },
  {
    id: "q6_politics",
    type: "single-choice",
    questionText: "How do you identify politically?",
    options: [
      { label: "Liberal/Progressive", value: "liberal" },
      { label: "Moderate", value: "moderate" },
      { label: "Conservative", value: "conservative" },
      { label: "Prefer not to say", value: "prefer_not_to_say" },
    ],
  },
  {
    id: "q7_priority",
    type: "single-choice",
    questionText: "Which is your top priority right now?",
    options: [
      { label: "Career", value: "career" },
      { label: "Family", value: "family" },
      { label: "Personal Growth", value: "personal_growth" },
      { label: "Adventure/Travel", value: "adventure" },
    ],
  },
  {
    id: "q8_past_relationships",
    type: "single-choice",
    questionText: "How do you view your past relationships?",
    options: [
      { label: "Ready for a fresh start", value: "fresh_start" },
      { label: "Still healing", value: "healing" },
      { label: "Learned a lot, no regrets", value: "learned_lot" },
      { label: "Prefer not to talk about", value: "prefer_not_to_say" },
    ],
  },
  {
    id: "q9_personality",
    type: "single-choice",
    questionText: "Which describes you best?",
    options: [
      { label: "Introvert", value: "introvert" },
      { label: "Extrovert", value: "extrovert" },
      { label: "Ambivert", value: "ambivert" },
    ],
  },
  {
    id: "q10_love_language",
    type: "single-choice",
    questionText: "What's your primary love language?",
    options: [
      { label: "Words of Affirmation", value: "words_of_affirmation" },
      { label: "Acts of Service", value: "acts_of_service" },
      { label: "Gifts", value: "gifts" },
      { label: "Quality Time", value: "quality_time" },
      { label: "Physical Touch", value: "physical_touch" },
    ],
  },

  {
    id: "q11_lifestyle",
    type: "single-choice",
    questionText: "How would you describe your lifestyle?",
    options: [
      { label: "Chill & Relaxed", value: "chill" },
      { label: "Balanced", value: "balanced" },
      { label: "High Energy/Active", value: "active" },
    ],
  },
  {
    id: "q12_conflict",
    type: "single-choice",
    questionText: "How do you usually handle conflicts?",
    options: [
      { label: "Avoid them", value: "avoid" },
      { label: "Talk it out calmly", value: "talk_calmly" },
      { label: "Express emotions strongly", value: "express_strongly" },
      { label: "Seek compromise", value: "compromise" },
    ],
  },
  {
    id: "q13_financial",
    type: "single-choice",
    questionText: "Which best matches your financial outlook?",
    options: [
      { label: "Save first, spend later", value: "save_first" },
      { label: "Balanced - save & spend", value: "balanced" },
      { label: "Spend on experiences", value: "spend_experiences" },
      { label: "Not sure yet", value: "not_sure" },
    ],
  },
  {
    id: "q14_communication",
    type: "single-choice",
    questionText: "How do you prefer to communicate in a relationship?",
    options: [
      { label: "Texting", value: "texting" },
      { label: "Calling", value: "calling" },
      { label: "Video Calls", value: "video_calls" },
      { label: "In-person", value: "in_person" },
    ],
  },
  {
    id: "q15_chronotype",
    type: "single-choice",
    questionText: "Are you an early bird or night owl?",
    options: [
      { label: "Early Bird", value: "early_bird" },
      { label: "Night Owl", value: "night_owl" },
      { label: "Flexible/Depends", value: "flexible" },
    ],
  },
  {
    id: "q16_weekend",
    type: "single-choice",
    questionText: "Your ideal weekend looks like...",
    options: [
      { label: "Partying & Socializing", value: "partying" },
      { label: "Outdoor Adventures", value: "outdoors" },
      { label: "Staying In & Relaxing", value: "relaxing" },
      { label: "Learning/Working on hobbies", value: "hobbies" },
    ],
  },
  {
    id: "q17_living_setup",
    type: "single-choice",
    questionText: "What's your current living setup?",
    options: [
      { label: "With Family", value: "with_family" },
      { label: "With Roommates", value: "with_roommates" },
      { label: "Alone", value: "alone" },
      { label: "Other", value: "other" },
    ],
  },
  {
    id: "q18_kids_future",
    type: "single-choice",
    questionText: "Do you want kids in the future?",
    options: [
      { label: "Definitely want", value: "definitely_want" },
      { label: "Maybe / Not sure", value: "maybe_not_sure" },
      { label: "Don't want", value: "dont_want" },
      { label: "Prefer not to say", value: "prefer_not_to_say" },
    ],
  },
  {
    id: "q19_spirituality",
    type: "single-choice",
    questionText: "How spiritual are you?",
    options: [
      { label: "Very spiritual", value: "very_spiritual" },
      { label: "Somewhat spiritual", value: "somewhat_spiritual" },
      { label: "Not spiritual at all", value: "not_spiritual" },
    ],
  },
];
