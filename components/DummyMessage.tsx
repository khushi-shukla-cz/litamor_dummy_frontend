import React from 'react';
import { Image, Text, View } from 'react-native';

export const DUMMY_MESSAGES = [
  { id: '1', text: 'Hey! How are you?', sender: 'other', timer: '12:40', status: 'sent' },
  { id: '2', text: "I'm good! How about you?", sender: 'me', timer: '12:45', status: 'read' },
  { id: '3', text: "Doing well, just relaxing. 😊", sender: 'other', timer: '12:47', status: 'read' },
  { id: '4', text: "That's great! Any plans for today?", sender: 'me', timer: '12:49', status: 'read' },
  { id: '5', text: "Maybe a walk later. You?", sender: 'other', timer: '12:50', status: 'read' },
  { id: '6', text: "Oh Okay!!!", sender: 'me', timer: '12:50', status: 'delivered' },
  { id: '7', text: "Have a Nice Day!", sender: 'me', timer: '12:50', status: 'sent' },

];

interface DummyMessageProps {
  text: string;
  sender: 'me' | 'other';
  avatarUrl?: string;
  timer: string;
  status: 'sent' | 'delivered' | 'read';

}

export default function DummyMessage({ text, sender, avatarUrl, timer, status }: DummyMessageProps) {
  const isMe = sender === 'me';
  const getDotColor = (dotIndex: 1 | 2): string => {
    if (status === 'delivered') {
      return dotIndex === 1 ? 'bg-pink-400' : 'bg-violet-400';
    }
    if (status === 'read') {
      return 'bg-pink-400';
    }
    if (status === 'sent') {
      return 'bg-violet-400';
    }
    return 'bg-gray-300';
  };
  return (
    <View className={`my-1 flex-row ${isMe ? 'justify-end' : 'justify-start'} items-center`}>
      {/* Avatar for 'other' */}
      {!isMe && (
        <Image
          source={{ uri: avatarUrl || 'https://randomuser.me/api/portraits/men/32.jpg' }}
          className="w-9 h-9 rounded-full mr-2 border-2 border-pink-400"
        />
      )}
      <View className={`my-1 flex-col ${isMe ? 'justify-end' : 'justify-start'}`}>
        <View
          className={`max-w-[100%] px-4 py-2 rounded-2xl shadow-sm ${isMe
            ? 'bg-pink-400 rounded-br-none'
            : 'bg-violet-100 rounded-bl-none'
            }`}
        >
          <Text className={`text-l ${isMe ? 'text-white' : 'text-violet-900'}`}>{text}</Text>
        </View>
        <View className={`mt-1 flex-row items-center ${isMe ? 'justify-end' : 'justify-start'}`}>
          <Text className={`text-xs ${isMe ? 'text-pink-400' : 'text-violet-600'}`} style={{ fontSize: 10 }} > {timer}</Text>
          {/* Only show dots if message is from 'me' */}
          {isMe && (
            <View className="flex-row ml-2 space-x-1">
              <View className={`w-2 h-2 rounded-full ${getDotColor(1)}`} />
              <View className={`w-2 h-2 rounded-full ml-0.5 ${getDotColor(2)}`} />
            </View>
          )}
        </View>
      </View>
    </View >
  );
} 