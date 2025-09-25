import React, { useState } from 'react';
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';


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
        </Modal>
    );
};

// Demo component to show the popup in action
const UnmatchedPopupDemo = () => {
    const [showPopup, setShowPopup] = useState(false);

    const handleLoveLetter = () => {
        console.log('Love Letter pressed');
        setShowPopup(false);
        // Handle love letter action here
    };

    const handleNoThanks = () => {
        console.log('No Thanks pressed');
        setShowPopup(false);
        // Handle no thanks action here
    };

    return (

        <View style={styles.demoContainer}>
            {/* Simulated Chat Background */}
            <View style={styles.chatBackground}>
                <Text style={styles.chatText}>Chat messages would appear here...</Text>
            </View>

            <TouchableOpacity
                style={styles.demoButton}
                onPress={() => setShowPopup(true)}
            >
                <Text style={styles.demoButtonText}>Show Unmatched Popup</Text>
            </TouchableOpacity>

            <UnmatchedPopup
                visible={showPopup}
                onClose={() => setShowPopup(false)}
                onLoveLetter={handleLoveLetter}
                onNoThanks={handleNoThanks}
            />
        </View>

    );
};

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
        paddingBottom: 40,
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

    // Demo Styles
    demoContainer: {
        flex: 1,
        backgroundColor: '#E8E8E8',
    },
    chatBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    chatText: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center',
    },
    demoButton: {
        backgroundColor: '#6B6B6B',
        marginHorizontal: 20,
        marginBottom: 20,
        paddingVertical: 12,
        borderRadius: 25,
        alignItems: 'center',
    },
    demoButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default UnmatchedPopupDemo;