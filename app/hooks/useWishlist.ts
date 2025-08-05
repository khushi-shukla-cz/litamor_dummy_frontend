// app/hooks/useWishlist.ts
import { useState } from "react";

export const useWishlist = () => {
  const [wishlisted, setWishlisted] = useState<string[]>([]);

  const toggleWishlist = (id: string) => {
    setWishlisted((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return { wishlisted, toggleWishlist };
};
