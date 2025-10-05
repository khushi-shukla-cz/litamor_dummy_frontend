import { BlurView } from "expo-blur";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { User } from "../mockData/loneTownData";

interface SuggestionCardProps {
  user: User;
  isBlurred: boolean;
}

const Tag = ({ icon, text }: { icon: () => React.ReactNode; text: string }) => (
  <View style={styles.tag}>
    {icon()}
    <Text style={styles.tagText}>{text}</Text>
  </View>
);

const CardContent = ({ user }: { user: User }) => (
  <View style={styles.suggestionCard}>
    {/* <View style={styles.suggestionImagePlaceholder} /> */}
    <Text style={styles.suggestionName}>
      {user.name}, {user.age}
    </Text>
    <Text style={styles.suggestionBio}>"{user.bio}"</Text>
    <View style={styles.suggestionTagsContainer}>
      {user.interests.map((item) => (
        <Tag key={item.name} icon={item.icon} text={item.name} />
      ))}
      {user.lifeGoals.map((item) => (
        <Tag key={item.name} icon={item.icon} text={item.name} />
      ))}
    </View>
  </View>
);

const SuggestionCard: React.FC<SuggestionCardProps> = ({ user, isBlurred }) => {
  if (isBlurred) {
    return (
      <View
        style={{
          flex: 1,
          marginHorizontal: 5,
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        <CardContent user={user} />
        <BlurView intensity={130} style={StyleSheet.absoluteFill} />
      </View>
    );
  }

  return (
    <View
      style={{ flex: 1, marginHorizontal: 5, justifyContent: "space-between" }}
    >
      <CardContent user={user} />
    </View>
  );
};

const styles = StyleSheet.create({
  suggestionCard: {
    flex: 1,
    height: 220,
    backgroundColor: "#D9D9D9",
    borderRadius: 16,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  suggestionImagePlaceholder: {
    backgroundColor: "#E0E0E0",
    borderRadius: 12,
  },
  suggestionName: {
    fontSize: 16,
    fontWeight: 500,
    marginTop: 8,
  },
  suggestionBio: {
    fontSize: 13,
    color: "#444444",
    marginTop: 4,
    height: 40,
  },
  suggestionTagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 5,
    marginTop: 8,
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 20,
    gap: 4,
  },
  tagText: {
    fontSize: 13,
    color: "#424242",
  },
});

export default SuggestionCard;