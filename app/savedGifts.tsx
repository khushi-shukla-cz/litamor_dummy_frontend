import Icon from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { Image, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import BottomNavigation from '../components/bottomNavigation';
import { useWishlistContext } from './context/WishlistContext';

type GiftItem = {
    id: string;
    name: string;
    price: number;
    originalPrice: number;
    image: any;
    isFavorite: boolean;
};

const SavedGiftsScreen = () => {
    const { wishlistItems, toggleWishlist, isWishlisted } = useWishlistContext();
    const [activeTab, setActiveTab] = React.useState("Home");

    const toggleFavorite = (item: GiftItem) => {
        toggleWishlist({
            id: item.id,
            name: item.name,
            price: item.price,
            originalPrice: item.originalPrice,
            image: item.image,
        });
    };

    const renderGiftCard = (item: any, index: number) => {
        const isLeftCard = index % 2 === 0;
        const isFavorite = isWishlisted(item.id);

        return (
            <View key={item.id} style={[styles.giftCard, isLeftCard ? styles.leftCard : styles.rightCard]}>
                <View style={styles.imageContainer}>
                    <Image source={item.image} style={styles.giftImage} />
                    <TouchableOpacity
                        style={styles.favoriteButton}
                        onPress={() => toggleFavorite(item)}
                    >
                        <Icon
                            name={isFavorite ? 'favorite' : 'favorite-border'}
                            size={20}
                            color={isFavorite ? '#444241' : '#666'}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.cardContent}>
                    <Text style={styles.giftName}>{item.name}</Text>
                    <View style={styles.priceContainer}>
                        <Text style={styles.currentPrice}>₹ {item.price}</Text>
                        <Text style={styles.originalPrice}>₹ {item.originalPrice}</Text>
                    </View>
                </View>
            </View>
        );
    };

    const renderGiftPairs = () => {
        const pairs = [];
        for (let i = 0; i < wishlistItems.length; i += 2) {
            pairs.push(
                <View key={i} style={styles.cardRow}>
                    {renderGiftCard(wishlistItems[i], i)}
                    {wishlistItems[i + 1] && renderGiftCard(wishlistItems[i + 1], i + 1)}
                </View>
            );
        }
        return pairs;
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#F5F5F5" />

            {/* Header */}
            <View style={styles.headerContainer}>
                <View style={styles.headerRow}>
                    <TouchableOpacity style={styles.backButton}>
                        <Icon name="arrow-back" size={24} color="#333" />
                    </TouchableOpacity>
                    <View >
                        <Text style={styles.headerTitle}>Saved Gifts</Text>
                    </View>
                </View>
                <Text style={styles.subtitle}>Skip the clichés. Go for something real.</Text>
            </View>


            {/* Gift Cards */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {renderGiftPairs()}
            </ScrollView>

            {/* Bottom Navigation */}
            <BottomNavigation 
                activeTab={activeTab} 
                onTabPress={(tabName: string) => setActiveTab(tabName)} 
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C6C3BF',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    headerContainer: {
        backgroundColor: '#C6C3BF',
        paddingHorizontal: 8,
        paddingTop: 4,
        paddingBottom: 8,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 2,
    },

    backButton: {
        padding: 8,
    },
    titleGroup: {
        marginLeft: 8, // Adds a little space between icon and text
    },

    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        textAlign: 'left',
    },
    headerRight: {
        width: 40,
    },

    subtitle: {
        fontSize: 14,
        color: '#666',
        textAlign: 'left',
        marginLeft: 40,
        marginTop: 2,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 100,
    },
    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    giftCard: {
        backgroundColor: '#d9d9d9',
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    leftCard: {
        width: '48%',
    },
    rightCard: {
        width: '48%',
    },
    imageContainer: {
        position: 'relative',
        height: 140,
    },
    giftImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    favoriteButton: {
        position: 'absolute',
        top: 12,
        right: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 20,
        padding: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    cardContent: {
        padding: 12,
    },
    giftName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginBottom: 8,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    currentPrice: {
        fontSize: 16,
        fontWeight: '600',
        color: '#616161',
        marginRight: 8,
    },
    originalPrice: {
        fontSize: 14,
        color: '#616161',
        textDecorationLine: 'line-through',
    },

});

export default SavedGiftsScreen;