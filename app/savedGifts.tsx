import { useState } from 'react';
import {
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialIcons';

type GiftItem = {
    id: number;
    name: string;
    price: number;
    originalPrice: number;
    image: any;
    isFavorite: boolean;
};

const SavedGiftsScreen = () => {
    const [savedItems, setSavedItems] = useState([
        {
            id: 1,
            name: 'Leather wallet',
            price: 1400,
            originalPrice: 1800,
            image: require('../../../assets/images/leather-wallet.jpg'), // Replace with your image path
            isFavorite: true,
        },
        {
            id: 2,
            name: 'Spa Gift Card',
            price: 1400,
            originalPrice: 1800,
            image: require('../../../assets/images/spa-card.png'), // Replace with your image path
            isFavorite: true,
        },
        {
            id: 3,
            name: 'Rose bouquet',
            price: 1400,
            originalPrice: 1800,
            image: require('../../../assets/images/rose-bouquet.png'), // Replace with your image path
            isFavorite: true,
        },
        {
            id: 4,
            name: 'Watch',
            price: 1400,
            originalPrice: 1800,
            image: require('../../../assets/images/watch.png'), // Replace with your image path
            isFavorite: true,
        },
        // Duplicate items to match the design
        {
            id: 5,
            name: 'Rose bouquet',
            price: 1400,
            originalPrice: 1800,
            image: require('../../../assets/images/rose-bouquet.png'),
            isFavorite: true,
        },
        {
            id: 6,
            name: 'Watch',
            price: 1400,
            originalPrice: 1800,
            image: require('../../../assets/images/watch.png'),
            isFavorite: true,
        },
        {
            id: 7,
            name: 'Rose bouquet',
            price: 1400,
            originalPrice: 1800,
            image: require('../../../assets/images/rose-bouquet.png'),
            isFavorite: false,
        },
        {
            id: 8,
            name: 'Watch',
            price: 1400,
            originalPrice: 1800,
            image: require('../../../assets/images/watch.png'),
            isFavorite: false,
        },
    ]);

    const toggleFavorite = (id: number) => {
        setSavedItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
            )
        );
    };

    const renderGiftCard = (item: GiftItem, index: number) => {
        const isLeftCard = index % 2 === 0;

        return (
            <View key={item.id} style={[styles.giftCard, isLeftCard ? styles.leftCard : styles.rightCard]}>
                <View style={styles.imageContainer}>
                    <Image source={item.image} style={styles.giftImage} />
                    <TouchableOpacity
                        style={styles.favoriteButton}
                        onPress={() => toggleFavorite(item.id)}
                    >
                        <Icon
                            name={item.isFavorite ? 'favorite' : 'favorite-border'}
                            size={20}
                            color={item.isFavorite ? '#444241' : '#666'}
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
        for (let i = 0; i < savedItems.length; i += 2) {
            pairs.push(
                <View key={i} style={styles.cardRow}>
                    {renderGiftCard(savedItems[i], i)}
                    {savedItems[i + 1] && renderGiftCard(savedItems[i + 1], i + 1)}
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
            <View style={styles.bottomNavigation}>
                <TouchableOpacity style={styles.navItem}>
                    <Icon name="home" size={24} color="#FFFFFF" />
                    <Text style={[styles.navText, styles.inactiveNavText]}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Icon name="search" size={24} color="#666" />
                    <Text style={[styles.navText, styles.inactiveNavText]}>Explore</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Feather name="message-circle" size={24} color="#666" />
                    <Text style={[styles.navText, styles.inactiveNavText]}>Message</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                    <Icon name="person-outline" size={24} color="#666" />
                    <Text style={[styles.navText, styles.inactiveNavText]}>Profile</Text>
                </TouchableOpacity>
            </View>
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
    bottomNavigation: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        backgroundColor: '#444444',
        paddingVertical: 12,
        paddingBottom: 24,
        height: 85.2,
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    navText: {
        fontSize: 12,
        color: '#FFF',
        marginTop: 4,
        fontWeight: '500',
    },
    inactiveNavText: {
        color: '#999',
    },
});

export default SavedGiftsScreen;