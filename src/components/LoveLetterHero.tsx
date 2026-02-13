import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sparkles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: (Math.random() - 0.5) * 200,
  y: (Math.random() - 0.5) * 200,
  emoji: ["✨", "⭐", "💫", "🌟"][i % 4],
  delay: i * 0.08,
}));

const LoveLetterHero = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [letterY, setLetterY] = useState(-120);

  // adjust letter slide distance for small screens so it stays fully visible
  useEffect(() => {
    const update = () => {
      const w = typeof window !== "undefined" ? window.innerWidth : 1024;
      setLetterY(w < 640 ? -80 : -120);
    };
    update();
    const onResize = () => update();
    if (typeof window !== "undefined") window.addEventListener("resize", onResize);
    return () => {
      if (typeof window !== "undefined") window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center min-h-[70vh] px-4 z-10">
      {/* Sparkles */}
      <AnimatePresence>
        {isOpen &&
          sparkles.map((s) => (
            <motion.span
              key={s.id}
              initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0], x: s.x, y: s.y }}
              transition={{ duration: 1.2, delay: s.delay + 0.3, ease: "easeOut" }}
              className="absolute text-2xl pointer-events-none"
              style={{ zIndex: 20 }}
            >
              {s.emoji}
            </motion.span>
          ))}
      </AnimatePresence>

      {/* Envelope */}
      <motion.div
        className="relative cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Envelope body */}
        <motion.div
          className="relative w-72 h-48 sm:w-80 sm:h-52 rounded-2xl shadow-lg overflow-hidden"
          style={{ background: "hsl(20, 80%, 85%)" }}
          animate={isOpen ? { y: 20 } : { y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          {/* Envelope flap */}
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 origin-top"
            style={{
              background: "linear-gradient(135deg, hsl(340, 82%, 75%), hsl(20, 80%, 80%))",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            }}
            animate={isOpen ? { rotateX: 180, opacity: 0.5 } : { rotateX: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 150, damping: 20 }}
          />

          {/* Heart seal */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl z-10"
            animate={isOpen ? { scale: 0, rotate: 360 } : { scale: [1, 1.1, 1] }}
            transition={
              isOpen
                ? { type: "spring", stiffness: 200 }
                : { repeat: Infinity, duration: 2, ease: "easeInOut" }
            }
          >
            💌
          </motion.div>
        </motion.div>

        {/* Letter sliding out */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
            initial={{ y: 0, opacity: 0 }}
              animate={{ y: letterY, opacity: 1 }}
              exit={{ y: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.2 }}
              className="absolute left-1/2 -translate-x-1/2 w-64 sm:w-72 rounded-2xl p-6 text-center shadow-xl z-30"
              style={{ background: "hsl(0, 0%, 100%)", bottom: "20px" }}
            >
              <p className="font-display text-xl sm:text-2xl text-primary leading-relaxed">
                You make my heart skip a beat! 💓
              </p>
              <p className="text-sm text-muted-foreground mt-3 font-medium">
                Happy Valentine's Day! 🌹
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Instruction text */}
      <motion.p
        className="mt-8 text-muted-foreground text-sm font-medium"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        {isOpen ? "Tap to close 💕" : "Tap the envelope to open! 💌"}
      </motion.p>
    </section>
  );
};

export default LoveLetterHero;
