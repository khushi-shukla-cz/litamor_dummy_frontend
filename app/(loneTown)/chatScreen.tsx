import BottomNavigation from '@/components/bottomNavigation';
import PopupModals from '@/components/PopupModal';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Message {
  id: number;
  text: string;
  time: string;
  isSent: boolean;
}

const ChatScreen = () => {
  // Get params from Expo Router
  const { userId, userName, userAvatar, isOnline } = useLocalSearchParams();

  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const [popupType, setPopupType] = useState<'unmatch' | 'block' | 'pin' | null>(null);
  const [message, setMessage] = useState('');

  // Sample conversation messages
  const messages: Message[] = [
    {
      id: 1,
      text: "Sooo... do you prefer coffee ☕ or chai 🍵?",
      time: "09:32 PM",
      isSent: true
    },
    {
      id: 2,
      text: "Chai, always! What about you?",
      time: "10:32 PM",
      isSent: false
    },
    {
      id: 3,
      text: "Haha same, we're already off to a good start 😊",
      time: "11:32 PM",
      isSent: true
    }
  ];

  const handleOptionsMenu = () => {
    setShowOptionsMenu(!showOptionsMenu);
  };

  const handleOptionSelect = (option: string) => {
    setShowOptionsMenu(false);
    switch (option) {
      case 'unmatch':
        setPopupType('unmatch');
        break;
      case 'block':
        setPopupType('block');
        break;
      case 'pin':
        setPopupType('pin');
        break;
      default:
        console.log(`Selected: ${option}`);
    }
  };

  const handlePopupUndo = () => {
    setPopupType(null);
  };

  const handlePopupOkay = () => {
    setPopupType(null);
    if (popupType === 'unmatch') {
      router.back();
    }
  };

  const handleBackPress = () => {
    router.back();
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Here you would typically send the message to your backend
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-4 mt-5 bg-white">
        <TouchableOpacity onPress={handleBackPress}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <View className="flex-row items-center flex-1 ml-3">
          <View className="w-10 h-10 rounded-full bg-gray-300 mr-3">
            {userAvatar ? (
              <Image
                source={{ uri: userAvatar as string }}
                className="w-full h-full rounded-full"
              />
            ) : (
              <View className="w-full h-full rounded-full bg-gray-300" />
            )}
          </View>
          <View>
            <Text className="text-lg font-semibold text-black">
              {userName || 'Sebastian Rudiger'}
            </Text>
            <Text className={`text-sm ${isOnline === 'true' ? 'text-green-500' : 'text-gray-500'}`}>
              {isOnline === 'true' ? 'Online' : 'Offline'}
            </Text>
          </View>
        </View>

        <View className="flex-row items-center">
          <TouchableOpacity className="mr-4">
            <Ionicons name="videocam-outline" size={24} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity className="mr-4">
            <Ionicons name="call-outline" size={24} color="#666" />
          </TouchableOpacity>
          <View className="relative">
            <TouchableOpacity onPress={handleOptionsMenu}>
              <Entypo name="dots-three-vertical" size={24} color="#666" />
            </TouchableOpacity>

            {/* Options Menu */}
            {showOptionsMenu && (
              <View className="absolute top-8 right-0 bg-white rounded-2xl shadow-lg py-2 w-48 z-50">
                <TouchableOpacity
                  className="flex-row items-center px-4 py-3"
                  onPress={() => handleOptionSelect('unmatch')}
                >
                  <Ionicons name="close" size={20} color="#666" />
                  <Text className="text-gray-700 text-base ml-3">Unmatch</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-row items-center px-4 py-3"
                  onPress={() => handleOptionSelect('pin')}
                >
                  <Ionicons name="pin" size={20} color="#666" />
                  <Text className="text-gray-700 text-base ml-3">Pin</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-row items-center px-4 py-3"
                  onPress={() => handleOptionSelect('mute')}
                >
                  <Ionicons name="volume-mute" size={20} color="#666" />
                  <Text className="text-gray-700 text-base ml-3">Mute</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-row items-center px-4 py-3"
                  onPress={() => handleOptionSelect('block')}
                >
                  <Ionicons name="warning" size={20} color="#666" />
                  <Text className="text-gray-700 text-base ml-3">Block & Report</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Chat Messages Area */}
      <ScrollView
        className="flex-1 bg-[#E6E6E6] px-4"
        showsVerticalScrollIndicator={false}
        onTouchStart={() => setShowOptionsMenu(false)}
      >
        <View className="py-4">
          {messages.map((msg) => (
            <View key={msg.id} className={`mb-4 ${msg.isSent ? 'items-end' : 'items-start'}`}>
              <View
                className={`px-4 py-3 max-w-xs rounded-2xl ${msg.isSent
                    ? 'bg-[#666666] rounded-br-none'
                    : 'bg-white rounded-bl-none'
                  }`}
              >
                <Text className={`text-base ${msg.isSent ? 'text-white' : 'text-gray-800'}`}>
                  {msg.text}
                </Text>
              </View>
              <Text className={`text-xs text-gray-500 mt-1 ${msg.isSent ? 'mr-2' : 'ml-2'}`}>
                {msg.time}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View className="bg-[#E6E6E6] pb-20 pt-4 w-full">
        <View className="flex-row items-center px-4">
          <View className="flex-row items-center bg-[#F5F5F5] rounded-full px-4 py-1 flex-1 mr-3 overflow-hidden" style={{ height: 55 }}>
            <TouchableOpacity className="mr-3">
              <Image source={require('../../assets/images/customEmoji.png')} style={{ width: 24, height: 24 }} />
            </TouchableOpacity>

            <TextInput
              className="flex-1 text-base text-gray-600"
              placeholder="Message"
              placeholderTextColor="#666"
              style={{
                paddingVertical: 8,
                backgroundColor: 'transparent',
                borderWidth: 0,
              }}
            />
          </View>
          <TouchableOpacity className="bg-[#D9D9D9] rounded-full items-center justify-center mr-0" style={{ width: 52, height: 52 }}>
            <Ionicons name="mic-outline" size={24} color="#666666" />
          </TouchableOpacity>
        </View>
      </View>
      {/* Bottom Navigation */}
      <BottomNavigation activeTab="Message" onTabPress={(tab) => console.log(`Navigating to ${tab}`)} />

      {/* Popup Modals */}
      <PopupModals
        type={popupType}
        visible={popupType !== null}
        onUndo={handlePopupUndo}
        onOkay={handlePopupOkay}
      />
    </SafeAreaView>
  );
};

export default ChatScreen;