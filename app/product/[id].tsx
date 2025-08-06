import { Feather } from "@expo/vector-icons";
import Icon from '@expo/vector-icons/MaterialIcons';
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import LeatherWallet from "../../assets/images/leather-wallet.png";
import Rose from "../../assets/images/rose-bouqet.png";
import SpaCard from "../../assets/images/spa-card.png";
import Watch from "../../assets/images/watch.jpg";
import { useCartContext } from "../context/CartContext";
import { useWishlistContext } from "../context/WishlistContext";

const PRODUCTS = [
  {
    id: "1",
    title: "Leather wallet",
    price: 1400,
    originalPrice: 1600,
    images: [LeatherWallet, Rose, SpaCard],
  },
  {
    id: "2",
    title: "Spa Gift Card",
    price: 1400,
    originalPrice: 1500,
    images: [SpaCard, Watch, Rose ],
  },
  {
    id: "3",
    title: "Rose bouquet",
    price: 1400,
    originalPrice: 1800,
    images: [Rose, SpaCard, LeatherWallet],
  },
  {
    id: "4",
    title: "Watch",
    price: 1400,
    originalPrice: 1800,
    images: [Watch, LeatherWallet, SpaCard],
  },
  {
    id: "5",
    title: "Leather wallet",
    price: 1400,
    originalPrice: 1600,
    images: [LeatherWallet, SpaCard, Rose],
  },
  {
    id: "6",
    title: "Spa Gift Card",
    price: 1400,
    originalPrice: 1500,
    images: [SpaCard , Rose, SpaCard],
  },
];

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const product = PRODUCTS.find((item) => item.id === id);
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showBuyNowPopup, setShowBuyNowPopup] = useState(false);
  const [showAddToCartPopup, setShowAddToCartPopup] = useState(false);
  const { wishlisted, toggleWishlist } = useWishlistContext();
  const { addToCart } = useCartContext();

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleNextImage = () => {
    if (!product) return;
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % product.images.length
    );
  };

  const handlePrevImage = () => {
    if (!product) return;
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + product.images.length) % product.images.length
    );
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      id: product.id,
      name: product.title,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.images[currentImageIndex],
    });
    
    setShowAddToCartPopup(true);
  };

  if (!product) return <Text>Product not found</Text>;

  return (
    <SafeAreaView
      className="flex-1 bg-[#e0d3c3]"
      style={styles.container}
      // contentContainerStyle={{ paddingBottom: 60 }}
    >
      {/* Image */}
      <View>
        <Image
          source={product.images[currentImageIndex]}
          style={styles.mainImage}
          resizeMode="cover"
        />
        {/* Wishlist Icon */}
        <TouchableOpacity
          onPress={() => toggleWishlist({
            id: product.id,
            name: product.title,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.images[currentImageIndex],
          })}
          style={styles.heartIcon}
        >
          <Icon
            name={wishlisted.includes(product.id) ? 'favorite' : 'favorite-border'}
            size={20}
            color={wishlisted.includes(product.id) ? '#444241' : '#666'}
          />
        </TouchableOpacity>

        {/* Image Navigation Controls */}
        <View style={styles.imageControls}>
          <TouchableOpacity onPress={handlePrevImage} style={styles.imageArrow}>
            <Feather name="chevron-left" size={20} color="#555" />
          </TouchableOpacity>
          <Text style={styles.imagePageText}>
            {currentImageIndex + 1}/{product.images.length}
          </Text>
          <TouchableOpacity onPress={handleNextImage} style={styles.imageArrow}>
            <Feather name="chevron-right" size={20} color="#555" />
          </TouchableOpacity>
        </View>
      </View>
      {/* Product Info */}
      <Text style={styles.productTitle}>{product.title}</Text>
      <Text style={styles.productPrice}>₹ {product.price}</Text>
      <Text style={styles.productTaxNote}>
        Taxes included shipping calculated at checkout
      </Text>
      {/* Quantity Selector */}
      <Text style={styles.qtyLabel}>Quantity</Text>
      <View style={styles.qtyContainer}>
        <TouchableOpacity onPress={handleDecrement} style={styles.qtyButton}>
          <Feather name="minus" size={16} color="#555" />
        </TouchableOpacity>
        <Text style={styles.qtyValue}>{quantity}</Text>
        <TouchableOpacity onPress={handleIncrement} style={styles.qtyButton}>
          <Feather name="plus" size={16} color="#555" />
        </TouchableOpacity>
      </View>
      {/* Action Buttons */}
      <TouchableOpacity 
        style={styles.addToCartButton}
        onPress={handleAddToCart}
      >
        <Text style={styles.addToCartButtonText}>Add to cart</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.buyButton}
        onPress={() => setShowBuyNowPopup(true)}
      >
        <Text style={styles.buyButtonText}>Buy it now</Text>
      </TouchableOpacity>

      {/* "You may also like" section */}
      <Text style={styles.suggestedTitle}>You may also like</Text>
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        {PRODUCTS.map((prod) => (
          <TouchableOpacity
            key={prod.id}
            style={styles.card}
            onPress={() => router.push(`/product/${prod.id}` as any)}
          >
            <Image
              source={prod.images[0]}
              style={styles.cardImage}
              resizeMode="cover"
            />
                                                   <TouchableOpacity
                onPress={() => toggleWishlist({
                  id: prod.id,
                  name: prod.title,
                  price: prod.price,
                  originalPrice: prod.originalPrice,
                  image: prod.images[0],
                })}
                style={styles.cardHeartIcon}
              >
                <Icon
                  name={wishlisted.includes(prod.id) ? 'favorite' : 'favorite-border'}
                  size={20}
                  color={wishlisted.includes(prod.id) ? '#444241' : '#666'}
                />
              </TouchableOpacity>
            <Text style={styles.cardTitle}>{prod.title}</Text>
            <View style={styles.cardPriceRow}>
              <Text style={styles.cardPrice}>₹{prod.price}</Text>
              <Text style={styles.cardOriginalPrice}>
                ₹{prod.originalPrice}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Buy Now Popup */}
      <Modal
        isVisible={showBuyNowPopup}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={300}
        animationOutTiming={300}
        backdropOpacity={0.5}
        style={{ justifyContent: "center", margin: 20 }}
        onBackdropPress={() => setShowBuyNowPopup(false)}
      >
        <View style={styles.popupContainer}>
          <View style={styles.popupHeader}>
            <Text style={styles.popupTitle}>Add to Cart</Text>
            <TouchableOpacity
              onPress={() => setShowBuyNowPopup(false)}
              style={styles.closeButton}
            >
              <Feather name="x" size={20} color="#666" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.popupMessage}>
            Would you like to add this item to your cart?
          </Text>
          
          <View style={styles.popupButtons}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowBuyNowPopup(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.viewCartButton}
              onPress={() => {
                setShowBuyNowPopup(false);
                router.push('/myCart');
              }}
            >
              <Text style={styles.viewCartButtonText}>View Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Add to Cart Popup */}
      <Modal
        isVisible={showAddToCartPopup}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        animationInTiming={300}
        animationOutTiming={300}
        backdropOpacity={0.5}
        style={{ justifyContent: "center", margin: 20 }}
        onBackdropPress={() => setShowAddToCartPopup(false)}
      >
        <View style={styles.popupContainer}>
          <View style={styles.popupHeader}>
            <Text style={styles.popupTitle}>Added to Cart!</Text>
            <TouchableOpacity
              onPress={() => setShowAddToCartPopup(false)}
              style={styles.closeButton}
            >
              <Feather name="x" size={20} color="#666" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.popupMessage}>
            {product?.title} has been added to your cart.
          </Text>
          
          <View style={styles.popupButtons}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowAddToCartPopup(false)}
            >
              <Text style={styles.cancelButtonText}>Continue Shopping</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.viewCartButton}
              onPress={() => {
                setShowAddToCartPopup(false);
                router.push('/myCart');
              }}
            >
              <Text style={styles.viewCartButtonText}>View Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C6C3BF",
    padding: 18,
  },
  mainImage: {
    width: "100%",
    height: 240,
    borderRadius: 18,
    marginBottom: 18,
  },
  heartIcon: {
    position: "absolute",
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
  imageControls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -18,
  },
  imageArrow: {
    padding: 4,
    marginHorizontal: 10,
  },
  imagePageText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#555",
  },
  productTitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },
  productTaxNote: {
    color: "#555",
    marginBottom: 16,
  },
  qtyLabel: {
    color: "#555",
    marginBottom: 8,
  },
  qtyContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    backgroundColor: "#f1f1f1",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    alignSelf: "flex-start",
  },
  qtyButton: {
    padding: 6,

    marginHorizontal: 10,
  },
  qtyValue: {
    fontWeight: "700",
    minWidth: 24,
    textAlign: "center",
  },
  cartButtonDisabled: {
    backgroundColor: "#ededed",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  cartButtonDisabledText: {
    color: "#999",
    fontWeight: "600",
    fontSize: 16,
  },
  addToCartButton: {
    backgroundColor: "#D9D9D9",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  addToCartButtonText: {
    color: "#666666",
    fontWeight: "600",
    fontSize: 16,
  },
  buyButton: {
    backgroundColor: "#666666",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buyButtonText: {
    color: "#E6E6E6",
    fontWeight: "600",
    fontSize: 16,
  },
  suggestedTitle: {
    marginTop: 24,
    fontWeight: "700",
    fontSize: 17,
    marginBottom: 10,
  },
  card: {
    marginRight: 16,
    backgroundColor: "#f5f5f5", // or use 'bg-gray-50' if tailwind
    borderRadius: 10,
    overflow: "hidden",
    width: 180,
  },
  cardImage: {
    width: 180,
    height: 120,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginBottom: 10,
  },
  cardHeartIcon: {
    position: "absolute",
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
  cardTitle: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 2,
    color: "#333",
    paddingHorizontal: 8,
  },
  cardPriceRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    marginBottom: 8,
    marginTop: 1,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  cardOriginalPrice: {
    fontSize: 12,
    color: "#999",
    textDecorationLine: "line-through",
    marginLeft: 8,
  },
  // Popup styles
  popupContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  popupHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  closeButton: {
    padding: 4,
  },
  popupMessage: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    lineHeight: 22,
  },
  popupButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "#666",
    fontWeight: "600",
    fontSize: 16,
  },
  viewCartButton: {
    flex: 1,
    backgroundColor: "#222",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  viewCartButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
