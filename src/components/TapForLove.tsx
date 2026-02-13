import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

const EMOJIS = ["💕", "✨", "🥰", "💌", "💖", "💗", "⭐", "🩷", "😍", "💝"];

let particleId = 0;

const TapForLove = () => {
  const [count, setCount] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);

  const handleTap = useCallback(() => {
    setCount((c) => c + 1);
    const newParticles: Particle[] = Array.from({ length: 8 }, () => ({
      id: particleId++,
      x: (Math.random() - 0.5) * 250,
      y: (Math.random() - 0.5) * 250 - 50,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    }));
    setParticles((prev) => [...prev.slice(-30), ...newParticles]);
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center py-20 px-4 z-10">
      <motion.h2
        className="font-display text-3xl sm:text-4xl text-primary mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        Click Heartto Spread the Love!
      </motion.h2>

      <div className="relative">
        {/* Particles */}
        <AnimatePresence>
          {particles.map((p) => (
            <motion.span
              key={p.id}
              initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              animate={{ opacity: 0, scale: [1, 1.5, 0], x: p.x, y: p.y }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              onAnimationComplete={() =>
                setParticles((prev) => prev.filter((pp) => pp.id !== p.id))
              }
              className="absolute left-1/2 top-1/2 text-xl sm:text-2xl pointer-events-none z-20"
            >
              {p.emoji}
            </motion.span>
          ))}
        </AnimatePresence>

        {/* Big heart button */}
        <motion.button
          onClick={handleTap}
          className="relative text-7xl sm:text-8xl select-none focus:outline-none"
          animate={{
            scale: [1, 1.08, 1],
            rotate: [0, 3, -3, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut",
          }}
          whileTap={{ scale: 1.3 }}
        >
          💖
        </motion.button>
      </div>

      {/* Counter */}
      <motion.div
        className="mt-8 rounded-full px-6 py-3 shadow-md font-semibold text-lg"
        style={{
          background: "linear-gradient(135deg, hsl(340, 82%, 90%), hsl(280, 60%, 90%))",
        }}
        animate={{ scale: count > 0 ? [1, 1.1, 1] : 1 }}
        transition={{ duration: 0.3 }}
        key={count}
      >
        <span className="text-primary">You've spread </span>
        <span className="font-display text-xl text-primary">{count}</span>
        <span className="text-primary"> love! 💕</span>
      </motion.div>
    </section>
  );
};

export default TapForLove;
