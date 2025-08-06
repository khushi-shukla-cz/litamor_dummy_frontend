// app/hooks/useWishlist.ts
import { useState } from "react";

export interface WishlistItem {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: any;
}

export const useWishlist = () => {
  const [wishlisted, setWishlisted] = useState<string[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  const toggleWishlist = (item: WishlistItem) => {
    const isWishlisted = wishlisted.includes(item.id);
    
    if (isWishlisted) {
      // Remove from wishlist
      setWishlisted((prev) => prev.filter((id) => id !== item.id));
      setWishlistItems((prev) => prev.filter((wishlistItem) => wishlistItem.id !== item.id));
    } else {
      // Add to wishlist
      setWishlisted((prev) => [...prev, item.id]);
      setWishlistItems((prev) => [...prev, item]);
    }
  };

  const isWishlisted = (id: string) => wishlisted.includes(id);

  return { 
    wishlisted, 
    wishlistItems,
    toggleWishlist, 
    isWishlisted 
  };
};

export default useWishlist;
