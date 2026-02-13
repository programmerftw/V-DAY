import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Heart {
  id: number;
  x: number;
  size: number;
  color: string;
  delay: number;
  duration: number;
  emoji: string;
}

const HEART_EMOJIS = ["💕", "💖", "💗", "💝", "🩷", "❤️", "💜", "🩵"];
const COLORS = [
  "hsl(340, 82%, 65%)",
  "hsl(280, 60%, 80%)",
  "hsl(20, 80%, 85%)",
  "hsl(350, 70%, 55%)",
  "hsl(330, 60%, 92%)",
];

let heartId = 0;

const FloatingHearts = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const createHeart = () => {
      const heart: Heart = {
        id: heartId++,
        x: Math.random() * 100,
        size: 16 + Math.random() * 24,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        delay: 0,
        duration: 6 + Math.random() * 6,
        emoji: HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)],
      };
      setHearts((prev) => [...prev.slice(-20), heart]);
    };

    // Initial batch
    for (let i = 0; i < 8; i++) {
      setTimeout(createHeart, i * 400);
    }

    const interval = setInterval(createHeart, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ y: "110vh", x: `${heart.x}vw`, opacity: 0.8, rotate: 0 }}
            animate={{
              y: "-10vh",
              x: [`${heart.x}vw`, `${heart.x + (Math.random() - 0.5) * 15}vw`, `${heart.x}vw`],
              rotate: [0, 15, -15, 0],
              opacity: [0.8, 1, 0.6, 0],
            }}
            transition={{
              duration: heart.duration,
              ease: "easeOut",
              x: { duration: heart.duration, repeat: 0, ease: "easeInOut" },
            }}
            onAnimationComplete={() =>
              setHearts((prev) => prev.filter((h) => h.id !== heart.id))
            }
            style={{ fontSize: heart.size, position: "absolute" }}
          >
            {heart.emoji}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FloatingHearts;
