import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { StepProps } from "../../types/capsule";

const { width } = Dimensions.get("window");

const Step2Media: React.FC<StepProps> = ({ state, setState }) => {
  const { mediaFiles } = state;
  const [currentMediaId, setCurrentMediaId] = useState(mediaFiles[0]?.id || 1);
  const currentMedia = mediaFiles.find((m) => m.id === currentMediaId);

  const pickMedia = async (mediaId: number) => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission Required",
        "We need camera roll permissions to let you select photos/videos for your capsule."
      );
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 0.8,
      aspect: [1, 1],
    });

    if (result.canceled) {
      return;
    }

    const uri = result.assets[0].uri;

    setState((prev) => ({
      ...prev,
      mediaFiles: prev.mediaFiles.map((m) =>
        m.id === mediaId ? { ...m, uri: uri } : m
      ),
    }));

    setCurrentMediaId(mediaId);
  };

  const handleCaptionChange = (text: string) => {
    setState((prev) => ({
      ...prev,
      mediaFiles: prev.mediaFiles.map((m) =>
        m.id === currentMediaId ? { ...m, caption: text } : m
      ),
    }));
  };

  // --- Function to handle media deletion ---
  const handleDeleteMedia = (mediaId: number) => {
    setState((prev) => ({
      ...prev,
      mediaFiles: prev.mediaFiles.map((m) =>
        m.id === mediaId ? { ...m, uri: undefined } : m
      ),
    }));
  };

  return (
    <View style={styles.stepContainer}>
      <Text style={styles.screenTitle}>Add Media</Text>

      <View style={styles.mediaGrid}>
        {mediaFiles.map((media) => (
          // ---  Media item is wrapped in a View for positioning the delete button ---
          <View key={media.id} style={styles.mediaItemContainer}>
            <TouchableOpacity
              style={[
                styles.mediaBox,
                media.id === currentMediaId && styles.mediaBoxSelected,
              ]}
              onPress={() => {
                if (media.uri) {
                  setCurrentMediaId(media.id);
                } else {
                  pickMedia(media.id);
                }
              }}
            >
              {media.uri ? (
                <Image
                  source={{ uri: media.uri }}
                  style={styles.mediaThumbnail}
                />
              ) : (
                <Text style={styles.mediaBoxIcon}>+</Text>
              )}
            </TouchableOpacity>

            {/* ---  Delete button appears if an image is selected --- */}
            {media.uri && (
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => handleDeleteMedia(media.id)}
              >
                <Text style={styles.deleteButtonText}>×</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardHeader}>
          Write a caption for this Attachment
        </Text>
        <TextInput
          style={styles.captionInput}
          placeholder="Start writing..."
          placeholderTextColor="#666666"
          multiline
          value={currentMedia?.caption || ""}
          onChangeText={handleCaptionChange}
          editable={!!currentMedia?.uri}
        />
      </View>
    </View>
  );
};

export default Step2Media;

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
    marginBottom: 10,
  },
  mediaGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  //  Container for each media box + delete button ---
  mediaItemContainer: {
    width: (width - 32 - 32) / 3,
    height: (width - 32 - 32) / 3,
    marginBottom: 16,
  },
  mediaBox: {
    width: "100%",
    height: "100%",
    backgroundColor: "#E6E6E6",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  mediaBoxSelected: { borderWidth: 3, borderColor: "transparent" },
  mediaBoxIcon: { fontSize: 40, color: "#000000" },
  mediaThumbnail: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  //  Styles for the delete button ---
  deleteButton: {
    position: "absolute",
    top: -1,
    right: -1,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 12,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",

    fontSize: 16,
    lineHeight: 20, // Center the 'x' vertically
  },
  captionInput: {
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    minHeight: 100,
    textAlignVertical: "top",
    fontSize: 15,
    color: "#333333",
  },
});
