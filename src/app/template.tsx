"use client";

import { motion } from "framer-motion";
import { useAnimationsEnabled } from "@/components/animations/AnimationContext";

export default function Template({ children }: { children: React.ReactNode }) {
  const animationsEnabled = useAnimationsEnabled();

  if (!animationsEnabled) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
