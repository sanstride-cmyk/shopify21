import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Target, PenTool, TrendingUp, Zap } from "lucide-react";

const steps = [
  { text: "Analyzing product imagery...", icon: Zap, color: "text-blue-500" },
  { text: "Identifying optimal Indian audience...", icon: Target, color: "text-emerald-500" },
  { text: "Drafting high-converting hooks...", icon: PenTool, color: "text-primary" },
  { text: "Structuring video ad timeline...", icon: Sparkles, color: "text-purple-500" },
  { text: "Finalizing pricing psychology...", icon: TrendingUp, color: "text-rose-500" },
];

export function LoadingState() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Cycle through steps every 2.5 seconds (covers ~12.5s total)
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 2500);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto py-24 flex flex-col items-center justify-center min-h-[50vh]">
      <div className="relative w-32 h-32 mb-12 flex items-center justify-center">
        {/* Outer spinning ring */}
        <motion.div 
          className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        {/* Middle spinning ring */}
        <motion.div 
          className="absolute inset-4 rounded-full border-4 border-accent/20 border-l-accent"
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
        {/* Inner pulsing logo icon */}
        <motion.div
          animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Sparkles className="w-10 h-10 text-primary" />
        </motion.div>
      </div>

      <div className="h-16 relative w-full overflow-hidden flex justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.4, ease: "backOut" }}
            className="absolute flex items-center gap-3 text-xl md:text-2xl font-display font-medium text-secondary"
          >
            {(() => {
              const Icon = steps[currentStep].icon;
              return <Icon className={`w-6 h-6 ${steps[currentStep].color}`} />;
            })()}
            {steps[currentStep].text}
          </motion.div>
        </AnimatePresence>
      </div>
      
      <p className="mt-4 text-muted-foreground text-center max-w-md">
        Our AI is analyzing thousands of successful Indian dropshipping campaigns to build your custom creative pack.
      </p>

      {/* Progress bar */}
      <div className="w-64 h-2 bg-muted rounded-full mt-8 overflow-hidden">
        <motion.div 
          className="h-full bg-gradient-to-r from-primary to-accent"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 15, ease: "linear" }}
        />
      </div>
    </div>
  );
}
