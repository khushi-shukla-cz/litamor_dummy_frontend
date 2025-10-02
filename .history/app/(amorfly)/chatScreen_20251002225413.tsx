import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Image,
    KeyboardAvoidingView,
    Platform,
    Modal,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import * as ImagePicker from 'expo-image-picker'; // 1. Import ImagePicker

// Get screen dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// --- Color Palette (Consistent) ---
const ACCENT_COLOR = '#00BCD4'; // Soft Teal/Cyan
const TEXT_DARK = '#333333';
const TEXT_SECONDARY = '#667085';
const BACKGROUND_LIGHT = '#F7F8FA';
const CARD_WHITE = '#FFFFFF';
const MESSAGE_SENT_BG = '#34495E'; 
const STATUS_ONLINE = '#4CD964'; 
const CTA_DARK = ['#2C3E50', '#1C2833']; // Dark Blue/Black gradient for CTA

// --- Type Definitions and Component Props ---
interface Message {
    id: number;
    text: string;
    sender: 'user' | 'match';
    time: string;
    imageUri?: string; // 2. Updated Message interface for image support
}

interface MessageBubbleProps {
    message: Message;
    onImagePress: (uri: string) => void; // Prop to handle image press and open modal
}

// --- Utility Functions ---
const formatTime = (seconds: number): string => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
};

// --- Reusable Message Bubble Component (UPDATED) ---
const MessageBubble: React.FC<MessageBubbleProps> = ({ message, onImagePress }) => {
    const isUser = message.sender === 'user';
    
    return (
        <View style={[
            styles.bubbleContainer,
            isUser ? styles.userContainer : styles.matchContainer
        ]}>
            <View style={[
                styles.bubble,
                isUser ? styles.userBubble : styles.matchBubble,
                message.imageUri && styles.imageBubble // Style for image messages
            ]}>
                
                {message.imageUri ? (
                    <TouchableOpacity onPress={() => onImagePress(message.imageUri!)} activeOpacity={0.8}>
                        <Image 
                            source={{ uri: message.imageUri }} 
                            style={styles.sentImage} 
                            resizeMode="cover"
                        />
                    </TouchableOpacity>
                ) : (
                    <Text style={[
                        styles.messageText,
                        isUser ? styles.userMessageText : styles.matchMessageText
                    ]}>
                        {message.text}
                    </Text>
                )}
            </View>
            <Text style={[
                styles.messageTime,
                isUser ? styles.userMessageTime : styles.matchMessageTime
            ]}>
                {message.time}
            </Text>
        </View>
    );
};

