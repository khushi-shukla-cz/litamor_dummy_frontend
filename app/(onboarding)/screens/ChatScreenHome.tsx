import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, Dimensions, TextInput, Image } from 'react-native';

const { width } = Dimensions.get('window');

const COLORS = {
  primary: '#FF4757', // Heart/Accent color
  secondary: '#3A3A3A', // Dark text/elements
  background: '#EAEAEA', // Light gray chat background
  bubbleUser: '#3A3A3A', // Dark bubble for user messages
  bubblePartner: '#FFFFFF', // Light bubble for partner messages
  onlineGreen: '#34C759', // Green for 'Online' status
  timestamp: '#A9A9A9', // Light gray for timestamps
};

// Dummy Chat Data
const chatMessages = [
  {
    id: 1,
    text: "Sooo... do you prefer coffee ☕ or chai 🫖?",
    isUser: true,
    time: "09:32 PM"
  },
  {
    id: 2,
    text: "Chai, always! What about you?",
    isUser: false,
    time: "10:32 PM"
  },
  {
    id: 3,
    text: "Haha same, we're already off to a good start 🥳",
    isUser: true,
    time: "11:32 PM"
  },
];

const ChatScreen: React.FC = () => {
  // Dummy data for contact
  const contact = {
    name: 'Sebastian Rudiger',
    status: 'Online',
    avatar: 'https://placehold.co/40x40/505050/FFF', // Replace with actual avatar URL
  };

  const renderMessage = (message: typeof chatMessages[0]) => {
    const isUser = message.isUser;
    
    // Style for the container to align messages left or right
    const messageContainerStyle = isUser ? styles.userMessageContainer : styles.partnerMessageContainer;
    // Style for the message bubble
    const messageBubbleStyle = isUser ? styles.userBubble : styles.partnerBubble;
    // Style for the text inside the bubble
    const messageTextStyle = isUser ? styles.userText : styles.partnerText;

    return (
      <View key={message.id} style={messageContainerStyle}>
        <View style={messageBubbleStyle}>
          <Text style={messageTextStyle}>{message.text}</Text>
        </View>
        <Text style={styles.timeText}>{message.time}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButtonContainer}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
        
        <View style={styles.contactInfo}>
          <Image source={{ uri: contact.avatar }} style={styles.avatar} />
          {/* Online Dot */}
          <View style={styles.onlineDot} /> 
          <View style={styles.nameStatus}>
            <Text style={styles.contactName}>{contact.name}</Text>
            <Text style={styles.contactStatus}>{contact.status}</Text>
          </View>
        </View>

        <View style={styles.callIcons}>
          <TouchableOpacity><Text style={styles.icon}>🎥</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.icon}>📞</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.icon}>⋮</Text></TouchableOpacity>
        </View>
      </View>

      {/* Chat Messages Area */}
      <ScrollView 
        style={styles.chatArea}
        contentContainerStyle={styles.chatContent}
      >
        {chatMessages.map(renderMessage)}
      </ScrollView>

      {/* Input Bar */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder=" | Message"
          placeholderTextColor={COLORS.timestamp}
        />
        <TouchableOpacity style={styles.micButton}>
          <Text style={styles.micIcon}>🎤</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  
  // --- Header Styles ---
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: COLORS.bubblePartner, // White header background
    borderBottomWidth: 1,
    borderBottomColor: COLORS.timestamp,
  },
  backButtonContainer: {
    paddingRight: 10,
  },
  backArrow: {
    fontSize: 24,
    color: COLORS.secondary,
    fontWeight: '300',
  },
  contactInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  onlineDot: {
      position: 'absolute',
      left: 32,
      bottom: 2,
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: COLORS.onlineGreen,
      borderWidth: 1,
      borderColor: COLORS.bubblePartner,
  },
  nameStatus: {
    justifyContent: 'center',
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.secondary,
  },
  contactStatus: {
    fontSize: 12,
    color: COLORS.onlineGreen,
    fontWeight: '500',
  },
  callIcons: {
    flexDirection: 'row',
  },
  icon: {
    fontSize: 20,
    marginLeft: 20,
    color: COLORS.secondary,
  },

  // --- Chat Area Styles ---
  chatArea: {
    flex: 1,
    paddingHorizontal: 10,
  },
  chatContent: {
    paddingVertical: 20,
  },
  
  // Message Bubbles
  partnerMessageContainer: {
    alignSelf: 'flex-start',
    maxWidth: width * 0.75,
    marginBottom: 10,
  },
  userMessageContainer: {
    alignSelf: 'flex-end',
    maxWidth: width * 0.75,
    marginBottom: 10,
  },
  partnerBubble: {
    backgroundColor: COLORS.bubblePartner,
    padding: 12,
    borderRadius: 15,
    borderTopLeftRadius: 0,
  },
  userBubble: {
    backgroundColor: COLORS.bubbleUser,
    padding: 12,
    borderRadius: 15,
    borderTopRightRadius: 0,
  },
  partnerText: {
    fontSize: 16,
    color: COLORS.secondary,
  },
  userText: {
    fontSize: 16,
    color: COLORS.white,
  },
  timeText: {
    fontSize: 10,
    color: COLORS.timestamp,
    marginTop: 2,
    textAlign: 'right',
  },

  // --- Input Bar Styles ---
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: COLORS.bubblePartner, // White input bar background
    borderTopWidth: 1,
    borderTopColor: COLORS.timestamp,
  },
  textInput: {
    flex: 1,
    height: 45,
    backgroundColor: COLORS.background, // Light gray input box
    borderRadius: 25,
    paddingHorizontal: 15,
    fontSize: 16,
    marginRight: 10,
  },
  micButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: COLORS.background, // Light gray mic button
    justifyContent: 'center',
    alignItems: 'center',
  },
  micIcon: {
    fontSize: 20,
  },
});