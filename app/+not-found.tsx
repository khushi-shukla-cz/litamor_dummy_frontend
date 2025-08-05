import { Text, View } from 'react-native';

export default function NotFound() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-lg font-bold text-red-500">Page Not Found</Text>
    </View>
  );
}
