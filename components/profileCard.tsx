import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Rect } from "react-native-svg";
import { User } from "../mockData/data";
import { ChevronDownIcon, ChevronUpIcon } from "./chevron";
import MatchPill from "./matchPill";

const BarsIcon = ({ color = "white", size = 24 }) => {
  const barWidth = size / 7;
  const barMargin = barWidth / 2;
  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Rect
        x={0}
        y={size * 0.25}
        width={barWidth}
        height={size * 0.5}
        fill={color}
        rx={barWidth / 2}
      />
      <Rect
        x={barWidth + barMargin}
        y={size * 0.1}
        width={barWidth}
        height={size * 0.8}
        fill={color}
        rx={barWidth / 2}
      />
      <Rect
        x={2 * (barWidth + barMargin)}
        y={0}
        width={barWidth}
        height={size}
        fill={color}
        rx={barWidth / 2}
      />
      <Rect
        x={3 * (barWidth + barMargin)}
        y={size * 0.1}
        width={barWidth}
        height={size * 0.8}
        fill={color}
        rx={barWidth / 2}
      />
      <Rect
        x={4 * (barWidth + barMargin)}
        y={size * 0.25}
        width={barWidth}
        height={size * 0.5}
        fill={color}
        rx={barWidth / 2}
      />
    </Svg>
  );
};

interface TagProps {
  icon: () => React.ReactNode;
  text: string;
  isSelected: boolean;
  onPress: () => void;
}

// Updated Tag component to be pressable and change style when selected
const Tag: React.FC<TagProps> = ({ icon, text, isSelected, onPress }) => (
  <TouchableOpacity
    style={[styles.tag, isSelected && styles.tagSelected]}
    onPress={onPress}
  >
    {icon()}
    <Text style={[styles.tagText, isSelected && styles.tagTextSelected]}>
      {text}
    </Text>
  </TouchableOpacity>
);

const Prompt = ({ question, answer }: { question: string; answer: string }) => (
  <View style={styles.promptContainer}>
    <Text style={styles.promptQuestion}>{question}</Text>
    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 4 }}>
      <MaterialCommunityIcons
        name="lightbulb-on-outline"
        size={18}
        color="#424242"
      />
      <Text style={styles.promptAnswer}>{answer}</Text>
    </View>
  </View>
);

