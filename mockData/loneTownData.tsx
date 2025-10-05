import {
    FontAwesome5,
    Ionicons,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import React from "react";

// ======================================
// TYPE DEFINITIONS
// ======================================
export type User = {
  name: string;
  age: number;
  bio: string;
  job: string;
  matchPercentage: number;
  interests: { icon: () => React.ReactNode; name: string }[];
  lifeGoals: { icon: () => React.ReactNode; name: string }[];
  prompts: { question: string; answer: string }[];
  commonInterests: { icon: () => React.ReactNode; name: string }[];
  distance: number;
};

// ======================================
// MOCK DATA
// ======================================
export const aishaData: User = {
  name: "Aisha",
  age: 24,
  bio: "Curious designer who loves music and travel.",
  job: "UX Designer at a digital product studio",
  matchPercentage: 30,
  interests: [
    {
      icon: () => <FontAwesome5 name="hiking" size={14} color="#388E3C" />,
      name: "Hiking",
    },
    {
      icon: () => <FontAwesome5 name="guitar" size={14} color="#6D4C41" />,
      name: "Guitar",
    },
  ],
  lifeGoals: [
    {
      icon: () => <Ionicons name="briefcase" size={14} color="#1976D2" />,
      name: "Career Growth",
    },
    {
      icon: () => <Ionicons name="person" size={14} color="#F57C00" />,
      name: "Personal Growth",
    },
  ],
  prompts: [
    {
      question: "How do you usually handle conflict?",
      answer: "Seek compromise",
    },
    {
      question: "What's your attitude toward money?",
      answer: "Save first, spend later",
    },
    {
      question: "What's your attitude toward money?",
      answer: "Save first, spend later",
    },
  ],
  commonInterests: [
    {
      icon: () => <Ionicons name="wine" size={14} color="#C2185B" />,
      name: "Social drinker",
    },
    {
      icon: () => (
        <MaterialCommunityIcons name="leaf" size={16} color="#388E3C" />
      ),
      name: "Vegetarian",
    },
    {
      icon: () => (
        <MaterialCommunityIcons
          name="scale-balance"
          size={16}
          color="#0288D1"
        />
      ),
      name: "Work-life balance",
    },
    {
      icon: () => <Ionicons name="wallet" size={14} color="#FBC02D" />,
      name: "Saver",
    },
    {
      icon: () => <Ionicons name="sunny" size={16} color="#FFA000" />,
      name: "Outdoor weekends",
    },
    {
      icon: () => <Ionicons name="people" size={14} color="#7B1FA2" />,
      name: "Family",
    },
    {
      icon: () => (
        <MaterialCommunityIcons
          name="baby-face-outline"
          size={16}
          color="#D32F2F"
        />
      ),
      name: "Wants children",
    },
  ],
  distance: 14,
};

export const simranData: User = {
  name: "Simran",
  age: 22,
  bio: "Curious designer who loves music and travel.",
  job: "Software Engineer at a tech startup",
  matchPercentage: 85, // Different match percentage
  interests: [
    {
      icon: () => <FontAwesome5 name="hiking" size={14} color="#388E3C" />,
      name: "Hiking",
    },
    {
      icon: () => <FontAwesome5 name="guitar" size={14} color="#6D4C41" />,
      name: "Guitar",
    },
    // {
    //   icon: () => <Ionicons name="game-controller" size={14} color="#512DA8" />,
    //   name: "Gaming",
    // },
  ],
  lifeGoals: [
    {
      icon: () => <Ionicons name="briefcase" size={14} color="#1976D2" />,
      name: "Career Growth",
    },
  ],
  prompts: [
    {
      question: "A perfect date would be...",
      answer: "A walk in the park and ice cream.",
    },
    {
      question: "I'm looking for...",
      answer: "Someone to share adventures with.",
    },
  ],
  commonInterests: [
    {
      icon: () => <Ionicons name="wallet" size={14} color="#FBC02D" />,
      name: "Saver",
    },
    {
      icon: () => <Ionicons name="sunny" size={16} color="#FFA000" />,
      name: "Outdoor weekends",
    },
  ],
  distance: 8,
};

export const liamData: User = {
  name: "liam",
  age: 20,
  bio: "Curious designer who loves music and travel.",
  job: "UX Designer at a digital product studio",
  matchPercentage: 50,
  interests: [
    {
      icon: () => <FontAwesome5 name="hiking" size={14} color="#388E3C" />,
      name: "Hiking",
    },
    {
      icon: () => <FontAwesome5 name="guitar" size={14} color="#6D4C41" />,
      name: "Guitar",
    },
  ],
  lifeGoals: [
    {
      icon: () => <Ionicons name="briefcase" size={14} color="#1976D2" />,
      name: "Career Growth",
    },
    {
      icon: () => <Ionicons name="person" size={14} color="#F57C00" />,
      name: "Personal Growth",
    },
  ],
  prompts: [
    {
      question: "How do you usually handle conflict?",
      answer: "Seek compromise",
    },
    {
      question: "What's your attitude toward money?",
      answer: "Save first, spend later",
    },
    {
      question: "What's your attitude toward money?",
      answer: "Save first, spend later",
    },
  ],
  commonInterests: [
    {
      icon: () => <Ionicons name="wine" size={14} color="#C2185B" />,
      name: "Social drinker",
    },
    {
      icon: () => (
        <MaterialCommunityIcons name="leaf" size={16} color="#388E3C" />
      ),
      name: "Vegetarian",
    },
    {
      icon: () => (
        <MaterialCommunityIcons
          name="scale-balance"
          size={16}
          color="#0288D1"
        />
      ),
      name: "Work-life balance",
    },
    {
      icon: () => <Ionicons name="wallet" size={14} color="#FBC02D" />,
      name: "Saver",
    },
    {
      icon: () => <Ionicons name="sunny" size={16} color="#FFA000" />,
      name: "Outdoor weekends",
    },
    {
      icon: () => <Ionicons name="people" size={14} color="#7B1FA2" />,
      name: "Family",
    },
    {
      icon: () => (
        <MaterialCommunityIcons
          name="baby-face-outline"
          size={16}
          color="#D32F2F"
        />
      ),
      name: "Wants children",
    },
  ],
  distance: 14,
};