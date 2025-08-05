import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomePage() {
  const router = useRouter();
  
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar style="dark" />
      <View className="flex-1 justify-center items-center px-8">
        {/* Logo */}
        <View className="mb-12 items-center">
          <View className="bg-white rounded-3xl p-6 shadow-sm mb-4">
            <Ionicons name="gift" size={80} color="#8B5CF6" />
          </View>
        </View>
        
        {/* Message */}
        <Text className="text-4xl font-bold text-gray-900 text-center mb-6 leading-tight">
          Choose the perfect gift
        </Text>
        
        {/* Subtitle */}
        <Text className="text-lg text-gray-600 text-center mb-16 px-6 leading-relaxed">
          Discover amazing gifts for everyone you love
        </Text>
        
        {/* Button */}
        <TouchableOpacity 
          className="bg-white/80 backdrop-blur-sm rounded-2xl px-10 py-4 shadow-lg border border-gray-200/50"
          onPress={() => router.push('/giftScreenHome')}
          activeOpacity={0.8}
        >
          <Text className="text-gray-800 font-semibold text-lg text-center">Start Shopping</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
} 