// --- Chat Expired Overlay (No change) ---
const ChatExpiredOverlay: React.FC = () => {
    const handleSetStatus = () => {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        console.log('Set Status: Ready for Next Match pressed!');
    };
    
    const handleClose = () => {
        console.log('Overlay closed');
    };

    return (
        <View style={overlayStyles.overlayContainer}>
            <View style={overlayStyles.card}>
                <TouchableOpacity onPress={handleClose} style={overlayStyles.closeButton}>
                    <Ionicons name="close" size={24} color={TEXT_SECONDARY} />
                </TouchableOpacity>

                <Ionicons name="airplane-outline" size={50} color={ACCENT_COLOR} style={overlayStyles.icon} />

                <Text style={overlayStyles.mainText}>
                    Your 24 hours are over. 
                    <Text style={overlayStyles.boldText}>Ready to fly again tomorrow?</Text>
                </Text>

                <TouchableOpacity 
                    onPress={handleSetStatus} 
                    style={overlayStyles.ctaButton}
                    activeOpacity={0.8}
                >
                    <Text style={overlayStyles.ctaText}>
                        Set Status: Ready for Next Match
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

// --- Image Modal (No change in structure, but now handles any image) ---
interface ImageModalProps {
    visible: boolean;
    imageUri: string;
    onClose: () => void;
}

const ImageViewModal: React.FC<ImageModalProps> = ({ visible, imageUri, onClose }) => {
    if (!imageUri) return null; // Prevent rendering if no URI is provided
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={imageModalStyles.container}>
                <TouchableOpacity style={imageModalStyles.closeButton} onPress={onClose}>
                    <Ionicons name="close-circle" size={35} color={CARD_WHITE} />
                </TouchableOpacity>
                <Image 
                    source={{ uri: imageUri }} 
                    style={imageModalStyles.image} 
                    resizeMode="contain"
                />
            </View>
        </Modal>
    );
};


// --- Main Chat Screen Component ---

const MatchChatScreen: React.FC = () => {
    const [messageInput, setMessageInput] = useState('');
    const [matchTimeRemaining, setMatchTimeRemaining] = useState(30610); 
    const [isChatExpired, setIsChatExpired] = useState(false);
    
    // 3. Dynamic state for Image Modal
    const [isImageModalVisible, setIsImageModalVisible] = useState(false);
    const [modalImageUri, setModalImageUri] = useState(''); // Stores the URI of the image to display
    
    const scrollViewRef = useRef<ScrollView>(null);
    const matchName = "Sebastian Rudiger"; 
    const matchProfilePic = 'https://i.pravatar.cc/150?img=54'; 

    const [messages, setMessages] = useState<Message[]>([
        { id: 1, text: "Sooo... do you prefer coffee ☕ or chai 🍵?", sender: 'match', time: '09:32 PM' },
        { id: 2, text: "Chai, always! What about you?", sender: 'user', time: '10:32 PM' },
        { id: 3, text: "Haha same, we're already off to a good start 😊", sender: 'match', time: '11:32 PM' },
    ]);

    // Timer Logic... (no change)
    useEffect(() => {
        const interval = setInterval(() => {
            setMatchTimeRemaining(prevTime => {
                if (prevTime <= 1) {
                    clearInterval(interval);
                    setIsChatExpired(true);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    // Scroll to bottom logic... (no change)
    useEffect(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    }, [messages]);
    
    // --- Image Modal Handlers ---
    const openImageModal = (uri: string) => {
        setModalImageUri(uri);
        setIsImageModalVisible(true);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    };

    const closeImageModal = () => {
        setIsImageModalVisible(false);
        setModalImageUri('');
    };

    // 4. Function to send the image message
    const sendImageMessage = (uri: string) => {
        const newMessage: Message = {
            id: messages.length + 1,
            text: '[Image sent]', // Placeholder text
            imageUri: uri,
            sender: 'user',
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        };
        
        setMessages(prev => [...prev, newMessage]);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

        // Simulate match response after image... (optional)
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: prev.length + 1,
                text: `Wow, that looks great! Is that near ${matchName.split(' ')[0]}?`,
                sender: 'match',
                time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            }]);
        }, 2000);
    };


    // 5. Image Picker Functionality
    const pickImage = async () => {
        // Request camera roll permissions
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true, // Allow user to crop/edit before sending
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            sendImageMessage(result.assets[0].uri);
        }
    };

    const handleSend = () => {
        if (messageInput.trim().length > 0 && !isChatExpired) {
             const newMessage: Message = {
                 id: messages.length + 1,
                 text: messageInput.trim(),
                 sender: 'user',
                 time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
             };
             
             setMessages([...messages, newMessage]);
             setMessageInput('');
             Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
             
             // Simulate match response
             setTimeout(() => {
                 setMessages(prev => [...prev, {
                     id: prev.length + 1,
                     text: `Got your text! How was your day?`,
                     sender: 'match',
                     time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
                 }]);
             }, 1500);
        }
    };

    const handleCallPress = (type: 'video' | 'voice') => {
        if (isChatExpired) {
            alert("Chat time is over. Cannot start call.");
            return;
        }
        Haptics.selectionAsync();
        console.log(`${type} call initiated`);
    };
    
    // Media Handlers (Updated to use the new logic)
    const handleAttachFile = () => {
        if (isChatExpired) return;
        Haptics.selectionAsync();
         pickImage();
        console.log('Attach File/Document pressed (Placeholder)');
        // You would typically implement DocumentPicker here
    };

    const handleCaptureImage = () => {
        if (isChatExpired) return;
        Haptics.selectionAsync();
        pickImage(); // 6. Connect Camera/Gallery icon to ImagePicker function
    };

    // Updated handler to open the profile picture in the dynamic modal
    const handleProfilePicPress = () => {
        openImageModal(matchProfilePic);
    };

    const handleMessageImagePress = (uri: string) => {
        openImageModal(uri);
    };


    const timeText = formatTime(matchTimeRemaining);
    const isInputDisabled = isChatExpired;

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
            
            {/* 7. The Image Modal Component (now uses modalImageUri) */}
            <ImageViewModal 
                visible={isImageModalVisible}
                imageUri={modalImageUri}
                onClose={closeImageModal}
            />

            <KeyboardAvoidingView 
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                {/* --- HEADER --- */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => console.log('Go back')} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={26} color={TEXT_DARK} />
                    </TouchableOpacity>

                    <View style={styles.profileInfo}>
                        <TouchableOpacity style={styles.avatarContainer} onPress={handleProfilePicPress}>
                            <Image 
                                source={{ uri: matchProfilePic }} 
                                style={styles.avatar}
                            />
                            <View style={styles.onlineDot} />
                        </TouchableOpacity>

                        <View style={{ flexShrink: 1 }}>
                            <Text style={styles.matchName} numberOfLines={1}>{matchName}</Text>
                            <Text style={[styles.matchStatus, isChatExpired && { color: TEXT_SECONDARY }]}>
                                {isChatExpired ? 'Offline' : 'Online'}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.headerActions}>
                        <TouchableOpacity onPress={() => handleCallPress('video')} disabled={isInputDisabled}>
                            <Ionicons name="videocam-outline" size={24} color={isInputDisabled ? TEXT_SECONDARY : ACCENT_COLOR} style={styles.headerIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => handleCallPress('voice')} disabled={isInputDisabled}>
                            <Ionicons name="call-outline" size={24} color={isInputDisabled ? TEXT_SECONDARY : ACCENT_COLOR} style={styles.headerIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => console.log('More options')}>
                            <Ionicons name="ellipsis-vertical" size={24} color={TEXT_SECONDARY} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Match Expiration Banner */}
                <View style={styles.expiryBanner}>
                    <Ionicons name="timer-outline" size={16} color={TEXT_SECONDARY} />
                    <Text style={styles.expiryText}>
                        Chat expires in 24h 
                        <Text style={styles.expiryTimerText}> • {timeText} remaining</Text>
                    </Text>
                </View>

                {/* Chat Messages Area */}
                <ScrollView 
                    ref={scrollViewRef}
                    style={styles.chatArea}
                    contentContainerStyle={styles.chatContent}
                    keyboardShouldPersistTaps="handled"
                >
                    {messages.map(msg => (
                        <MessageBubble 
                            key={msg.id} 
                            message={msg} 
                            onImagePress={handleMessageImagePress} // Pass handler down
                        />
                    ))}
                </ScrollView>
                
                {/* --- CHAT EXPIRED OVERLAY --- */}
                {isChatExpired && <ChatExpiredOverlay />}


                {/* --- INPUT AREA --- */}
                {!isInputDisabled && (
                    <View style={styles.inputContainer}>
                        <View style={styles.textInputWrapper}>
                            
                            {/* Attachment Icon (Files/Documents) */}
                            <TouchableOpacity onPress={handleAttachFile} style={styles.inputIcon}>
                                <Ionicons name="attach-outline" size={24} color={TEXT_SECONDARY} />
                            </TouchableOpacity>

                            <TextInput
                                style={styles.textInput}
                                placeholder="Message..."
                                placeholderTextColor={TEXT_SECONDARY}
                                value={messageInput}
                                onChangeText={setMessageInput}
                                multiline={true}
                                textAlignVertical="center" 
                                editable={!isInputDisabled}
                            />
                            
                            {/* Camera/Image Icon (Now triggers Image Picker) */}
                            <TouchableOpacity onPress={handleCaptureImage} style={styles.inputIcon}>
                                <Ionicons name="camera-outline" size={24} color={TEXT_SECONDARY} />
                            </TouchableOpacity>
                            
                        </View>
                        
                        {/* Send or Mic Button */}
                        <TouchableOpacity 
                            style={[
                                styles.actionButton, 
                                messageInput.length > 0 ? styles.sendButtonActive : styles.micButton
                            ]} 
                            onPress={messageInput.length > 0 ? handleSend : () => console.log('Record voice')}
                            disabled={isInputDisabled}
                        >
                            <Ionicons 
                                name={messageInput.length > 0 ? "send" : "mic-outline"} 
                                size={20}
                                color={CARD_WHITE} 
                            />
                        </TouchableOpacity>
                    </View>
                )}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

