import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import * as ImagePicker from "expo-image-picker";
import { StepProps } from "../../types/capsule";

// NOTE: Your `CreateCapsuleState` type should include these fields:
// attachedMedia: ImagePicker.ImagePickerAsset[];
// audioRecordingUri: string | null;

const { width } = Dimensions.get("window");
const cellWidth = (width - 60 - 10) / 7;

const getMonthName = (date: Date) => {
  return date.toLocaleString("en-US", { month: "long", year: "numeric" });
};

const getCalendarDates = (displayDate: Date) => {
  const month = displayDate.getMonth();
  const year = displayDate.getFullYear();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const dates = [];

  for (let i = 0; i < firstDayOfMonth; i++) {
    dates.push(" ");
  }
  for (let day = 1; day <= daysInMonth; day++) {
    dates.push(day.toString());
  }
  const totalCells = 42;
  while (dates.length < totalCells) {
    dates.push(" ");
  }
  return dates.slice(0, dates.length > 35 ? 42 : 35);
};

const Step3Rules: React.FC<StepProps> = ({ state, setState }) => {
  const { unlockDate, unlockTime, futureMessage, visibility, isSurprise } =
    state;
  const [currentDisplayDate, setCurrentDisplayDate] = useState(new Date());
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    return recording
      ? () => {
          console.log("Unloading Recording");
          recording.stopAndUnloadAsync();
        }
      : undefined;
  }, [recording]);

  const visibilityOptions = [
    {
      label: "Public",
      subtitle: "(Anyone can see this capsule.)",
      value: "Public",
    },
    {
      label: "Private",
      subtitle: "(Only you can view this capsule.)",
      value: "Private",
    },
    {
      label: "Partner Only",
      subtitle: "(Shared exclusively with your partner.)",
      value: "Partner Only",
    },
  ];

  const handlePermissionRequest = async (
    permissionRequest: () => Promise<any>,
    permissionType: string
  ) => {
    const { status } = await permissionRequest();
    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        `Sorry, we need ${permissionType} permissions to make this work!`
      );
      return false;
    }
    return true;
  };

  const pickMedia = async (mediaTypes: ImagePicker.MediaTypeOptions) => {
    if (
      !(await handlePermissionRequest(
        ImagePicker.requestMediaLibraryPermissionsAsync,
        "camera roll"
      ))
    )
      return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setState((prev) => ({
        ...prev,
        attachedMedia: [...(prev.attachedMedia || []), ...result.assets],
      }));
    }
  };

  const startRecording = async () => {
    if (
      !(await handlePermissionRequest(
        Audio.requestPermissionsAsync,
        "microphone"
      ))
    )
      return;
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;
    setIsRecording(false);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setState((prev) => ({ ...prev, audioRecordingUri: uri }));
    setRecording(null);
  };

  const handleDeleteMedia = (uri: string) => {
    setState((prev) => ({
      ...prev,
      attachedMedia: prev.attachedMedia?.filter((asset) => asset.uri !== uri),
    }));
  };

  const handleDeleteAudio = () => {
    setState((prev) => ({ ...prev, audioRecordingUri: null }));
  };

  const handleMonthChange = (direction: "prev" | "next") => {
    setCurrentDisplayDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + (direction === "next" ? 1 : -1));
      return newDate;
    });
  };

  const handleDateSelect = (day: string) => {
    if (!day.trim()) return;
    const newDate = new Date(
      currentDisplayDate.getFullYear(),
      currentDisplayDate.getMonth(),
      parseInt(day)
    );
    setState((prev) => ({ ...prev, unlockDate: newDate }));
  };

  const calendarDays = getCalendarDates(currentDisplayDate);
  const today = new Date();
  const isCurrentMonth =
    today.getMonth() === currentDisplayDate.getMonth() &&
    today.getFullYear() === currentDisplayDate.getFullYear();
  const isSelectedDay = (day: string) => {
    return (
      unlockDate &&
      unlockDate.getDate() === parseInt(day) &&
      unlockDate.getMonth() === currentDisplayDate.getMonth() &&
      unlockDate.getFullYear() === currentDisplayDate.getFullYear()
    );
  };

  return (
    <View style={styles.stepContainer}>
      <Text style={styles.screenTitle}>Unlock Date & time 🔒</Text>

      <View style={styles.calendarCard}>
        <View style={styles.calendarHeader}>
          <TouchableOpacity onPress={() => handleMonthChange("prev")}>
            <Text style={styles.calendarNav}>{"<"}</Text>
          </TouchableOpacity>
          <Text style={styles.calendarMonth}>
            {getMonthName(currentDisplayDate)}
          </Text>
          <TouchableOpacity onPress={() => handleMonthChange("next")}>
            <Text style={styles.calendarNav}>{">"}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.calendarRow}>
          {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((day) => (
            <Text key={day} style={styles.dayOfWeek}>
              {day}
            </Text>
          ))}
        </View>
        <View style={styles.calendarGrid}>
          {calendarDays.map((day, index) => {
            const isSelected = isSelectedDay(day);
            const isToday =
              isCurrentMonth &&
              parseInt(day) === today.getDate() &&
              !isSelected;
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dateCell,
                  isSelected && styles.dateCellSelected,
                  isToday && styles.dateCellToday,
                ]}
                onPress={() => handleDateSelect(day)}
                disabled={!day.trim()}
              >
                <Text
                  style={[
                    styles.dateTextCalendar,
                    day.trim() ? {} : { color: "transparent" },
                    isToday && styles.dateTextToday,
                    isSelected && styles.dateTextSelected,
                  ]}
                >
                  {day}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.timeContainer}>
        <Text style={styles.timeHeader}>Time Label</Text>
        <View style={styles.timeInputRow}>
          <TextInput
            style={styles.timeInputBox}
            value={unlockTime.hour}
            onChangeText={(h) =>
              setState((p) => ({
                ...p,
                unlockTime: { ...p.unlockTime, hour: h },
              }))
            }
            keyboardType="numeric"
            maxLength={2}
          />
          <Text style={styles.timeSeparator}>:</Text>
          <TextInput
            style={styles.timeInputBox}
            value={unlockTime.minute}
            onChangeText={(m) =>
              setState((p) => ({
                ...p,
                unlockTime: { ...p.unlockTime, minute: m },
              }))
            }
            keyboardType="numeric"
            maxLength={2}
          />
          <View style={styles.timePeriodContainer}>
            <TouchableOpacity
              style={[
                styles.timePeriodButton,
                unlockTime.period === "AM" && styles.timePeriodButtonActive,
              ]}
              onPress={() =>
                setState((p) => ({
                  ...p,
                  unlockTime: { ...p.unlockTime, period: "AM" },
                }))
              }
            >
              <Text
                style={[
                  styles.timePeriodText,
                  unlockTime.period === "AM" && styles.timePeriodTextActive,
                ]}
              >
                AM
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.timePeriodButton,
                unlockTime.period === "PM" && styles.timePeriodButtonActive,
              ]}
              onPress={() =>
                setState((p) => ({
                  ...p,
                  unlockTime: { ...p.unlockTime, period: "PM" },
                }))
              }
            >
              <Text
                style={[
                  styles.timePeriodText,
                  unlockTime.period === "PM" && styles.timePeriodTextActive,
                ]}
              >
                PM
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardHeader}>
          Write a message to your future self or loved one.
        </Text>
        <TextInput
          style={styles.messageInput}
          placeholder="Start writing..."
          placeholderTextColor="#A9A3A3"
          multiline
          value={futureMessage}
          onChangeText={(text) =>
            setState((prev) => ({ ...prev, futureMessage: text }))
          }
        />

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.attachmentPreviewContainer}>
            {state.attachedMedia?.map((asset) => (
              <View key={asset.uri} style={styles.previewImageContainer}>
                <Image
                  source={{ uri: asset.uri }}
                  style={styles.previewImage}
                />
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDeleteMedia(asset.uri)}
                >
                  <Text style={styles.deleteButtonText}>×</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>

        {state.audioRecordingUri && (
          <View style={styles.audioStatusContainer}>
            <Text style={styles.audioStatusText}>Audio Message Recorded!</Text>
            <TouchableOpacity onPress={handleDeleteAudio}>
              <Text style={styles.deleteAudioText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.inputToolbar}>
          <TouchableOpacity
            style={styles.toolbarButton}
            onPress={() => pickMedia(ImagePicker.MediaTypeOptions.All)}
          >
            <FontAwesome name="paperclip" size={26} color="#A3A3A3" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.toolbarButton}
            onPress={() => pickMedia(ImagePicker.MediaTypeOptions.Images)}
          >
            <MaterialIcons name="photo" size={26} color="#A3A3A3" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.toolbarButton}
            onPress={isRecording ? stopRecording : startRecording}
          >
            <MaterialIcons
              name="mic"
              size={26}
              color={isRecording ? "#FF3B30" : "#A3A3A3"}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={[styles.card, styles.radioContainer]}>
        <Text style={styles.cardHeader}>Who should see this memory?</Text>
        {visibilityOptions.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={styles.radioOptionBlock}
            onPress={() =>
              setState((prev) => ({ ...prev, visibility: option.value as any }))
            }
          >
            <View style={styles.radioCircle}>
              {visibility === option.value && (
                <View style={styles.radioInner} />
              )}
            </View>
            <View
              style={{ flexDirection: "row", gap: 4, alignItems: "center" }}
            >
              <Text style={styles.radioText}>{option.label}</Text>
              <Text style={styles.radioSubtitle}>{option.subtitle}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.surpriseRow}>
        <View style={styles.surpriseTextContainer}>
          <Text style={styles.surpriseTitle}>Make this a surprise</Text>
        </View>
        <View style={{ transform: [{ scale: 1.2 }] }}>
          <Switch
            trackColor={{ false: "#646464", true: "#B4B4B4" }}
            thumbColor="white"
            onValueChange={(value) =>
              setState((prev) => ({ ...prev, isSurprise: value }))
            }
            value={isSurprise}
          />
        </View>
      </View>
    </View>
  );
};

