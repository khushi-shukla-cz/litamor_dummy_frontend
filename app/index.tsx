import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

export default function HomePage() {
  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <StatusBar style="auto" />
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="px-6 py-8">
          <Text className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Gift Galaxy
          </Text>
          <Text className="text-lg text-gray-600 dark:text-gray-300">
            Discover amazing gifts for everyone
          </Text>
        </View>

        {/* Hero Section */}
        <View className="px-6 mb-8">
          <View className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-3xl p-6">
            <View className="flex-row items-center justify-between">
              <View className="flex-1">
                <Text className="text-white text-2xl font-bold mb-2">
                  Special Offers
                </Text>
                <Text className="text-white/90 text-base mb-4">
                  Get up to 50% off on selected items
                </Text>
                <TouchableOpacity className="bg-white/20 rounded-full px-6 py-3 self-start">
                  <Text className="text-white font-semibold">Shop Now</Text>
                </TouchableOpacity>
              </View>
              <View className="ml-4">
                <Ionicons name="gift" size={60} color="white" />
              </View>
            </View>
          </View>
        </View>

        {/* Categories */}
        <View className="px-6 mb-8">
          <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Categories
          </Text>
          <View className="flex-row flex-wrap gap-3">
            {[
              { name: 'Electronics', icon: 'phone-portrait', color: 'bg-blue-500' },
              { name: 'Fashion', icon: 'shirt', color: 'bg-pink-500' },
              { name: 'Home & Garden', icon: 'home', color: 'bg-green-500' },
              { name: 'Sports', icon: 'fitness', color: 'bg-orange-500' },
              { name: 'Books', icon: 'library', color: 'bg-purple-500' },
              { name: 'Toys', icon: 'game-controller', color: 'bg-red-500' },
            ].map((category, index) => (
              <TouchableOpacity
                key={index}
                className={`${category.color} rounded-2xl p-4 w-[calc(50%-6px)] items-center`}
              >
                <Ionicons name={category.icon as any} size={32} color="white" />
                <Text className="text-white font-semibold mt-2 text-center">
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Featured Products */}
        <View className="px-6 mb-8">
          <Text className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Products
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
            {[
              { name: 'Wireless Headphones', price: '$99.99', rating: 4.8 },
              { name: 'Smart Watch', price: '$199.99', rating: 4.6 },
              { name: 'Laptop Stand', price: '$49.99', rating: 4.9 },
              { name: 'Coffee Maker', price: '$79.99', rating: 4.7 },
            ].map((product, index) => (
              <TouchableOpacity
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-4 mr-4 w-48 shadow-sm"
              >
                <View className="bg-gray-100 dark:bg-gray-700 rounded-xl h-32 mb-3 items-center justify-center">
                  <Ionicons name="image" size={40} color="#9CA3AF" />
                </View>
                <Text className="text-gray-900 dark:text-white font-semibold mb-1">
                  {product.name}
                </Text>
                <Text className="text-primary-600 font-bold text-lg mb-1">
                  {product.price}
                </Text>
                <View className="flex-row items-center">
                  <Ionicons name="star" size={16} color="#F59E0B" />
                  <Text className="text-gray-600 dark:text-gray-300 ml-1">
                    {product.rating}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Bottom Spacing */}
        <View className="h-8" />
      </ScrollView>
    </SafeAreaView>
  );
} 