interface ProfileCardProps {
  user: User;
  isPremium: boolean;
  onToggleExpand?: (isExpanded: boolean) => void; // Callback to notify parent
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  user,
  isPremium,
  onToggleExpand,
}) => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [promptsExpanded, setPromptsExpanded] = useState(true);
  const [interestsExpanded, setInterestsExpanded] = useState(true);
  // New state to manage selected tags
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleMainToggle = () => {
    const newExpandedState = !isExpanded;
    setIsExpanded(newExpandedState);
    if (onToggleExpand) {
      onToggleExpand(newExpandedState);
    }
  };

  // Function to handle selecting and deselecting tags
  const toggleTagSelection = (tagName: string) => {
    setSelectedTags((prevTags) => {
      if (prevTags.includes(tagName)) {
        return prevTags.filter((tag) => tag !== tagName); // Deselect
      } else {
        return [...prevTags, tagName]; // Select
      }
    });
  };

  return (
    <View style={styles.card}>
      {/* Main Touchable Area for the top part of the card */}
      <TouchableOpacity activeOpacity={0.8} onPress={handleMainToggle}>
        <MatchPill percentage={user.matchPercentage} />
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.name}>
              {user.name}, {user.age}
            </Text>
            <Text style={styles.bio}>"{user.bio}"</Text>
          </View>
          {isExpanded ? (
            <ChevronUpIcon size={24} color="#424242" />
          ) : (
            <ChevronDownIcon size={17} color="#424242" />
          )}
        </View>
        <View style={styles.jobContainer}>
          <Ionicons name="briefcase-outline" size={18} color="#757575" />
          <Text style={styles.jobText}>{user.job}</Text>
        </View>
        <Text style={styles.subHeader}>Interests</Text>
        <View style={styles.tagsContainer}>
          {user.interests.map((interest) => (
            <Tag
              key={interest.name}
              icon={interest.icon}
              text={interest.name}
              isSelected={selectedTags.includes(interest.name)}
              onPress={() => toggleTagSelection(interest.name)}
            />
          ))}
        </View>
        <Text style={styles.subHeader}>Life goal</Text>
        <View style={styles.tagsContainer}>
          {user.lifeGoals.map((goal) => (
            <Tag
              key={goal.name}
              icon={goal.icon}
              text={goal.name}
              isSelected={selectedTags.includes(goal.name)}
              onPress={() => toggleTagSelection(goal.name)}
            />
          ))}
        </View>
      </TouchableOpacity>

      {/* Expanded Content Area */}
      {isExpanded && (
        <View style={styles.expandedSection}>
          {/* Collapsible Personal Prompts */}
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => setPromptsExpanded(!promptsExpanded)}
          >
            <Text style={styles.sectionTitle}>Personal Prompts</Text>
            {promptsExpanded ? (
              <ChevronUpIcon size={20} color="#424242" />
            ) : (
              <ChevronDownIcon size={16} color="#424242" />
            )}
          </TouchableOpacity>
          {promptsExpanded &&
            user.prompts.map((p, i) => (
              <Prompt key={i} question={p.question} answer={p.answer} />
            ))}

          {/* Collapsible Interests in Common */}
          <TouchableOpacity
            style={styles.sectionHeader}
            onPress={() => setInterestsExpanded(!interestsExpanded)}
          >
            <Text style={styles.sectionTitle}>Interests in Common</Text>
            {interestsExpanded ? (
              <ChevronUpIcon size={20} color="#424242" />
            ) : (
              <ChevronDownIcon size={16} color="#424242" />
            )}
          </TouchableOpacity>
          {interestsExpanded && (
            <View style={styles.commonInterestsContainer}>
              {user.commonInterests.map((interest) => (
                <Tag
                  key={interest.name}
                  icon={interest.icon}
                  text={interest.name}
                  isSelected={selectedTags.includes(interest.name)}
                  onPress={() => toggleTagSelection(interest.name)}
                />
              ))}
            </View>
          )}

          <View style={styles.locationContainer}>
            <Ionicons name="location-sharp" size={18} color="#424242" />
            <Text style={styles.locationText}>
              Located {user.distance} km away from your location
            </Text>
          </View>
        </View>
      )}

      {/* Action Buttons */}
      <View style={styles.cardActions}>
        <TouchableOpacity style={styles.chatButton} onPress={() => router.push("/request")}>
          <Text style={styles.chatButtonText}>Start a Chat</Text>
        </TouchableOpacity>
        {isPremium && (
          <TouchableOpacity style={styles.voiceButton}>
            <BarsIcon size={30} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#D9D9D9",
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 15,
  },
  name: { fontSize: 24, fontWeight: "500" },
  bio: { fontSize: 16, color: "#616161", marginTop: 4 },
  jobContainer: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  jobText: { marginLeft: 8, fontSize: 14, color: "#616161" },
  subHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "#000000",
  },
  tagsContainer: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 6,
  },
  tagSelected: {
    backgroundColor: "#616161", // Style for selected tag
  },
  tagText: { fontSize: 13, color: "#424242" },
  tagTextSelected: {
    color: "#FFFFFF", // Style for selected tag text
  },
  expandedSection: {
    marginTop: 15,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  promptContainer: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  promptQuestion: { fontSize: 14, color: "#616161" },
  promptAnswer: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#212121",
    marginLeft: 6,
  },
  commonInterestsContainer: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingTop: 15,
  },
  locationText: { marginLeft: 8, color: "#424242" },
  cardActions: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    gap: 10,
  },
  chatButton: {
    flex: 1,
    backgroundColor: "#616161",
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  chatButtonText: { color: "white", fontSize: 16, fontWeight: "bold" },
  voiceButton: {
    backgroundColor: "#616161",
    width: 80,
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileCard;
