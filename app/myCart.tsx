import Feather from '@expo/vector-icons/Feather';
import Icon from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, } from 'react-native';
import { useCartContext } from './context/CartContext';

type CartItemType = {
    id: string;
    name: string;
    price: number;
    originalPrice: number;
    quantity: number;
    image: any;
};

const ShoppingCart = () => {
    const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCartContext();
    const [couponCode, setCouponCode] = useState('');
    const router = useRouter();

    const subtotal = getCartTotal();
    const deliveryFee = 30;
    const total = subtotal + deliveryFee;

    const CartItem = ({ item }: { item: CartItemType }) => (
        <View style={styles.cartItem}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <View style={styles.priceContainer}>
                    <Text style={styles.currentPrice}>₹ {item.price}</Text>
                    <Text style={styles.originalPrice}>₹ {item.originalPrice}</Text>
                </View>
                <Text style={styles.taxText}>Inclusive of all taxes</Text>

                <View style={styles.quantityContainer}>
                    <View style={styles.quantityButtonContainer}>
                        <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                            <Text style={styles.quantityButtonText}>-</Text>
                        </TouchableOpacity>

                        <Text style={styles.quantityText}>{item.quantity}</Text>

                        <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                            <Text style={styles.quantityButtonText}>+</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={styles.removeButton}
                        onPress={() => removeFromCart(item.id)}
                    >
                        <Text style={styles.removeText}>Remove</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#C6C3BF" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Icon name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>My Cart</Text>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Cart Items */}
                <View style={styles.allCartItems}>
                    {cartItems.map(item => (
                        <CartItem key={item.id} item={item} />
                    ))}
                </View>

                {/* Coupon Code Section */}
                <View style={styles.couponSection}>
                    <TextInput
                        style={styles.couponInput}
                        placeholder="Enter coupon code"
                        placeholderTextColor="#999"
                        value={couponCode}
                        onChangeText={setCouponCode}
                    />
                    <TouchableOpacity style={styles.applyButton}>
                        <Text style={styles.applyButtonText}>Apply</Text>
                    </TouchableOpacity>
                </View>

                {/* Order Summary */}
                <View style={styles.summarySection}>
                    <Text style={styles.summaryTitle}>Order Summary</Text>

                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Sub total</Text>
                        <Text style={styles.summaryValue}>₹ {subtotal}</Text>
                    </View>

                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Delivery fee</Text>
                        <Text style={styles.summaryValue}>₹ {deliveryFee}</Text>
                    </View>

                    <View style={styles.divider} />

                    <View style={styles.totalRow}>
                        <Text style={styles.totalLabel}>Total</Text>
                        <Text style={styles.totalValue}>₹ {total}</Text>
                    </View>
                </View>

                {/* Checkout Button */}
                <View style={styles.checkoutContainer}>
                    <TouchableOpacity style={styles.checkoutButton}>
                        <Text style={styles.checkoutButtonText}>Checkout</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>


            {/* Bottom Navigation */}
            <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem}>
                    <Icon name="home-filled" size={24} color="#FFFFFF" />
                    <Text style={[styles.navLabel, { color: '#FFFFFF' }]}>Home</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem}>
                    <Icon name="search" size={24} color="#666" />
                    <Text style={[styles.navLabel, { color: '#666' }]}>Explore</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem}>
                    <Feather name="message-circle" size={24} color="#666" />

                    <Text style={[styles.navLabel, { color: '#666' }]}>Message</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.navItem}>
                    <Icon name="person-outline" size={24} color="#666" />
                    <Text style={[styles.navLabel, { color: '#666' }]}>Profile</Text>
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#C6C3BF',
    },
    backButton: {
        marginRight: 15,
    },
    backArrow: {
        fontSize: 24,
        color: '#333',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 10,
    },
    cartItem: {
        width: 342,
        height: 121,
        flexDirection: 'row',
        backgroundColor: '#C6C3BF',
        borderRadius: 15,
        paddingRight: 15,
        marginBottom: 15,

    },
    allCartItems: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginRight: 0,
    },
    itemImage: {
        width: 175,
        height: 121,
        borderRadius: 8,
        marginRight: 15,

    },
    itemDetails: {
        flex: 1,
        width: 150,
        height: 121,
        justifyContent: 'space-between',
    },
    itemName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        paddingTop: 5,
        marginBottom: 5,
        width: 111,
        height: 24,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 3,
    },
    currentPrice: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginRight: 8,
    },
    originalPrice: {
        fontSize: 12,
        color: '#999',
        textDecorationLine: 'line-through',
    },
    taxText: {
        fontSize: 10,
        color: '#666',
        marginBottom: 15,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 150,
        height: 24,
    },
    quantityButtonContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: 87,
        height: 24,
        paddingTop: 0,
        paddingBottom: 0,
        paddingRight: 0,
        paddingLeft: 0,
        gap: 0,
        backgroundColor: '#D9D9D9',
        borderRadius: 15,
    },
    quantityButton: {
        width: 30,
        height: 30,
        backgroundColor: '',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10,
    },
    quantityButtonText: {
        fontSize: 18,
        color: '#333',
        fontWeight: '500',
    },
    quantityText: {
        fontSize: 16,
        color: '#333',
        marginHorizontal: 10,
        minWidth: 5,
        textAlign: 'center',
        paddingTop: 2,
    },
    removeButton: {
        marginLeft: 20,
    },
    removeText: {
        fontSize: 12,
        color: '#666',
        textDecorationLine: 'underline',
    },
    couponSection: {
        flexDirection: 'row',
        marginBottom: 20,
        color: '#D9D9D9',
    },
    couponInput: {
        flex: 1,
        backgroundColor: '#D9D9D9',
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 15,
        fontSize: 14,
        color: '#333',
        marginRight: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    applyButton: {
        backgroundColor: '#D9D9D9',
        borderRadius: 25,
        paddingHorizontal: 25,
        paddingVertical: 15,
        justifyContent: 'center',

    },
    applyButtonText: {
        fontSize: 14,
        color: '#444444',
        fontWeight: '500',
    },
    summarySection: {
        backgroundColor: '#C6C3BF',
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,

    },
    summaryTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 15,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    summaryLabel: {
        fontSize: 14,
        color: '#666',
    },
    summaryValue: {
        fontSize: 14,
        color: '#333',
        fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginVertical: 15,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    totalLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    totalValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    checkoutContainer: {
        height: 49,
        paddingHorizontal: 20,
        paddingBottom: 5,
        backgroundColor: '#666666',
        borderRadius: 10,
        marginBottom: 10,
    },
    checkoutButton: {
        backgroundColor: '#666666',
        borderRadius: 25,
        paddingVertical: 11,
        alignItems: 'center',
    },
    checkoutButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
    bottomNav: {
        flexDirection: 'row',
        backgroundColor: '#333',
        paddingVertical: 10,
    },
    navItem: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 5,
    },
    navIcon: {
        fontSize: 20,
        marginBottom: 3,
    },
    navLabel: {
        fontSize: 12,
        color: '#fff',
    },
});

export default ShoppingCart;