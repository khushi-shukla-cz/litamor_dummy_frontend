import { Ionicons } from '@expo/vector-icons';
import React, { useRef } from 'react';
import {
    Dimensions,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // ✅ use this one


const { width } = Dimensions.get('window');
const cardWidth = width * 0.7;
const cardMargin = 20;


const PremiumUpgradeScreen = () => {
    const scrollViewRef = useRef(null);

    const features = [
        {
            id: 1,
            title: 'Extra Love Letter 💌',
            description: 'Get 1 additional Love Letter with Premium.',
        },
        {
            id: 2,
            title: 'Amor Compatibility ❤️',
            description: 'Check your psychological compatibility 3 days before you match.',
        },
        {
            id: 3,
            title: 'Premium Boost 🚀',
            description: 'Get 5x more visibility and increase your chances of matching.',
        },
        {
            id: 4,
            title: 'Unlimited Likes 👍',
            description: 'Like as many profiles as you want without any restrictions.',
        },
        {
            id: 5,
            title: 'See Who Likes You 👀',
            description: 'View all profiles that have already liked you first.',
        },
    ];

    const renderFeatureCard = (feature: { id: number; title: string; description: string }, index: number) => (
        <View key={feature.id} style={styles.featureCard}>
            <Text style={styles.featureTitle}>{feature.title}</Text>
            <Text style={styles.featureDescription}>{feature.description}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#E6E6E6" />

            {/* Header */}
            <View style={styles.header}>

                <Text style={styles.headerTitle}>Go Premium</Text>

                <TouchableOpacity style={styles.closeButton}>
                    <Ionicons name="close" size={24} color="#666" />
                </TouchableOpacity>
            </View>

            {/* Main Content */}
            <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>
                {/* Hero Section */}
                <View style={styles.heroSection}>
                    <Text style={styles.heroText}>
                        Unlock exclusive features designed to make your experience smoother and more exciting.
                    </Text>
                </View>

                {/* Pricing */}
                <View style={styles.pricingSection}>
                    <Text style={styles.pricingText}>Unlock Premium at ₹500/month</Text>
                </View>

                {/* Feature Cards */}
                <View style={styles.cardsContainer}>
                    <ScrollView
                        ref={scrollViewRef}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled={false}
                        decelerationRate="fast"
                        snapToInterval={cardWidth + cardMargin}
                        snapToAlignment="start"
                        contentInsetAdjustmentBehavior="never"
                        contentContainerStyle={styles.cardsScrollContainer}
                    >
                        {features.map((feature, index) => renderFeatureCard(feature, index))}
                    </ScrollView>
                </View>

                {/* Dots Indicator
                <View style={styles.dotsContainer}>
                    {features.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                index === 0 && styles.activeDot, // You can make this dynamic based on scroll position
                            ]}
                        />
                    ))}
                </View> */}

                {/* Additional Features List
                <View style={styles.additionalFeatures}>
                    <Text style={styles.additionalTitle}>What else you get:</Text>
                    <View style={styles.featureItem}>
                        <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                        <Text style={styles.featureItemText}>Ad-free experience</Text>
                    </View>
                    <View style={styles.featureItem}>
                        <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                        <Text style={styles.featureItemText}>Priority customer support</Text>
                    </View>
                    <View style={styles.featureItem}>
                        <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                        <Text style={styles.featureItemText}>Advanced filters</Text>
                    </View>
                    <View style={styles.featureItem}>
                        <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                        <Text style={styles.featureItemText}>Read receipts</Text>
                    </View>
                </View> */}
            </ScrollView>

            {/* Bottom Action Button */}
            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.upgradeButton}>
                    <Text style={styles.upgradeButtonText}>Upgrade to Premium</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity style={styles.termsButton}>
                    <Text style={styles.termsText}>Terms & Conditions</Text>
                </TouchableOpacity> */}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E6E6E6',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 16,
        paddingTop: 25,
        backgroundColor: '#E6E6E6',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 500,
        color: '#000000',
        flex: 1,
        textAlign: 'center',

        //marginRight: 28, // Compensate for close button width
    },
    closeButton: {
        padding: 4,
    },
    scrollContainer: {
        flex: 1,
    },
    heroSection: {
        paddingHorizontal: 32,
        paddingVertical: 30,
        alignItems: 'center',
        marginBottom: 20,
    },
    heroText: {
        fontSize: 20,
        lineHeight: 28,
        color: '#333',
        textAlign: 'center',
        fontWeight: '400',
    },
    pricingSection: {
        paddingHorizontal: 32,
        paddingVertical: 10,
        marginBottom: 40,
    },
    pricingText: {
        fontSize: 20,
        fontWeight: '500',
        color: '#000',
    },
    cardsContainer: {
        marginBottom: 20,
    },
    cardsScrollContainer: {
        // paddingLeft: (width - cardWidth) / 2,
        // paddingRight: (width - cardWidth) / 2,
        paddingHorizontal: cardMargin / 2,
    },
    featureCard: {
        width: cardWidth,
        backgroundColor: '#D9D9D9',
        borderRadius: 16,
        padding: 24,
        marginHorizontal: cardMargin / 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
        minHeight: 160,
        justifyContent: 'center',
    },
    featureTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginBottom: 12,
        textAlign: 'center',
    },
    featureDescription: {
        fontSize: 14,
        color: '#000000',
        lineHeight: 22,
        textAlign: 'center',
        fontWeight: 400,
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#CCC',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: '#666',
        width: 24,
    },
    additionalFeatures: {
        paddingHorizontal: 32,
        paddingVertical: 20,
    },
    additionalTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#000',
        marginBottom: 16,
    },
    featureItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    featureItemText: {
        fontSize: 16,
        color: '#666',
        marginLeft: 12,
    },
    bottomContainer: {
        backgroundColor: '#E6E6E6',
        paddingHorizontal: 24,
        paddingBottom: 24,
        paddingTop: 16,
    },
    upgradeButton: {
        backgroundColor: '#666666',
        paddingVertical: 16,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 12,
    },
    upgradeButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
    },
    termsButton: {
        alignItems: 'center',
        paddingVertical: 8,
    },
    termsText: {
        fontSize: 14,
        color: '#999',
        textDecorationLine: 'underline',
    },
});

export default PremiumUpgradeScreen;