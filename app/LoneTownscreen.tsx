import BottomNavigation from "@/components/bottomNavigation";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import {
  BackHandler,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../components/header";
import ProfileCard from "../components/profileCard";
import SuggestionCard from "../components/suggestionCard";
import { aishaData, liamData, simranData, User } from "../mockData/loneTownData";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = React.useState("Home");

  const [isPremium, setIsPremium] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState<User | null>(
    null
  );
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);

  const onSuggestionPress = (user: User) => {
    if (isPremium) {
      setSelectedSuggestion(user);
      setIsProfileExpanded(false); // Collapse card when viewing a new profile
    }
  };

  const goBack = () => {
    setSelectedSuggestion(null);
    return true; // Prevent exiting the app
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (selectedSuggestion) {
          return goBack();
        }
        return false;
      };
      const subscription = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
      return () => subscription.remove();
    }, [selectedSuggestion])
  );

  const displayedUser = selectedSuggestion || aishaData;
  // 1. Dynamically filter the suggestions to exclude the currently displayed user
  const suggestions = [simranData, liamData, aishaData].filter(
    (user) => user.name !== displayedUser.name
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 60 }}
        >
          <Header isPremium={isPremium} />

          <View style={styles.toggleContainer}>
            <Text style={styles.toggleLabel}>Default User</Text>
            <Switch
              trackColor={{ false: "#BDBDBD", true: "#ffc1d5" }}
              thumbColor={isPremium ? "#E91E63" : "#757575"}
              onValueChange={() => setIsPremium((prev) => !prev)}
              value={isPremium}
            />
            <Text style={styles.toggleLabel}>Premium User</Text>
          </View>

          <Text style={styles.screenDescription}>
            One step closer to finding your perfect connection
          </Text>

          <View style={isProfileExpanded ? styles.profileCardExpanded : null}>
            <ProfileCard
              user={displayedUser}
              isPremium={isPremium}
              onToggleExpand={setIsProfileExpanded}
            />
          </View>

          {/* 2. Remove the '!selectedSuggestion' condition */}
          {!isProfileExpanded && (
            <>
              <Text style={styles.suggestionsHeader}>
                You may be Interested
              </Text>
              <View style={styles.suggestionsContainer}>
                {suggestions.map((user) => (
                  <TouchableOpacity
                    key={user.name}
                    onPress={() => onSuggestionPress(user)}
                    disabled={!isPremium}
                    style={{ flex: 1 }}
                  >
                    <SuggestionCard user={user} isBlurred={!isPremium} />
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}
        </ScrollView>
        <BottomNavigation
          activeTab={activeTab}
          onTabPress={(tabName) => {
            setActiveTab(tabName);
            navigation.navigate(tabName as never); // type-safety fix for TS
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, marginTop: 40, backgroundColor: "#FFFFFF" },
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  toggleLabel: { marginHorizontal: 10, fontSize: 14, color: "#616161" },
  screenDescription: {
    textAlign: "center",
    color: "#000000",
    fontWeight: "600",
    marginBottom: 20,
    paddingHorizontal: 1,
  },
  suggestionsHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  suggestionsContainer: {
    flexDirection: "row",
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  profileCardExpanded: {
    marginBottom: 30,
  },
});

export default HomeScreen;