// --- Image Modal Stylesheet (No change) ---
const imageModalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: screenWidth,
        height: screenHeight * 0.8,
    },
    closeButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        zIndex: 10,
        padding: 10,
    },
});


// --- Overlay Stylesheet (No change) ---
const overlayStyles = StyleSheet.create({
    overlayContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(247, 248, 250, 0.95)', 
        zIndex: 10, 
    },
    card: {
        width: '85%',
        backgroundColor: CARD_WHITE,
        borderRadius: 20,
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 8,
    },
    closeButton: {
        position: 'absolute',
        top: 15,
        right: 15,
        padding: 5,
        zIndex: 1,
    },
    icon: {
        marginBottom: 20,
        backgroundColor: 'rgba(0, 188, 212, 0.1)', 
        borderRadius: 50,
        padding: 10,
    },
    mainText: {
        fontSize: 17,
        color: TEXT_DARK,
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 25,
    },
    boldText: {
        fontWeight: '700',
        color: ACCENT_COLOR,
    },
    ctaButton: {
        width: '100%',
        backgroundColor: MESSAGE_SENT_BG, 
        borderRadius: 12,
        paddingVertical: 15,
        alignItems: 'center',
    },
    ctaText: {
        color: CARD_WHITE,
        fontSize: 16,
        fontWeight: '700',
    },
});

