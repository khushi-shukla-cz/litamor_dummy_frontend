import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Data
const categories = [
  "All",
  "Friends",
  "Trending",
  "Birthday",
  "Gift card",
  "for him",
];

const products = [
  {
    id: "1",
    title: "Leather wallet",
    price: 1400,
    originalPrice: 1600,
    image: require("../../assets/images/watch.jpg"),
  },
  {
    id: "2",
    title: "Spa Gift Card",
    price: 1400,
    originalPrice: 1500,
    image: require("../../assets/images/rose-1.jpeg"),
  },
  {
    id: "3",
    title: "Rose bouquet",
    price: 1400,
    originalPrice: 1800,
    image: require("../../assets/images/rose-1.jpeg"),
  },
  {
    id: "4",
    title: "Watch",
    price: 1400,
    originalPrice: 1800,
    image: require("../../assets/images/watch.jpg"),
  },
  {
    id: "5",
    title: "Leather wallet",
    price: 1400,
    originalPrice: 1600,
    image: require("../../assets/images/watch.jpg"),
  },
  {
    id: "6",
    title: "Spa Gift Card",
    price: 1400,
    originalPrice: 1500,
    image: require("../../assets/images/rose-1.jpeg"),
  },
];

// Helper components for bottom navigation
interface TabIconProps {
  name: keyof typeof Feather.glyphMap;
  label: string;
  isFocused: boolean;
  onPress: () => void;
}

const TabIcon = ({ name, label, isFocused, onPress }: TabIconProps) => (
  <TouchableOpacity onPress={onPress} className="items-center p-2">
    <Feather name={name} size={24} color={isFocused ? "#fff" : "#f9fafb"} />
    <Text
      className={`text-xs mt-1 ${isFocused ? "text-white font-bold" : "text-gray-50 font-semibold"}`}
    >
      {label}
    </Text>
  </TouchableOpacity>
);

export default function GiftStoreScreen() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeTab, setActiveTab] = useState("Home");
  // Added state for the wishlist
  const [wishlisted, setWishlisted] = useState<string[]>([]);

  /// banner image
  const bannerImage = require("../../assets/images/watch.jpg");

  // Function to toggle the wishlist state
  const toggleWishlist = (id: string) => {
    setWishlisted((prev: string[]) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#dcdbd9]">
      <ScrollView className="flex-1 px-4 pb-20">
        {/* Header */}
        <View className="pt-2">
          <Text className="text-xl font-bold text-gray-700">
            Find the Perfect Gift
          </Text>
          <Text className="text-sm text-gray-600">
            Skip the clichés. Go for something real.
          </Text>
        </View>

        {/* Search */}
        <TouchableOpacity
          onPress={() => console.log("Search bar clicked")}
          className="flex-row items-center bg-gray-500 rounded-xl px-4 py-3 mt-4"
        >
          <Feather name="search" size={20} color="white" className="mr-2 " />
          <TextInput
            placeholder="Search gifts..."
            placeholderTextColor="white"
            className="flex-1 ml-2 text-gray-200"
            style={{ padding: 0 }}
          />
          <TouchableOpacity
            onPress={() => console.log("Filter button clicked")}
          >
            <Feather name="filter" size={20} color="white" />
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Banner */}
        <TouchableOpacity
          onPress={() => console.log("Banner clicked")}
          className="mt-4 rounded-2xl overflow-hidden h-40 "
        >
          <ImageBackground
            source={bannerImage}
            className="flex-1 justify-center px-1"
            resizeMode="cover"
          >
            <View className=" p-4 rounded-lg">
              <Text className="text-gray-50 text-xl font-2xl">Super Sale</Text>
              <Text className="text-gray-50 text-xl">Discount</Text>
              <Text className="text-gray-50 text-2xl ">Up to 50%</Text>
              <TouchableOpacity
                onPress={() => console.log("Shop now clicked")}
                className="mt-2 bg-gray-50 rounded-xl px-7 py-1 self-start"
              >
                <Text className="text-gray-900 font-semibold text-sm">
                  Shop now
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        {/* Categories */}
        <View className="mt-6">
          <FlatList
            data={categories}
            keyExtractor={(item) => item}
            numColumns={3}
            scrollEnabled={false}
            renderItem={({ item: cat }) => (
              <TouchableOpacity
                key={cat}
                onPress={() => {
                  setSelectedCategory(cat);
                  console.log(`Category: ${cat} selected`);
                }}
                className={` py-2 rounded-xl px-6  border  border-gray-400 mr-2 mb-2 items-center ${
                  cat === selectedCategory ? "bg-gray-600" : "bg-gray-50"
                }`}
              >
                <Text
                  className={`text-sm font-medium ${
                    cat === selectedCategory ? "text-gray-100" : "text-gray-700"
                  }`}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Product Grid */}
        <View className="mt-4 ">
          <FlatList
            data={products}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={{
              justifyContent: "space-between",
              marginBottom: 20,
            }}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => console.log(`Product: ${item.title} clicked`)}
                className="bg-gray-50 rounded-xl w-[48%] shadow"
              >
                <Image
                  source={item.image}
                  resizeMode="cover"
                  style={{
                    width: "100%",
                    height: 140,
                    borderTopLeftRadius: 10,
                    borderTopRightRadius: 10,
                    backgroundColor: "#fff",
                  }}
                />
                {/* Heart Icon with Wishlist Logic */}
                <TouchableOpacity
                  onPress={() => toggleWishlist(item.id)}
                  className={`absolute top-3 right-2 p-2 rounded-full ${wishlisted.includes(item.id) ? "bg-pink-600" : "bg-[#dcdbd9]"}`}
                >
                  <Feather name="heart" size={14} color="#fff" />
                </TouchableOpacity>
                <Text className="text-sm px-2 font-medium mt-2 text-gray-700">
                  {item.title}
                </Text>
                <View className="flex-row items-center px-2 mb-2 mt-1">
                  <Text className="text-base font-bold text-gray-700">
                    ₹ {item.price}
                  </Text>
                  <Text className="text-xs text-gray-600 line-through ml-2">
                    ₹ {item.originalPrice}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="absolute bottom-0 left-0 right-0 bg-[#444444] flex-row justify-around items-center py-1 border-gray-700">
        <TabIcon
          name="home"
          label="Home"
          isFocused={activeTab === "Home"}
          onPress={() => {
            setActiveTab("Home");
            console.log("Nav: Home");
          }}
        />
        <TabIcon
          name="compass"
          label="Explore"
          isFocused={activeTab === "Explore"}
          onPress={() => {
            setActiveTab("Explore");
            console.log("Nav: Explore");
          }}
        />
        <TabIcon
          name="message-circle"
          label="Message"
          isFocused={activeTab === "Message"}
          onPress={() => {
            setActiveTab("Message");
            console.log("Nav: Message");
          }}
        />
        <TabIcon
          name="user"
          label="Profile"
          isFocused={activeTab === "Profile"}
          onPress={() => {
            setActiveTab("Profile");
            console.log("Nav: Profile");
          }}
        />
      </View>
    </SafeAreaView>
  );
}
