import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Alert,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// 1. Import Types
import { CreateCapsuleState, StepProps } from "../../types/capsule";
// 2. Import Step Components
import Step1Details from "../../components/capsule-steps/step1Details";
import Step2Media from "../../components/capsule-steps/step2Media";
import Step3Rules from "../../components/capsule-steps/step3Rules";

// --- Initial State for the Multi-Step Form ---
const INITIAL_STATE: CreateCapsuleState = {
  step: 1,
  memoryName: "",
  captureMethod: null,
  emotions: "",
  mediaFiles: Array.from({ length: 6 }, (_, i) => ({ id: i + 1, caption: "" })),
  unlockDate: null,
  unlockTime: { hour: "12", minute: "00", period: "AM" },
  futureMessage: "",
  visibility: "Private",
  isSurprise: false,
};

// --- Progress Bar Data ---
const STEPS = [
  { step: 1, label: "Add\nDetails" },
  { step: 2, label: "Attach\nMedia" },
  { step: 3, label: "Set Unlock\nrules" },
];

const CreateCapsuleScreen: React.FC = () => {
  const router = useRouter();
  const [state, setState] = useState(INITIAL_STATE);

  const { step: currentStep } = state;

  const handleNext = () => {
    // Basic validation based on the current step
    if (
      currentStep === 1 &&
      (!state.memoryName.trim() || !state.captureMethod)
    ) {
      return Alert.alert("Please fill in memory name and capture method.");
    }
    if (
      currentStep === 3 &&
      (!state.unlockDate || !state.futureMessage.trim())
    ) {
      return Alert.alert("Please set unlock date and write a message.");
    }

    if (currentStep < 3) {
      setState((prev) => ({ ...prev, step: prev.step + 1 }));
    } else {
      // Final submission logic
      console.log("Capsule Submitted:", state);
      router.back();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setState((prev) => ({ ...prev, step: prev.step - 1 }));
    } else {
      router.back();
    }
  };

  const currentStepComponent = useMemo(() => {
    const props: StepProps = {
      state,
      setState,
      onNext: handleNext,
      onBack: handleBack,
    };
    switch (currentStep) {
      case 1:
        return <Step1Details {...props} />;
      case 2:
        return <Step2Media {...props} />;
      case 3:
        return <Step3Rules {...props} />;
      default:
        return <Step1Details {...props} />;
    }
  }, [currentStep, state]);

  return (
    <View style={styles.fullScreenContainer}>
      <SafeAreaView style={styles.safeAreaContainer}>
        {/* Fixed Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.headerButton}>
            <Text style={styles.headerIcon}>
              <Ionicons name="chevron-back" size={28} color="#fff" />
            </Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Capsule</Text>
          <TouchableOpacity style={styles.headerButton}>
            <Text style={styles.headerIcon}>
              <MaterialCommunityIcons
                name="dots-vertical"
                size={28}
                color="#fff"
              />
            </Text>
          </TouchableOpacity>
        </View>

        {/* Step Progress Bar */}
        <View style={styles.progressBarContainer}>
          {/* Container 1: Step Labels */}
          <View style={styles.stepLabelsContainer}>
            {STEPS.map(({ step, label }) => (
              <Text
                key={step}
                style={[
                  styles.stepLabel,
                  currentStep === step && styles.stepLabelCurrent,
                ]}
              >
                {label}
              </Text>
            ))}
          </View>

          {/* Container 2: Step Circles and Connectors */}
          <View style={styles.stepCirclesContainer}>
            {STEPS.map(({ step }, index) => {
              const isCompleted = step < currentStep;
              const isActive = step === currentStep;

              return (
                <React.Fragment key={step}>
                  <View
                    style={[
                      styles.stepCircle,
                      (isCompleted || isActive) && styles.stepCircleActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.stepText,
                        isActive && styles.stepTextCurrent,
                      ]}
                    >
                      {step}
                    </Text>
                  </View>

                  {index < STEPS.length - 1 && (
                    <View
                      style={[
                        styles.stepConnector,
                        isCompleted && styles.stepConnectorActive,
                      ]}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </View>
        </View>

        {/* Content Area */}
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {currentStepComponent}

          {/* Fixed Bottom Button (Next/Finish) */}
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {currentStep === 3 ? "Finish" : "Next"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default CreateCapsuleScreen;

// ===============================================
//                STYLES
const { width } = Dimensions.get("window");
const cellWidth = (width - 32 - 10) / 7;

const styles = StyleSheet.create({
  // --- Global Layout ---
  fullScreenContainer: {
    flex: 1,
    backgroundColor: "#7C7C7C",
  },
  safeAreaContainer: {
    flex: 1,
    marginTop: 40,
  },
  scrollContent: {
    paddingHorizontal: 10,
    paddingBottom: 100,
  },

  // --- Header/Navigation ---
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 10,
    backgroundColor: "#7C7C7C",
  },
  headerButton: {
    padding: 8,
    height: 50,
    width: 50,
    backgroundColor: "#999999",
    borderRadius: 25,
  },
  headerIcon: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },

  // --- Progress Bar ---
  progressBarContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#7C7C7C",
  },
  // NEW CONTAINER FOR LABELS
  stepLabelsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    gap: 80,
    paddingLeft: 10,
  },
  // NEW CONTAINER FOR CIRCLES
  stepCirclesContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  stepLabel: {
    flex: 1, // Allows text to wrap and align correctly
    color: "#D4D4D4",
    fontSize: 12,
    fontWeight: "600",
    // textAlign: "center",
    gap: 4,
  },
  stepLabelCurrent: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "transparent",
    borderWidth: 1,
  },
  stepCircleActive: {
    backgroundColor: "#666666",
    borderColor: "#666666",
  },
  stepText: {
    color: "#444444",
    fontSize: 14,
    fontWeight: "bold",
  },
  stepTextCurrent: {
    color: "white",
  },
  stepConnector: {
    flex: 1,
    height: 2,
    backgroundColor: "#666666",
  },
  stepConnectorActive: {
    backgroundColor: "#666666",
  },

  // --- Shared Step Styles ---
  stepContainer: {
    paddingTop: 10,
  },
  screenTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#8C8C8C",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  cardHeader: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 15,
    color: "#333",
  },

  // --- Radio Buttons ---
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#444444",
  },
  radioOptionBlock: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.3)",
    backgroundColor: "#444444",
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#234ed45",
    marginRight: 10,
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: "black",
  },
  radioText: {
    color: "white",
    fontSize: 15,
  },
  radioSubtitle: {
    color: "#D4D4D4",
    fontSize: 12,
    marginTop: 2,
  },

  // --- Step 2 Media Styles ---
  mediaGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  mediaBox: {
    width: (width - 32 - 32) / 3,
    height: (width - 32 - 32) / 3,
    backgroundColor: "#B4B4B4",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  mediaBoxSelected: {
    borderWidth: 3,
    borderColor: "white",
  },
  mediaBoxIcon: {
    fontSize: 30,
    color: "#6C6C6C",
  },
  captionInput: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    minHeight: 100,
    textAlignVertical: "top",
    fontSize: 15,
    color: "#333",
  },

  // --- Step 3 Calendar Styles ---
  calendarCard: {
    backgroundColor: "#8C8C8C",
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
    marginBottom: 15,
  },
  calendarMonth: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  calendarNav: {
    color: "white",
    fontSize: 20,
    paddingHorizontal: 10,
  },
  calendarRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  dayOfWeek: {
    color: "#D4D4D4",
    fontSize: 12,
    fontWeight: "bold",
    width: cellWidth,
    textAlign: "center",
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  dateCell: {
    width: cellWidth,
    height: cellWidth,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: cellWidth / 2,
    marginVertical: 4,
  },
  dateCellSelected: {
    backgroundColor: "#B4B4B4",
  },
  dateCellToday: {
    borderWidth: 1,
    borderColor: "#D4D4D4",
    borderRadius: cellWidth / 2,
  },
  dateTextCalendar: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
  dateTextToday: {
    color: "#D4D4D4",
  },
  dateTextSelected: {
    color: "#333",
  },
  timeLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  timeInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 8,
    paddingVertical: 5,
    marginLeft: 20,
  },
  timeInputBox: {
    width: 40,
    textAlign: "center",
    fontSize: 16,
    color: "#333",
  },
  timeSeparator: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
    marginHorizontal: 2,
  },
  timePeriodButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
    marginHorizontal: 2,
  },
  timePeriodButtonActive: {
    backgroundColor: "#8C8C8C",
  },
  timePeriodText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#A9A9A9",
  },
  timePeriodTextActive: {
    color: "white",
  },
  messageInput: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingTop: 12,
    minHeight: 120,
    textAlignVertical: "top",
    fontSize: 15,
    color: "#333",
  },
  inputToolbar: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  toolbarIcon: {
    fontSize: 20,
    marginRight: 15,
    color: "#4E4E4E",
  },
  surpriseRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  surpriseTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  surpriseTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  // --- Bottom Fixed Elements ---
  nextButton: {
    position: "relative",
    marginTop: 14,
    backgroundColor: "#E6E6E6",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    elevation: 3,
    zIndex: 10,
  },
  nextButtonText: {
    color: "#444444",
    fontSize: 18,
    fontWeight: "400",
  },
});
