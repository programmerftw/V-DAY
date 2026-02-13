import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const compliments = [
  { text: "You're un-BEAR-ably cute", emoji: "🧸", bg: "hsl(340, 82%, 90%)" },
  { text: "You're one in a MELON", emoji: "🍉", bg: "hsl(280, 60%, 90%)" },
  { text: "You're the BERRY best", emoji: "🍓", bg: "hsl(350, 70%, 90%)" },
  { text: "I'm BANANAS for you", emoji: "🍌", bg: "hsl(45, 80%, 90%)" },
  { text: "You're so FAWN-cy", emoji: "🦌", bg: "hsl(20, 80%, 90%)" },
  { text: "You've stolen a PIZZA my heart", emoji: "🍕", bg: "hsl(15, 80%, 90%)" },
  { text: "You're TEA-riffic", emoji: "🍵", bg: "hsl(140, 50%, 90%)" },
  { text: "I love you a LATTE", emoji: "☕", bg: "hsl(25, 60%, 90%)" },
];

const ComplimentCarousel = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const paginate = (dir: number) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + compliments.length) % compliments.length);
  };

  const current = compliments[index];

  return (
    <section className="relative flex flex-col items-center justify-center py-20 px-4 z-10">
      <motion.h2
        className="font-display text-3xl sm:text-4xl text-primary mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        Sweet Babbyyyyy!!! 💬
      </motion.h2>

      <div className="relative w-full max-w-sm h-64">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            initial={{ x: direction * 300, opacity: 0, scale: 0.8, rotate: direction * 10 }}
            animate={{ x: 0, opacity: 1, scale: 1, rotate: 0 }}
            exit={{ x: direction * -300, opacity: 0, scale: 0.8, rotate: direction * -10 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl shadow-lg p-8 cursor-grab"
            style={{ background: current.bg }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.8}
            onDragEnd={(_, info) => {
              if (Math.abs(info.offset.x) > 80) {
                paginate(info.offset.x > 0 ? -1 : 1);
              }
            }}
          >
            <motion.span
              className="text-6xl sm:text-7xl mb-4"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              {current.emoji}
            </motion.span>
            <p className="font-display text-xl sm:text-2xl text-foreground text-center leading-relaxed">
              {current.text}
            </p>
            <p className="text-3xl mt-2">💕</p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation dots */}
      <div className="flex gap-2 mt-8">
        {compliments.map((_, i) => (
          <motion.button
            key={i}
            onClick={() => {
              setDirection(i > index ? 1 : -1);
              setIndex(i);
            }}
            className="w-3 h-3 rounded-full focus:outline-none"
            style={{
              background: i === index ? "hsl(340, 82%, 65%)" : "hsl(330, 40%, 85%)",
            }}
            whileHover={{ scale: 1.3 }}
            animate={i === index ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.5 }}
          />
        ))}
      </div>

      <p className="text-muted-foreground text-sm mt-4 font-medium">
        Swipe or tap dots for more 💌
      </p>
    </section>
  );
};

export default ComplimentCarousel;
