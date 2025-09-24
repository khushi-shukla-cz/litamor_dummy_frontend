import BottomNavigation from '@/components/bottomNavigation';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

interface Conversation {
  id: number;
  name: string;
  message: string;
  time: string;
  avatar: string;
  isOnline: boolean;
  hasPin: boolean;
  unreadCount: number;
}

const MessagesScreen = () => {
  const handleConversationPress = (conversation: Conversation) => {
    router.push({
      pathname: '/chatScreen',
      params: {
        userId: conversation.id.toString(),
        userName: conversation.name,
        userAvatar: conversation.avatar,
        isOnline: conversation.isOnline.toString()
      }
    });
  };

  const conversations: Conversation[] = [
    {
      id: 1,
      name: "Sebastian Rudiger",
      message: "Chai, always! What about you?",
      time: "09:32 PM",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      isOnline: true,
      hasPin: true,
      unreadCount: 0
    },
    {
      id: 2,
      name: "Sebastian Rudiger",
      message: "Sebastian is typing...",
      time: "",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      isOnline: false,
      hasPin: false,
      unreadCount: 1
    },
    {
      id: 3,
      name: "Sebastian Rudiger", 
      message: "Sebastian is typing...",
      time: "",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      isOnline: false,
      hasPin: false,
      unreadCount: 2
    }
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      
      <View className="px-4 py-3 mt-5">
        <View className="bg-gray-100 rounded-full px-4 py-3 flex-row items-center">
          <Ionicons name="search" size={20} color="#666" />
          <Text className="text-gray-500 text-base ml-3">Search</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-4">
        {conversations.map((conversation) => (
          <TouchableOpacity 
            key={conversation.id} 
            className="flex-row items-center py-4 border-b border-gray-100"
            onPress={() => handleConversationPress(conversation)}
          >
            <View className="relative mr-3">
              <Image 
                source={{ uri: conversation.avatar }}
                className="w-12 h-12 rounded-full"
              />
              {conversation.isOnline && (
                <View className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              )}
            </View>

            <View className="flex-1">
              <View className="flex-row items-center justify-between mb-1">
                <View className="flex-row items-center flex-1">
                  <Text className="font-semibold text-black text-base" numberOfLines={1}>
                    {conversation.name}
                  </Text>
                  {conversation.hasPin && (
                    <Ionicons name="pin" size={16} color="#666" style={{ marginLeft: 8 }} />
                  )}
                </View>
                {conversation.time && (
                  <Text className="text-xs text-gray-500 ml-2">
                    {conversation.time}
                  </Text>
                )}
              </View>
              <View className="flex-row items-center justify-between">
                <Text 
                  className={`text-sm flex-1 ${
                    conversation.message.includes('typing') ? 'text-gray-500 italic' : 'text-gray-600'
                  }`}
                  numberOfLines={1}
                >
                  {conversation.message}
                </Text>
                {conversation.unreadCount > 0 && (
                  <View className="ml-2 bg-gray-500 rounded-full w-5 h-5 items-center justify-center">
                    <Text className="text-white text-xs">
                      {conversation.unreadCount}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <BottomNavigation activeTab="Message" onTabPress={(tab) => console.log(`Navigating to ${tab}`)} />
    </SafeAreaView>
  );
};

export default MessagesScreen;