export default Step3Rules;

const styles = StyleSheet.create({
  stepContainer: { paddingTop: 10 },
  screenTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "500",
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
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 10,
  },
  calendarCard: {
    backgroundColor: "#464646",
    borderRadius: 12,
    marginHorizontal: 6,
    marginBottom: 15,
    padding: 10,
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingTop: 5,
    marginBottom: 15,
  },
  calendarMonth: { color: "white", fontSize: 18, fontWeight: "500" },
  calendarNav: { color: "white", fontSize: 20, paddingHorizontal: 10 },
  calendarRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 8,
  },
  dayOfWeek: {
    color: "#B5BEC6",
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
  },
  dateCellSelected: { backgroundColor: "#B4B4B4" },
  dateCellToday: {
    borderWidth: 1,
    borderColor: "#D4D4D4",
    borderRadius: cellWidth / 2,
  },
  dateTextCalendar: { color: "#FFFFFF", fontSize: 14, fontWeight: "400" },
  dateTextToday: { color: "#D4D4D4" },
  dateTextSelected: { color: "#444444" },

  timeInputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  timeContainer: {
    // borderRadius: 12,
    padding: 10,
    marginBottom: 15,
  },
  timeHeader: {
    color: "#FFFFFF",
    marginBottom: 10,
    fontSize: 19,
    fontWeight: 500,
  },
  timeInputBox: {
    backgroundColor: "white",
    borderRadius: 8,
    width: 50,
    height: 45,
    textAlign: "center",
    fontSize: 18,
    color: "#333",
  },
  timeSeparator: {
    fontSize: 24,
    color: "#333",
    fontWeight: "bold",
  },
  timePeriodContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 8,
    height: 45,
    marginLeft: 7,
    // padding: 2,
  },
  timePeriodButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  timePeriodButtonActive: { backgroundColor: "#2196F3" },
  timePeriodText: { fontSize: 14, fontWeight: 500, color: "#A9A9A9" },
  timePeriodTextActive: { color: "white" },

  messageInput: {
    // backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingTop: 12,
    minHeight: 120,
    textAlignVertical: "top",
    fontSize: 15,
    color: "#666666",
  },
  inputToolbar: {
    flexDirection: "row",
    paddingTop: 10,
    paddingHorizontal: 5,
    gap: 15,
    borderTopWidth: 1,
    borderTopColor: "#DCDCDC",
    marginTop: 10,
  },
  toolbarButton: {
    padding: 5,
  },
  attachmentPreviewContainer: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  previewImageContainer: {
    position: "relative",
  },
  previewImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  deleteButton: {
    position: "absolute",
    top: -5,
    right: 5,
    backgroundColor: "rgba(0,0,0,0.6)",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
    lineHeight: 20,
  },
  audioStatusContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 5,
    marginBottom: 10,
  },
  audioStatusText: {
    color: "#34A853",
    fontWeight: "500",
  },
  deleteAudioText: {
    color: "#FF3B30",
    fontWeight: "500",
  },
  radioContainer: {
    paddingTop: 16,
    paddingBottom: 25,
  },
  radioOptionBlock: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 10,

    // borderBottomWidth: 1,
    // borderBottomColor: "#D1D1D1",
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
    marginTop: 2,
  },
  radioInner: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: "#666666",
  },
  radioText: { color: "#666666", fontSize: 15, fontWeight: "500" },
  radioSubtitle: { color: "#888888", fontSize: 12, marginTop: 2 },
  surpriseRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 15,
  },
  surpriseTextContainer: { flex: 1, paddingLeft: 5, marginRight: 10 },
  surpriseTitle: { color: "#FFFFFF", fontSize: 16, fontWeight: "500" },
});
