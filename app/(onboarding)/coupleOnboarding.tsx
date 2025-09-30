import React, { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, StyleSheet, View } from "react-native";
// सुनिश्चित करें कि types.ts/d.ts में 'FormData' export किया गया हो
import { FormData, ScreenProps } from "./types"; 
import { styles } from "./styles"; // सुनिश्चित करें कि styles export किया गया हो
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
  // ---------------- NEW QUIZ SCREENS (19-28) ----------------
  LoveStoryQuizScreen1, // 19: Anniversary / Special Day
  LoveStoryQuizScreen2, // 20: Couple Activities
  LoveStoryQuizScreen3, // 21: Expressing Love
  LoveStoryQuizScreen4, // 22: Celebrating Milestones
  LoveStoryQuizScreen5, // 23: Local Experiences
  LoveStoryQuizScreen6, // 24: Couple Priorities
  LoveStoryQuizScreen7, // 25: Perfect Date Idea
  LoveStoryQuizScreen8, // 26: LitAmor Help
  LoveStoryQuizScreen9, // 27: (New Screen)
  LoveStoryQuizScreen10, // 28: (New Screen)
  // -----------------------------------------------------
} from "./screens";
import { Href, router } from "expo-router";

// सुनिश्चित करें कि FormData keys के प्रकार (types) सही हैं


// यह कंपोनेंट आपकी मुख्य रूटिंग और स्टेट लॉजिक को संभालता है
const LitAmorOnboarding = () => {
  // कुल 28 स्क्रीन (18+10) हैं
  const [currentScreen, setCurrentScreen] = useState(1);
  
  const [formData, setFormData] = useState<FormData>({
    name: "",
    dateOfBirth: "",
    height: "",
    gender: "",
    pronouns: "They/Them",
    showPronouns: false,
    joyActivities: [],
    mainInterests: [],
    secondaryInterests: [],
    lifeGoals: [],
    bio: "",
    photos: [],
    partnerInvite: "",
    howMet: "",
    relationshipDuration: "",
    // ---------------- NEW DATA KEYS ----------------
    anniversaryDate: "",         // 19 (String)
    coupleActivities: [],        // 20 (Array)
    expressingLove: [],          // 21 (Array)
    milestoneCelebration: "",    // 22 (String)
    localExperiences: "",        // 23 (String)
    couplePriorities: [],        // 24 (Array)
    perfectDateIdea: [],         // 25 (Array)
    litAmorHelp: [],             // 26 (Array - assuming multi-select)
    // ---------------------------------------------
  });

  const nextScreen = () => {
    setCurrentScreen(currentScreen + 1);
  };

  // ✅ सुधार: TypeScript के साथ सुरक्षित, किसी भी Form Data Key को अपडेट करता है
  const updateFormData = (key: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // ✅ सुधार: किसी भी मल्टी-सेलेक्ट एरे को हैंडल करने के लिए एक जेनरिक टॉगल फ़ंक्शन
  const toggleArrayValue = (key: keyof FormData, value: string, maxLimit?: number) => {
    setFormData((prev) => {
      // TypeScript safety: ensure the key points to an array of strings
      const currentArray = (prev[key] || []) as string[]; 
      const selected = currentArray.includes(value);

      if (selected) {
        // Value को हटाएँ
        return {
          ...prev,
          [key]: currentArray.filter((v) => v !== value),
        };
      } else if (!maxLimit || currentArray.length < maxLimit) {
        // Value को जोड़ें, यदि लिमिट क्रॉस नहीं हुई है
        return { ...prev, [key]: [...currentArray, value] };
      }
      return prev; // यदि लिमिट पूरी हो गई है, तो स्टेट न बदलें
    });
  };

  // Existing specific toggle functions (अब ये toggleArrayValue का उपयोग कर सकते हैं)
  const toggleJoyActivity = (activity: string) => toggleArrayValue("joyActivities", activity, 4);
  const toggleMainInterest = (interest: string) => toggleArrayValue("mainInterests", interest);
  const toggleSecondaryInterest = (interest: string) => toggleArrayValue("secondaryInterests", interest);
  const toggleLifeGoal = (goal: string) => toggleArrayValue("lifeGoals", goal, 2);

  // ✅ सुधार: screenProps में नए जेनरिक टॉगल को जोड़ा गया है
  const screenProps: ScreenProps = {
    formData,
    updateFormData: updateFormData as (key: string, value: any) => void, // Casting for compatibility
    toggleJoyActivity,
    toggleMainInterest,
    toggleSecondaryInterest,
    toggleLifeGoal,
    toggleArrayValue: toggleArrayValue as (key: string, value: string, maxLimit?: number) => void,
    nextScreen,
    setCurrentScreen,
  };

  // --- Screen routing ---
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

    // ---------------- NEW QUIZ SCREENS (19-28) ----------------
    case 19:
      return <LoveStoryQuizScreen1 {...screenProps} />;
    case 20:
      return <LoveStoryQuizScreen2 {...screenProps} />;
    case 21:
      return <LoveStoryQuizScreen3 {...screenProps} />;
    case 22:
      return <LoveStoryQuizScreen4 {...screenProps} />;
    case 23:
      return <LoveStoryQuizScreen5 {...screenProps} />;
    case 24: 
      return <LoveStoryQuizScreen6 {...screenProps} />;
    case 25: 
      return <LoveStoryQuizScreen7 {...screenProps} />;
    case 26: // ✅ Corrected case number (पहले यह 28 था)
      return <LoveStoryQuizScreen8 {...screenProps} />;
    case 27: // ✅ Corrected case number (पहले यह 28 था)
      return <LoveStoryQuizScreen9 {...screenProps} />;
    case 28: // ✅ Corrected case number (पहले यह 28 था)
      return <LoveStoryQuizScreen10 {...screenProps} />;
    // ---------------------------------------------------------

    default:
      return (
        <View style={defaultStyles.container}>
            <Text style={defaultStyles.header}>Onboarding Complete! 🎉</Text>
            <TouchableOpacity
                style={defaultStyles.button}
                onPress={() =>
                  router.push("/(app)/HomeScreen" as Href) // ✅ Paath thik kiya गया है
                }
            >
                <Text style={defaultStyles.buttonText}>Go to Home Screen</Text>
            </TouchableOpacity>
        </View>
      );
  }
};

export default LitAmorOnboarding;

// Fallback Styles for the default case
const defaultStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#FF4757',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700',
    },
});