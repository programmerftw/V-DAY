import FloatingHearts from "@/components/FloatingHearts";
import LoveLetterHero from "@/components/LoveLetterHero";
import TapForLove from "@/components/TapForLove";
import ComplimentCarousel from "@/components/ComplimentCarousel";

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden" style={{
      background: "linear-gradient(180deg, hsl(340, 80%, 96%), hsl(280, 60%, 95%), hsl(340, 80%, 96%))",
    }}>
      <FloatingHearts />
      <LoveLetterHero />
      <TapForLove />
      <ComplimentCarousel />

      {/* Footer */}
      <footer className="relative z-10 text-center py-10 text-muted-foreground text-sm font-medium">
        <p className="font-display text-lg text-primary">Made with all my love for you 💕</p>
      </footer>
    </div>
  );
};

export default Index;
