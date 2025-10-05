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
        
        {/* Buttons Container with consistent width */}
        <View className="w-full max-w-xs">
          <TouchableOpacity
            className="bg-pink-500 px-8 rounded-xl p-3 mb-4 shadow-lg active:bg-pink-600 w-full"
            onPress={() => router.push('/aboutYou' as any)}
            activeOpacity={0.8}
          >
            <Text className="text-white text-lg font-bold text-center">Singles Onboarding</Text>
          </TouchableOpacity>
          <TouchableOpacity
          className="bg-white/80 backdrop-blur-sm rounded-2xl px-10 py-4 shadow-lg border border-gray-200/50"
          onPress={() => router.push("./LoneTownscreen")}
          activeOpacity={0.8}
        >
          <Text className="text-gray-800 font-semibold text-lg text-center">
            Lone Town
          </Text>
        </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}