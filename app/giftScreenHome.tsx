// app/GiftStoreScreen.tsx
import { Feather } from "@expo/vector-icons";
import Icon from '@expo/vector-icons/MaterialIcons';
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, Image, ImageBackground, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import LeatherWallet from "../assets/images/leather-wallet.png";
import Rose from "../assets/images/rose-bouqet.png";
import SpaCard from "../assets/images/spa-card.png";
import Watch from "../assets/images/watch.jpg";
import BottomNavigation from "../components/bottomNavigation";
import { useCartContext } from "./context/CartContext";
import { useWishlistContext } from "./context/WishlistContext";

// Data
const categories = ["All", "Friends", "Trending", "Birthday", "Gift card", "for him"];

const products = [
  {
    id: "1",
    title: "Leather wallet",
    price: 1400,
    originalPrice: 1600,
    category: "Trending",
    image: LeatherWallet,
  },
  {
    id: "2",
    title: "Spa Gift Card",
    price: 1400,
    originalPrice: 1500,
    category: "Gift card",
    image: SpaCard,
  },
  {
    id: "3",
    title: "Rose bouquet",
    price: 1400,
    originalPrice: 1800,
    category: "Birthday",
    image: Rose,
  },
  {
    id: "4",
    title: "Watch",
    price: 1400,
    originalPrice: 1800,
    category: "for him",
    image: Watch,
  },
  {
    id: "5",
    title: "Leather wallet",
    price: 1400,
    originalPrice: 1600,
    category: "Friends",
    image: LeatherWallet,
  },
  {
    id: "6",
    title: "Spa Gift Card",
    price: 1400,
    originalPrice: 1500,
    category: "Gift card",
    image: SpaCard,
  },
];



export default function GiftStoreScreen() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeTab, setActiveTab] = useState("Home");
  const [search, setSearch] = useState("");
  const [filterVisible, setFilterVisible] = useState(false);
  const { wishlisted, toggleWishlist } = useWishlistContext();
  const { getCartItemCount } = useCartContext();
  const router = useRouter();

    const bannerImage = Watch;

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === "All" ||
      p.category?.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch = p.title
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView className="flex-1 bg-[#C6C3BF]">
      <ScrollView
        className="flex-1 px-4 pb-30"
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        {/* Header */}
        <View className="pt-2 flex-row justify-between items-center">
          <View>
            <Text className="text-xl font-bold text-gray-700">
              Find the Perfect Gift
            </Text>
            <Text className="text-sm text-gray-600">
              Skip the clichés. Go for something real.
            </Text>
          </View>
          <View className="flex-row items-center gap-4">
            <TouchableOpacity 
              onPress={() => router.push('/savedGifts')}
              className="relative"
            >
              <Feather name="heart" size={24} color="#333" />
              {wishlisted.length > 0 && (
                <View className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
                  <Text className="text-white text-xs font-bold">
                    {wishlisted.length}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => router.push('/myCart')}
              className="relative"
            >
              <Feather name="shopping-cart" size={24} color="#333" />
              {getCartItemCount() > 0 && (
                <View className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
                  <Text className="text-white text-xs font-bold">
                    {getCartItemCount()}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View className="flex-row items-center  gap-1 justify-between">
          <View className="flex-1 flex-row items-center bg-[#666666] rounded-xl px-4 py-3 mt-4">
            <Feather name="search" size={20} color="white" className="mr-2" />
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search gifts..."
              placeholderTextColor="white"
              className="flex-1 ml-2 text-gray-200"
              style={{ padding: 0 }}
            />
          </View>

          <TouchableOpacity onPress={() => setFilterVisible(true)}>
            <View className="gap-1 rounded-xl bg-[#666666] px-4 py-4 mt-4 items-center  ">
              <View className="h-0.5 w-5 bg-white rounded-full" />
              <View className="h-0.5 w-4 bg-white rounded-full" />
              <View className="h-0.5 w-3 bg-white rounded-full" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Banner */}
        <TouchableOpacity
          onPress={() => console.log("Banner clicked")}
          className="mt-4 rounded-2xl overflow-hidden h-40"
        >
          <ImageBackground
            source={bannerImage}
            className="flex-1 justify-center px-1"
            resizeMode="cover"
          >
            <View className="p-4 rounded-lg">
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
                className={`py-2 rounded-xl px-6 border border-gray-400 mr-2 mb-2 items-center ${
                  cat === selectedCategory ? "bg-[#666666]" : "bg-[#C6C3BF]"
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
        <View className="mt-4">
          <FlatList
            data={filteredProducts}
            numColumns={2}
            scrollEnabled={false}
            columnWrapperStyle={{
              justifyContent: "space-between",
              marginBottom: 20,
            }}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => router.push(`/product/${item.id}` as any)}
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
                   onPress={() => toggleWishlist({
                     id: item.id,
                     name: item.title,
                     price: item.price,
                     originalPrice: item.originalPrice,
                     image: item.image,
                   })}
                   style={{
                     position: 'absolute',
                     top: 12,
                     right: 12,
                     backgroundColor: 'rgba(255, 255, 255, 0.9)',
                     borderRadius: 20,
                     padding: 8,
                     elevation: 2,
                     shadowColor: '#000',
                     shadowOffset: {
                       width: 0,
                       height: 1,
                     },
                     shadowOpacity: 0.2,
                     shadowRadius: 2,
                   }}
                 >
                   <Icon
                     name={wishlisted.includes(item.id) ? 'favorite' : 'favorite-border'}
                     size={20}
                     color={wishlisted.includes(item.id) ? '#444241' : '#666'}
                   />
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

      {/* Filter Modal */}
      <Modal
        isVisible={filterVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={500}
        animationOutTiming={500}
        backdropOpacity={0}
        style={{ justifyContent: "flex-end", margin: 0 }}
        onBackdropPress={() => setFilterVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: "100%",
              backgroundColor: "#fff",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 15,
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                Filter Options
              </Text>
              <TouchableOpacity
                onPress={() => setFilterVisible(false)}
                style={{
                  backgroundColor: "#ef4444",
                  borderRadius: 50,
                  padding: 5,
                }}
              >
                <Feather name="x" size={16} color="#fff" />
              </TouchableOpacity>
            </View>

            {/* Example filter controls */}
            <Text style={{ marginBottom: 10, fontWeight: "600" }}>
              Select Category:
            </Text>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                onPress={() => {
                  setSelectedCategory(cat);
                  setFilterVisible(false);
                }}
                style={{
                  paddingVertical: 6,
                  paddingHorizontal: 12,
                  marginBottom: 10,
                  backgroundColor:
                    selectedCategory === cat ? "#4B5563" : "#E5E7EB",
                  borderRadius: 8,
                }}
              >
                <Text
                  style={{
                    color: selectedCategory === cat ? "#F9FAFB" : "#374151",
                    fontWeight: "500",
                  }}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={{
                marginTop: 20,
                backgroundColor: "#2563EB",
                paddingVertical: 10,
                borderRadius: 8,
                alignItems: "center",
              }}
              onPress={() => {
                setSelectedCategory("All");
                setSearch("");
                setFilterVisible(false);
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "700" }}>
                Reset Filters
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation */}
      <BottomNavigation 
        activeTab={activeTab} 
        onTabPress={(tabName: string) => {
          setActiveTab(tabName);
          console.log(`Nav: ${tabName}`);
        }} 
      />
    </SafeAreaView>
  );
}
