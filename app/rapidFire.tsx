import ArrowDropDownIcon from "@/components/arrowDropDown";
import ChevronBackIcon from "@/components/backIcon";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Question, RAPID_FIRE_QUESTIONS } from "../mockData/questions";

interface AnswerOptionProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

// Reusable component for the answer buttons
const AnswerOption: React.FC<AnswerOptionProps> = ({
  label,
  isSelected,
  onPress,
}) => (
  <TouchableOpacity
    style={[styles.optionButton, isSelected && styles.optionButtonSelected]}
    onPress={onPress}
  >
    <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
      {isSelected && (
        <Ionicons
          name="checkmark"
          size={16}
          color="white"
          // <View style={styles.checkboxInner}
        />
      )}
    </View>
    <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const DropdownOptions: React.FC<{
  options: { label: string; value: string }[];
  onSelect: (value: string) => void;
}> = ({ options, onSelect }) => (
  <View style={styles.dropdownOptionsContainer}>
    {options.map((option, index) => (
      <TouchableOpacity
        key={option.value}
        style={[
          styles.dropdownOption,
          index === options.length - 1 && styles.lastDropdownOption,
        ]}
        onPress={() => onSelect(option.value)}
      >
        <Text>{option.label}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

const RapidFireScreen = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const totalQuestions = RAPID_FIRE_QUESTIONS.length;
  const currentQuestion: Question = RAPID_FIRE_QUESTIONS[currentQuestionIndex];
  const selectedAnswerValue = answers[currentQuestion.id];
  useEffect(() => {
    if (currentQuestion.type === "dropdown" && !answers[currentQuestion.id]) {
      if (currentQuestion.options && currentQuestion.options.length > 0) {
        handleSelectAnswer(
          currentQuestion.id,
          currentQuestion.options[0].value
        );
      }
    }

    setIsDropdownOpen(false);
  }, [currentQuestion]);

  const handleSelectAnswer = (questionId: string, answerValue: string) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerValue,
    }));
    setIsDropdownOpen(false);
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log("Final Answers:", answers);
      router.replace("/");
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      router.back();
    }
  };

  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const selectedOption = currentQuestion.options.find(
    (opt) => opt.value === selectedAnswerValue
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Text style={styles.headerBack}>
            <ChevronBackIcon width={28} height={28} />
          </Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Rapid Fire</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
      </View>

      {/* Question Content */}
      <View style={styles.content}>
        <Text style={styles.subtitleText}>
          These point-scored questions reveal your preferences and boost your
          match accuracy.
        </Text>
        <Text style={styles.questionText}>{currentQuestion.questionText}</Text>

        {/* --- DYNAMIC INPUT AREA --- */}
        <View style={styles.optionsContainer}>
          {currentQuestion.type === "single-choice" &&
            currentQuestion.options.map((option) => (
              <AnswerOption
                key={option.value}
                label={option.label}
                isSelected={selectedAnswerValue === option.value}
                onPress={() =>
                  handleSelectAnswer(currentQuestion.id, option.value)
                }
              />
            ))}

          {currentQuestion.type === "dropdown" && (
            <View>
              <TouchableOpacity
                style={styles.dropdownButton}
                onPress={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <Text style={styles.dropdownButtonText}>
                  {selectedOption ? selectedOption.label : "Select..."}
                </Text>
                <ArrowDropDownIcon width={36} height={36} />

                {/* <Text style={styles.dropDownIcon}>▼</Text> */}
              </TouchableOpacity>

              {isDropdownOpen && (
                <DropdownOptions
                  options={currentQuestion.options}
                  onSelect={(value) =>
                    handleSelectAnswer(currentQuestion.id, value)
                  }
                />
              )}
            </View>
          )}
        </View>
      </View>

      {/* Next Button */}
      <TouchableOpacity
        style={[
          styles.nextButton,
          !selectedAnswerValue && styles.nextButtonDisabled,
        ]}
        onPress={handleNext}
        disabled={!selectedAnswerValue}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    // justifyContent: "space-between",
    marginBottom: 20,
  },
  headerBack: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "Poppins_500Medium",
    color: "#333",
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    marginBottom: 20,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#4A4A4A",
    borderRadius: 4,
  },
  content: {
    flex: 1,
  },
  subtitleText: {
    fontSize: 16,
    color: "#444444",
    marginBottom: 30,
    lineHeight: 24,
  },
  questionText: {
    fontSize: 24,
    fontFamily: "Poppins_500Medium",
    color: "#000000",
    marginBottom: 30,
  },
  optionsContainer: {
    gap: 15,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#C6C3BF",
    borderRadius: 12,
    padding: 15,
    borderWidth: 2,
    borderColor: "transparent",
  },
  optionButtonSelected: {
    borderColor: "#8C8C8C",
    backgroundColor: "#E6E6E6",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#666666",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  checkboxSelected: {
    borderColor: "#4A4A4A",
    backgroundColor: "#4A4A4A",
  },
  checkboxInner: {
    width: 12,
    height: 12,
    // backgroundColor: "white",
    borderRadius: 3,
  },
  optionText: {
    fontSize: 16,
    color: "#444444",
  },
  optionTextSelected: {
    // fontWeight: "bold",
    color: "#000000",
  },
  // --- NEW DROPDOWN STYLES ---
  dropdownButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#C6C3BF",
    borderRadius: 12,
    paddingLeft: 20,
    padding: 8,
    borderWidth: 2,
    borderColor: "#8C8C8C",
  },
  dropdownButtonText: {
    fontSize: 16,
    color: "#000000",
  },
  dropDownIcon: {
    fontSize: 24,

    color: " #444444",
  },
  dropdownOptionsContainer: {
    backgroundColor: "#C6C3BF",
    borderRadius: 12,
    marginTop: 10,
    // borderWidth: 1,

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
    // maxHeight: 200,

    borderColor: "#8C8C8C",
  },
  dropdownOption: {
    paddingVertical: 0,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: "#8C8C8C",
  },
  lastDropdownOption: {
    borderBottomWidth: 0,
  },
  // --- END NEW STYLES ---
  nextButton: {
    backgroundColor: "#4A4A4A",
    paddingVertical: 12,
    borderRadius: 16,
    alignItems: "center",
  },
  nextButtonDisabled: {
    backgroundColor: "#A0A0A0",
  },
  nextButtonText: {
    color: "white",
    fontSize: 20,
    fontFamily: "Poppins_500Medium",
  },
});

export default RapidFireScreen;
