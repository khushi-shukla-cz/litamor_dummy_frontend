// components/capsule-steps/Step1Details.tsx

import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StepProps } from "../../types/capsule"; // Adjust path

const Step1Details: React.FC<StepProps> = ({ state, setState }) => {
  const { memoryName, captureMethod, emotions } = state;
  const captureOptions = [
    "Text note",
    "Voice note",
    "Photo / Video",
    "Mixed (combination)",
  ];

  return (
    <View style={styles.stepContainer}>
      <Text style={styles.screenTitle}>Create Capsule</Text>

      {/* 1. Memory Name Input */}
      <View style={styles.card}>
        <Text style={styles.cardHeader}>What's the name of this memory?</Text>
        <TextInput
          style={styles.textInput}
          placeholder="eg: First Trip ✈️"
          placeholderTextColor="#A9A9A9"
          value={memoryName}
          onChangeText={(text) =>
            setState((prev) => ({ ...prev, memoryName: text }))
          }
        />
      </View>

      {/* 2. Capture Method Radios */}
      <View style={styles.card}>
        <Text style={styles.cardHeader}>
          How do you want to capture this memory?
        </Text>
        {captureOptions.map((option) => (
          <TouchableOpacity
            key={option}
            style={styles.radioOption}
            onPress={() =>
              setState((prev) => ({ ...prev, captureMethod: option as any }))
            }
          >
            <View style={styles.radioCircle}>
              {captureMethod === option && <View style={styles.radioInner} />}
            </View>
            <Text style={styles.radioText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 3. Emotions Input */}
      <View style={styles.card}>
        <Text style={styles.cardHeader}>
          What emotions best describe this moment?
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder="e.g. #Proud #Grateful #Excited"
          placeholderTextColor="#666666"
          value={emotions}
          onChangeText={(text) =>
            setState((prev) => ({ ...prev, emotions: text }))
          }
        />
      </View>
    </View>
  );
};

export default Step1Details;

// Styles are shared/moved to the main screen, but you need a basic placeholder for local development
const styles = StyleSheet.create({
  stepContainer: { paddingTop: 10 },
  screenTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#E6E6E6",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  cardHeader: {
    color: "#666666",

    fontSize: 16,
    fontWeight: "500",
    marginBottom: 6,
  },
  textInput: {
    // backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 15,
    color: "#666666",
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  radioCircle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#666666",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  radioInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#666666",
  },
  radioText: { color: "#666666", fontSize: 15 },
});
