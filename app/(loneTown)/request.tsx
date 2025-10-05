import BottomNavigation from '@/components/bottomNavigation';
import PopupModals from '@/components/PopupModal';
import { Entypo, Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  Modal,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const ChatScreen = () => {
  // Get params from Expo Router
  const { userId, userName, userAvatar, isOnline } = useLocalSearchParams();

  const [showRequest, setShowRequest] = useState(true);
  const [showOptionsMenu, setShowOptionsMenu] = useState(false);
  const [popupType, setPopupType] = useState<'unmatch' | 'block' | 'pin' | null>(null);
  const [showUnmatchedPopup, setShowUnmatchedPopup] = useState(false);


  const handleYesMatch = () => {
    setShowRequest(false);
  };

  const handleNoThanks = () => {
    // setPopupType('unmatch');
    setShowUnmatchedPopup(true);  // ✅ this opens the UnmatchedPopup

  };

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
      setShowRequest(false);
      // Navigate back to messages
      router.back();
    }
  };

  const handleBackPress = () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1">
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

      {/* Main Content */}
      <View className="flex-1 bg-[#E6E6E6]" onTouchStart={() => setShowOptionsMenu(false)}>
        {/* Chat Messages Area */}
        <View className="flex-1 pt-4 px-4">
          {/* Received message */}
          <View className="mb-4">
            <View className="bg-white rounded-2xl rounded-bl-none px-4 py-3 self-start max-w-xs">
              <Text className="text-gray-800 text-base">
                Wanna send me a voice note instead of typing? 🎤
              </Text>
            </View>
            <Text className="text-xs text-gray-500 mt-1 self-start ml-1">10:32 PM</Text>
          </View>
        </View>

        {/* Conditional Request Notification or Message Input */}
        {showRequest ? (
          /* Request Notification - Full Width */
          <View className="bg-white rounded-t-3xl pb-20 pt-4 w-full">
            <View className="items-center mb-8 px-4">
              <Text className="text-black text-lg mb-4 font-medium">💌 New Chat Request from {userName || 'Sebastian'}</Text>
              <Text className="text-gray-600 text-center text-base leading-6">
                Do you wish to match with <Text className="font-semibold">{userName || 'Sebastian'}</Text> to continue the conversation?
              </Text>
            </View>

            <View className="flex-row justify-center mb-4 px-4">
              <TouchableOpacity
                className="bg-[#666666] rounded-full px-10 py-4 mr-4"
                onPress={handleYesMatch}
              >
                <Text className="text-white text-base font-medium">Yes, Match 💕</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="bg-[#D9D9D9] rounded-full px-10 py-4"
                onPress={handleNoThanks}
              >
                <Text className="text-gray-700 text-base font-medium">No, Thanks</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          /* Message Input Area - Shows after matching */
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
        )}
      </View>


      <UnmatchedPopup
        visible={showUnmatchedPopup}          // 👈 state that controls visibility
        onClose={() => setShowUnmatchedPopup(false)}
        onLoveLetter={() => {
          setShowUnmatchedPopup(false);
          // router.push("/loveLetter");         // 👈 navigate to LoveLetter screen
        }}
        onNoThanks={() => setShowUnmatchedPopup(false)}
      />

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

type UnmatchedPopupProps = {
  visible: boolean;
  onClose: () => void;
  onLoveLetter: () => void;
  onNoThanks: () => void;
};

const UnmatchedPopup: React.FC<UnmatchedPopupProps> = ({ visible, onClose, onLoveLetter, onNoThanks }) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.popupWrapper}>
          <View style={styles.popup}>
            {/* Main Content */}
            <View style={styles.content}>
              <Text style={styles.mainText}>💔 Oops...They've unmatched you.</Text>

              <Text style={styles.subText}>
                RIP to this chat 💀... shoot your shot again with a Love Letter 💌
              </Text>
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.loveLetterButton}
                onPress={onLoveLetter}
              >
                <Text style={styles.loveLetterText}>Love Letter 💌</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.noThanksButton}
                onPress={onNoThanks}
              >
                <Text style={styles.noThanksText}>No, Thanks</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  popup: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 20,
  },

  // Content Styles
  content: {
    alignItems: 'center',
    marginBottom: 32,
  },
  mainText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    marginBottom: 12,
  },
  subText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 8,
  },

  // Button Styles
  popupWrapper: {
    position: 'absolute',
    bottom: 67, // adjust this so it sits above BottomNavigation
    left: 0,
    right: 0,
    zIndex: 1000,
  },

  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  loveLetterButton: {
    flex: 1,
    backgroundColor: '#666666',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
  },
  loveLetterText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  noThanksButton: {
    flex: 1,
    backgroundColor: '#D9D9D9',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
  },
  noThanksText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
  },


});