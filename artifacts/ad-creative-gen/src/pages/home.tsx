import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RefreshCw } from "lucide-react";
import { GeneratorForm } from "@/components/generator-form";
import { LoadingState } from "@/components/loading-state";
import { CreativePackDisplay } from "@/components/creative-pack-display";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGenerateAdCreative, type GenerateAdCreativeRequest, type AdCreativePack } from "@/hooks/use-ad-generator";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [result, setResult] = useState<{ data: AdCreativePack; imageUrl: string } | null>(null);
  const { mutate, isPending } = useGenerateAdCreative();
  const { toast } = useToast();

  const handleGenerate = (data: GenerateAdCreativeRequest) => {
    mutate(data, {
      onSuccess: (response) => {
        setResult({ data: response, imageUrl: data.imageUrl });
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      onError: (error) => {
        toast({
          title: "Generation Failed",
          description: error.message || "An unexpected error occurred while generating.",
          variant: "destructive",
        });
      }
    });
  };

  const handleReset = () => {
    setResult(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 bg-mesh opacity-50 pointer-events-none"></div>
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-primary/5 to-transparent z-0 pointer-events-none"></div>
      
      {/* Navbar */}
      <nav className="relative z-10 border-b border-border/50 bg-white/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src={`${import.meta.env.BASE_URL}images/logo-mark.png`} 
              alt="AdGenius Logo" 
              className="w-8 h-8 object-contain"
              onError={(e) => {
                // Fallback icon if image not loaded yet
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement?.insertAdjacentHTML('afterbegin', '<div class="w-8 h-8 rounded bg-primary text-white flex items-center justify-center font-bold text-lg">A</div>');
              }}
            />
            <span className="font-display font-bold text-xl text-secondary tracking-tight">AdGenius <span className="text-primary">India</span></span>
          </div>
          
          <div className="hidden sm:flex items-center gap-4 text-sm font-medium text-muted-foreground">
            <span>Built for Indian Dropshippers</span>
            <Badge variant="outline" className="border-primary/30 text-primary bg-primary/5">Beta</Badge>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        
        <AnimatePresence mode="wait">
          {!result && !isPending && (
            <motion.div
              key="hero"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="text-center mb-12 space-y-6">
                <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100 mb-4 px-4 py-1.5 text-sm font-bold border-none uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 mr-2 inline" />
                  AI-Powered Ad Creatives
                </Badge>
                <h1 className="text-4xl md:text-6xl font-display font-extrabold text-secondary leading-tight">
                  Turn <span className="text-gradient">Products</span> into<br/> High-Converting Ads
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                  Stop guessing what works in India. Upload a product image and instantly get winning hooks, localized copy, video scripts, and pricing psychology.
                </p>
              </div>

              <GeneratorForm onSubmit={handleGenerate} isPending={isPending} />
              
              {/* Social Proof / Stats */}
              <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-border/50 pt-10 text-center">
                <div>
                  <h4 className="text-3xl font-display font-bold text-secondary">30s</h4>
                  <p className="text-sm text-muted-foreground mt-1">Generation Time</p>
                </div>
                <div>
                  <h4 className="text-3xl font-display font-bold text-secondary">5+</h4>
                  <p className="text-sm text-muted-foreground mt-1">Angles per product</p>
                </div>
                <div>
                  <h4 className="text-3xl font-display font-bold text-secondary">Desi</h4>
                  <p className="text-sm text-muted-foreground mt-1">Market Logic</p>
                </div>
                <div>
                  <h4 className="text-3xl font-display font-bold text-secondary">10x</h4>
                  <p className="text-sm text-muted-foreground mt-1">Faster testing</p>
                </div>
              </div>
            </motion.div>
          )}

          {isPending && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
            >
              <LoadingState />
            </motion.div>
          )}

          {result && !isPending && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="w-full"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 bg-white/50 backdrop-blur-md p-4 rounded-2xl border border-border/50 sticky top-4 z-50 shadow-sm">
                <div>
                  <h2 className="text-xl font-display font-bold text-secondary flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    Your Creative Pack is Ready
                  </h2>
                  <p className="text-sm text-muted-foreground">Optimized for Facebook & Instagram Ads in India</p>
                </div>
                <Button onClick={handleReset} variant="outline" className="bg-white">
                  <RefreshCw className="w-4 h-4 mr-2" /> Start New Product
                </Button>
              </div>

              <CreativePackDisplay data={result.data} imageUrl={result.imageUrl} />
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
}
