import { Feather } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWishlist } from "../hooks/useWishlist";

const PRODUCTS = [
  {
    id: "1",
    title: "Leather wallet",
    price: 1400,
    originalPrice: 1600,
    images: [
      require("../../assets/images/watch.jpg"),
      require("../../assets/images/rose-1.jpeg"),
      require("../../assets/images/watch.jpg"),
      require("../../assets/images/rose-1.jpeg"),
      require("../../assets/images/watch.jpg"),
      require("../../assets/images/rose-1.jpeg"),
    ],
  },
  {
    id: "2",
    title: "Spa Gift Card",
    price: 1400,
    originalPrice: 1500,
    images: [
      require("../../assets/images/watch.jpg"),
      require("../../assets/images/rose-1.jpeg"),
      require("../../assets/images/watch.jpg"),
      require("../../assets/images/rose-1.jpeg"),
      require("../../assets/images/watch.jpg"),
      require("../../assets/images/rose-1.jpeg"),
    ],
  },
  {
    id: "3",
    title: "Rose bouquet",
    price: 1400,
    originalPrice: 1800,
    images: [
      require("../../assets/images/watch.jpg"),
      require("../../assets/images/rose-1.jpeg"),
      require("../../assets/images/watch.jpg"),
      require("../../assets/images/rose-1.jpeg"),
      require("../../assets/images/watch.jpg"),
      require("../../assets/images/rose-1.jpeg"),
    ],
  },
  {
    id: "4",
    title: "Watch",
    price: 1400,
    originalPrice: 1800,
    images: [
      require("../../assets/images/watch.jpg"),
      require("../../assets/images/rose-1.jpeg"),
      require("../../assets/images/watch.jpg"),
      require("../../assets/images/rose-1.jpeg"),
      require("../../assets/images/watch.jpg"),
      require("../../assets/images/rose-1.jpeg"),
    ],
  },
  {
    id: "5",
    title: "Leather wallet",
    price: 1400,
    originalPrice: 1600,
    images: [
      require("../../assets/images/watch.jpg"),
      require("../../assets/images/rose-1.jpeg"),
      require("../../assets/images/watch.jpg"),
      require("../../assets/images/rose-1.jpeg"),
      require("../../assets/images/watch.jpg"),
      require("../../assets/images/rose-1.jpeg"),
    ],
  },
  {
    id: "6",
    title: "Spa Gift Card",
    price: 1400,
    originalPrice: 1500,
    images: [
      require("../../assets/images/watch.jpg"),
      require("../../assets/images/rose-1.jpeg"),
      require("../../assets/images/watch.jpg"),
      require("../../assets/images/rose-1.jpeg"),
      require("../../assets/images/watch.jpg"),
      require("../../assets/images/rose-1.jpeg"),
    ],
  },
];

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const product = PRODUCTS.find((item) => item.id === id);
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { wishlisted, toggleWishlist } = useWishlist();

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
          onPress={() => toggleWishlist(product.id)}
          style={[
            styles.heartIcon,
            {
              backgroundColor: wishlisted.includes(product.id)
                ? "rgb(236, 72, 153)"
                : "#D9D9D9",
            },
          ]}
        >
          <Feather name="heart" size={20} color="#fff" />
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
      <TouchableOpacity disabled style={styles.cartButtonDisabled}>
        <Text style={styles.cartButtonDisabledText}>Add to cart</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buyButton}>
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
              onPress={() => toggleWishlist(prod.id)}
              style={[
                styles.cardHeartIcon,
                {
                  backgroundColor: wishlisted.includes(prod.id)
                    ? "rgb(236, 72, 153)"
                    : "#D9D9D9",
                },
              ]}
            >
              <Feather name="heart" size={20} color="#fff" />
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
    top: 10,
    right: 10,
    padding: 7,
    borderRadius: 999,
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
  buyButton: {
    backgroundColor: "#222",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buyButtonText: {
    color: "#fff",
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
    top: 8,
    right: 10,
    padding: 5,
    borderRadius: 999,
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
});
