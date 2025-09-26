import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CapsuleCard from "../../components/capsuleCard";
import SVGCurvedRectangle from "../../components/curvedRectangle";
import { MOCK_CAPSULES } from "../../mockData/data";
import { Capsule } from "../../types/type";
const HomeScreen: React.FC = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("Locked Capsules");
  const [searchText, setSearchText] = useState("");
  const [showTimeline, setShowTimeline] = useState(false);

  const filteredCapsules = MOCK_CAPSULES.filter((capsule: Capsule) => {
    const matchesTab =
      (selectedTab === "Locked Capsules" && capsule.date === "In 2 Days") ||
      (selectedTab === "Unlocked" && capsule.date === "Unlocked") ||
      (selectedTab === "Opened" && capsule.date === "Opened");
    const matchesSearch =
      capsule.title.toLowerCase().includes(searchText.toLowerCase()) ||
      capsule.status.toLowerCase().includes(searchText.toLowerCase());
    return matchesTab && matchesSearch;
  });
  const STATUSBAR_HEIGHT =
    Platform.OS === "android" ? StatusBar.currentHeight : 0;
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="#7C7C7C"
        barStyle="light-content"
      />
      <SafeAreaView
        style={{
          backgroundColor: "Transparent",
          paddingTop: STATUSBAR_HEIGHT,
        }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <SVGCurvedRectangle height={320} color={"#7C7C7C"}>
            {/* Search and Filter */}
            <View style={styles.container}>
              <View style={styles.header}>
                <View style={styles.searchBar}>
                  <Text style={styles.searchIcon}>
                    <MaterialIcons name="search" size={24} color="#FFFFFF" />
                  </Text>
                  <TextInput
                    style={styles.searchInput}
                    placeholder="Search for Memory Capsule"
                    placeholderTextColor="#FFFFFF"
                    value={searchText}
                    onChangeText={setSearchText}
                  />
                </View>
                <TouchableOpacity style={styles.filterButton}>
                  <Text style={styles.filterIcon}>
                    <Ionicons name="filter" size={24} color="#FFFFFF" />
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Upcoming Capsule Section */}
              <View style={styles.upcomingCard}>
                <Image
                  source={require("../../assets/images/rectangle.jpg")}
                  style={styles.upcomingImage}
                  resizeMode="cover"
                />
                <View style={styles.darkOverlay} />
                <View style={styles.upcomingBorder} />
                <View style={styles.upcomingDetails}>
                  <Text style={styles.upcomingLabel}>Upcoming</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Text style={styles.upcomingTitle}>
                      Graduation Celebration
                    </Text>
                    <Text style={styles.upcomingMetaText}> 🔒 20 May 2026</Text>
                  </View>

                  <View style={styles.upcomingMetaRow}>
                    <Text style={styles.upcomingMetaIcon}>👥</Text>
                    <Text style={styles.upcomingMetaText}>
                      Shared with Alex
                    </Text>
                    <Text style={styles.dot}>·</Text>
                  </View>
                </View>
              </View>
            </View>
          </SVGCurvedRectangle>
          <View style={styles.containerTwo}>
            {/* Capsule Category Tabs */}
            <View style={styles.tabContainer}>
              {["Locked Capsules", "Unlocked", "Opened"].map((tab) => (
                <TouchableOpacity
                  key={tab}
                  style={styles.tab}
                  onPress={() => setSelectedTab(tab)}
                >
                  <Text
                    style={[
                      styles.tabText,
                      selectedTab === tab && styles.selectedTabText,
                    ]}
                  >
                    {tab}
                  </Text>
                  {selectedTab === tab && <View style={styles.underline} />}
                </TouchableOpacity>
              ))}
            </View>

            {/* Capsules List */}
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={filteredCapsules}
              renderItem={({ item }) => <CapsuleCard capsule={item} />}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.capsulesList}
              style={styles.capsulesContainer}
            />

            {/* Timeline Button - Initially just shows "View timeline >" */}
            {!showTimeline && (
              <TouchableOpacity
                style={styles.timelineButton}
                onPress={() => setShowTimeline(true)}
                activeOpacity={0.7}
              >
                <Text style={styles.timelineButtonText}>View timeline</Text>
              </TouchableOpacity>
            )}

            {/* Timeline Card - Shows when expanded */}
            {showTimeline && (
              <TouchableOpacity
                style={styles.timelineCard}
                onPress={() => setShowTimeline(false)}
                activeOpacity={0.7}
              >
                {/* <View style={styles.timelineIconContainer}>
                  <Text style={styles.timelineIcon}></Text>
                </View> */}
                <View style={styles.timelineInfo}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 8,
                    }}
                  >
                    <Text style={[styles.timelineTitle, styles.timelineIcon]}>
                      🕐 Memory Timeline
                    </Text>
                    <View style={styles.timelineArrowContainer}>
                      <Text style={styles.timelineArrow}>View timeline </Text>
                    </View>
                  </View>
                  <Text style={styles.timelineSubtitle}>
                    See all your capsules in one place—past, upcoming, and
                    shared.
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
        {/* Floating Action Button */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => {
            router.push("/createCapsule");
          }}
        >
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingTop: 20,
    // marginBottom: -30,
  },
  containerTwo: {
    flex: 1,

    backgroundColor: "#C6C3BF",

    paddingTop: 10,
  },
  scrollContent: {
    flexGrow: 1,

    paddingBottom: 60,
    backgroundColor: "#C6C3BF",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    backgroundColor: "transparent",
    paddingBottom: 10,
    paddingTop: 0,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#444444",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  searchIcon: { fontSize: 18, color: "#b1b1b1", marginRight: 8 },
  searchInput: { flex: 1, fontSize: 15, color: "white", padding: 0, margin: 0 },
  filterButton: {
    backgroundColor: "#444444",
    borderRadius: 8,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  filterIcon: {
    fontSize: 18,
    paddingHorizontal: 4,
    color: "#b1b1b1",
  },

  // Upcoming Section
  upcomingCard: {
    // backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginHorizontal: 15,
    // marginBottom: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    position: "relative",
    height: 200,
  },
  darkOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 1, 0.3)",
    zIndex: 1, // Position overlay above image but below text
  },

  upcomingBorder: {
    position: "absolute",
    // top: 0,
    // left: 0,
    // right: 0,
    // height: 5,
    backgroundColor: "#black",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 2,
  },
  upcomingImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 0,
  },
  upcomingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,1,0.4)",
    zIndex: 1,
  },
  upcomingDetails: {
    position: "absolute",
    bottom: 12,
    left: 12,
    right: 12, // Add right positioning for better layout
    zIndex: 2, // Ensure text is above overlay
    padding: 0, // Remove padding as we're using positioning
  },
  upcomingLabel: {
    position: "absolute",
    bottom: 130,
    backgroundColor: "#fff",
    color: "#353535",
    fontSize: 14,
    fontWeight: "400",
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 3,
    overflow: "hidden",
    alignSelf: "flex-start",

    justifyContent: "flex-end",
    marginBottom: 7,
  },
  upcomingTitle: {
    fontSize: 19,
    fontWeight: "400",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  upcomingMetaRow: { flexDirection: "row", alignItems: "center" },
  upcomingMetaText: { color: "#fff", fontSize: 14, bottom: 3 },
  dot: { color: "#b1b1b1", marginHorizontal: 4 },
  lockIcon: { fontSize: 12, marginHorizontal: 2 },
  upcomingMetaIcon: { marginRight: 3, fontSize: 14, color: "#4FC3F7" },

  // Capsules Tabs
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 0,
    marginBottom: 10,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingVertical: 6,
    position: "relative",
  },
  tabText: {
    color: "#444444",
    fontSize: 15,
    fontWeight: "500",
  },
  selectedTabText: {
    color: "#232323",
    fontWeight: "bold",
  },
  underline: {
    marginTop: 5,
    justifyContent: "flex-start",
    height: 2,
    backgroundColor: "#232323",
    width: 60,

    borderRadius: 2,
  },

  // Capsules List
  capsulesContainer: {
    height: 300,
  },
  capsulesList: {
    paddingHorizontal: 16,
    paddingBottom: 10,
    height: 300,
  },

  // Timeline Button - Initial simple button
  timelineButton: {
    // position: "absolute",
    bottom: 30,
    backgroundColor: "#666666",
    borderRadius: 16,
    paddingHorizontal: 40,
    paddingVertical: 14,
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    flexWrap: "wrap",
    alignSelf: "center",
  },
  timelineButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },

  // Timeline Card (matching the design from image)
  timelineCard: {
    backgroundColor: "#fff",
    borderRadius: 16,

    paddingHorizontal: 20,
    paddingVertical: 16,
    marginHorizontal: 10,
    marginTop: 8,
    marginBottom: 50,
    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  timelineIconContainer: {
    marginRight: 12,
  },
  timelineIcon: {
    fontSize: 18,
  },
  timelineInfo: {
    flex: 1,
  },
  timelineTitle: {
    color: "#444444",
    fontWeight: "500",
    fontSize: 16,
    marginBottom: 4,
  },
  timelineSubtitle: {
    color: "#787878",
    fontSize: 13,
    lineHeight: 18,
  },
  timelineArrowContainer: {
    marginLeft: 8,
  },
  timelineArrow: {
    color: "#787878",
    fontSize: 14,
    fontWeight: "500",
  },

  // Timeline Expanded Content
  timelineExpandedContent: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginTop: -20,
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  timelineItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  timelineDate: {
    fontSize: 15,
    fontWeight: "600",
    color: "#232323",
    marginBottom: 4,
  },
  timelineDescription: {
    fontSize: 14,
    color: "#787878",
  },

  // Floating Action Button (Fixed position)
  fab: {
    position: "absolute",
    bottom: 110,
    right: 20,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#7C7C7C",
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    zIndex: 1000,
  },
  fabText: {
    color: "#fff",
    fontSize: 45,
    fontWeight: "300",
    textAlign: "center",
    lineHeight: 50,
  },
});
