import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Capsule } from "../types/type";

interface CapsuleCardProps {
  capsule: Capsule;
}

const CapsuleCard: React.FC<CapsuleCardProps> = ({ capsule }) => {
  return (
    <TouchableOpacity style={styles.cardContainer} activeOpacity={0.85}>
      <View style={styles.imageSection}>
        <Image
          source={require("../assets/images/card.jpg")}
          style={styles.cardImage}
          resizeMode="cover"
        />
        <View style={styles.cardOverlay} />
        <View style={styles.cardTopRow}>
          <Text style={styles.sharedText}>👥 Shared with Alex</Text>
        </View>
      </View>
      <View style={styles.bottomSection}>
        <Text style={styles.title}>{capsule.title}</Text>
        <View style={styles.statusRow}>
          <Text style={styles.lockIcon}>🔒</Text>
          <Text style={styles.status}>{capsule.date}</Text>
        </View>
        <View style={styles.tagsRow}>
          {capsule.tags.map((tag, idx) => (
            <View style={styles.tagPill} key={idx}>
              <Text style={styles.tagText}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CapsuleCard;

const CARD_IMAGE_HEIGHT = 160;

const styles = StyleSheet.create({
  cardContainer: {
    width: 200,
    borderRadius: 14,
    backgroundColor: "#fff",
    marginRight: 13,
    overflow: "hidden",
    elevation: 2, // subtle shadow
  },
  imageSection: {
    position: "relative",
    width: "100%",
    height: CARD_IMAGE_HEIGHT,
    backgroundColor: "#222",
  },
  cardImage: {
    width: "100%",
    height: "100%",
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.30)",
    zIndex: 1,
  },
  cardTopRow: {
    position: "absolute",
    left: 0,
    bottom: 7,
    paddingLeft: 10,
    zIndex: 2,
  },
  sharedText: {
    color: "#cbd6e2",
    fontSize: 13,
    fontWeight: "400",
  },
  bottomSection: {
    paddingHorizontal: 13,
    paddingBottom: 14,
    paddingTop: 10,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 15,
    color: "#212121",
    fontWeight: "700",
    marginBottom: 4,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 7,
  },
  lockIcon: {
    fontSize: 13,
    marginRight: 4,
    color: "#888",
  },
  status: {
    fontSize: 13,
    color: "#888",
    fontWeight: "500",
  },
  tagsRow: {
    flexDirection: "row",
    marginTop: 2,
  },
  tagPill: {
    backgroundColor: "#E6E6E6",
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 14,
    marginRight: 7,
    marginTop: 4,
  },
  tagText: {
    color: "#444444",
    fontSize: 13,
    fontWeight: "400",
  },
});
