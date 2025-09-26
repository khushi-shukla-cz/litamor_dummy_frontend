import { router } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/splashScreen");
    }, 10); // Show splash screen on first load
    return () => clearTimeout(timer);
  }, []);
  return null;
}
