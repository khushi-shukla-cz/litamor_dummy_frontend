import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface PopupModalsProps {
  type: 'unmatch' | 'block' | 'pin' | null;
  visible: boolean;
  onUndo: () => void;
  onOkay: () => void;
}

const PopupModals: React.FC<PopupModalsProps> = ({ type, visible, onUndo, onOkay }) => {
  if (!visible || !type) return null;

  const getPopupContent = () => {
    switch (type) {
      case 'unmatch':
        return {
          emoji: '💔',
          icon: '✕',
          iconColor: 'text-red-500',
          title: "You've unmatched with this user.",
          description: "The chat has been closed, and you won't receive further messages."
        };
      case 'block':
        return {
          emoji: '🚫',
          icon: null,
          iconColor: '',
          title: "You've blocked this user.",
          description: "They can no longer message or interact with you."
        };
      case 'pin':
        return {
          emoji: '📌',
          icon: null,
          iconColor: '',
          title: "You've pinned this chat.",
          description: "It will stay at the top for quick access."
        };
      default:
        return null;
    }
  };

  const content = getPopupContent();
  if (!content) return null;

  return (
    <View className="absolute inset-0 bg-black/50 flex-1 items-center justify-center px-4">
      <View className="bg-white rounded-3xl p-8 w-full max-w-sm items-center">
        {/* Emoji */}
        <Text className="text-4xl mb-6">{content.emoji}</Text>
        
        {/* Title */}
        <View className="flex-row items-center mb-4">
          {content.icon && (
            <Text className={`${content.iconColor} text-xl font-bold mr-2`}>
              {content.icon}
            </Text>
          )}
          <Text className="text-black text-xl font-medium text-center flex-1">
            {content.title}
          </Text>
        </View>
        
        {/* Description */}
        <Text className="text-gray-700 text-center text-base leading-6 mb-8">
          {content.description}
        </Text>
        
        {/* Buttons */}
        <View className="flex-row w-full">
          <TouchableOpacity 
            className="bg-[#666666] rounded-full px-8 py-4 mr-4 flex-1"
            onPress={onUndo}
          >
            <Text className="text-white text-center text-base font-medium">Undo</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="bg-[#D9D9D9] rounded-full px-8 py-4 flex-1"
            onPress={onOkay}
          >
            <Text className="text-gray-700 text-center text-base font-medium">Okay</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PopupModals;