// --- Main Stylesheet (UPDATED for images) ---
const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: CARD_WHITE },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: CARD_WHITE,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E6ED', 
        height: 60,
    },
    backButton: { paddingRight: 10 },
    profileInfo: { flexDirection: 'row', alignItems: 'center', flex: 1, marginLeft: 5 },
    avatarContainer: { marginRight: 8 },
    avatar: { width: 38, height: 38, borderRadius: 19 },
    onlineDot: {
        position: 'absolute', bottom: 0, right: 0, width: 9, height: 9, borderRadius: 4.5,
        backgroundColor: STATUS_ONLINE, borderWidth: 2, borderColor: CARD_WHITE,
    },
    matchName: { fontSize: 17, fontWeight: '700', color: TEXT_DARK },
    matchStatus: { fontSize: 12, fontWeight: '600', marginTop: 1, color: STATUS_ONLINE },
    headerActions: { flexDirection: 'row', alignItems: 'center', paddingLeft: 10 },
    headerIcon: { marginRight: 20 },
    
    expiryBanner: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 8,
        backgroundColor: BACKGROUND_LIGHT, borderBottomWidth: 1, borderBottomColor: '#E0E6ED',
    },
    expiryText: { fontSize: 13, color: TEXT_SECONDARY, marginLeft: 6 },
    expiryTimerText: { fontWeight: '700', color: TEXT_DARK },
    
    chatArea: { flex: 1, backgroundColor: BACKGROUND_LIGHT },
    chatContent: { paddingHorizontal: 15, paddingVertical: 10 },
    
    bubbleContainer: { marginVertical: 6, maxWidth: '80%' },
    matchContainer: { alignSelf: 'flex-start' },
    userContainer: { alignSelf: 'flex-end' },
    
    bubble: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 18 },
    matchBubble: {
        backgroundColor: CARD_WHITE, borderTopLeftRadius: 6, borderWidth: 1, borderColor: '#E0E6ED',
        elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2,
    },
    userBubble: { backgroundColor: MESSAGE_SENT_BG, borderTopRightRadius: 6 },
    
    // New style for message bubbles containing images (removes padding for full image effect)
    imageBubble: { 
        paddingHorizontal: 0, 
        paddingVertical: 0, 
        overflow: 'hidden', 
        minHeight: 150, // Ensure minimum height for image messages
    }, 
    
    messageText: { fontSize: 15, lineHeight: 22 },
    matchMessageText: { color: TEXT_DARK },
    userMessageText: { color: CARD_WHITE },
    
    // Style for the image inside the message bubble
    sentImage: {
        width: 250, // Fixed width for clear display
        height: 200, // Fixed height
        borderRadius: 18,
    },

    messageTime: { fontSize: 10, marginTop: 2 },
    matchMessageTime: { color: TEXT_SECONDARY, textAlign: 'left', marginLeft: 10 },
    userMessageTime: { color: TEXT_SECONDARY, textAlign: 'right', marginRight: 10 },
    
    inputContainer: {
        flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: 15, paddingVertical: 10, 
        backgroundColor: CARD_WHITE, borderTopWidth: 1, borderTopColor: '#E0E6ED',
    },
    textInputWrapper: {
        flex: 1, 
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: BACKGROUND_LIGHT, 
        borderRadius: 25, 
        paddingHorizontal: 5,
        marginRight: 10, 
        minHeight: 48, 
    },
    textInput: { 
        flex: 1, 
        fontSize: 16, 
        color: TEXT_DARK, 
        paddingHorizontal: 8,
        paddingVertical: 0 
    },
    inputIcon: {
        paddingHorizontal: 8,
        paddingVertical: 5,
    },
    actionButton: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
    micButton: { backgroundColor: TEXT_SECONDARY },
    sendButtonActive: { backgroundColor: ACCENT_COLOR },
});

export default MatchChatScreen;
