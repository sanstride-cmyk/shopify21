import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link2, ShoppingBag, Tag, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  imageUrl: z.string().url({ message: "Please enter a valid image URL" }),
  productName: z.string().optional(),
  productCategory: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface GeneratorFormProps {
  onSubmit: (data: FormValues) => void;
  isPending: boolean;
  className?: string;
}

export function GeneratorForm({ onSubmit, isPending, className }: GeneratorFormProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: "",
      productName: "",
      productCategory: "",
    },
  });

  const watchImageUrl = watch("imageUrl");

  const handleImageError = () => {
    setImagePreview(null);
  };

  const handleImageLoad = () => {
    setImagePreview(watchImageUrl);
  };

  return (
    <Card className={cn("overflow-hidden border-border/50 shadow-xl shadow-black/5 bg-white/80 backdrop-blur-xl", className)}>
      <CardContent className="p-0">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row h-full">
          
          {/* Left Side - Form Inputs */}
          <div className="flex-1 p-6 sm:p-8 md:p-10 space-y-6">
            <div className="space-y-2">
              <h2 className="text-2xl font-display font-bold text-secondary">
                Generate Ad Creatives
              </h2>
              <p className="text-muted-foreground text-sm">
                Paste a product image URL and we'll generate angles, copy, and video scripts optimized for the Indian market.
              </p>
            </div>

            <div className="space-y-5 pt-4">
              <div className="space-y-2">
                <Label htmlFor="imageUrl" className="flex items-center gap-2">
                  <Link2 className="w-4 h-4 text-primary" /> Product Image URL <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="imageUrl"
                  placeholder="https://example.com/product.jpg"
                  {...register("imageUrl")}
                  className={errors.imageUrl ? "border-destructive focus-visible:ring-destructive/20" : ""}
                  disabled={isPending}
                  onBlur={(e) => {
                    // Quick check if it might be an image URL before trying to load
                    if (e.target.value && e.target.value.startsWith('http')) {
                      setImagePreview(e.target.value);
                    }
                  }}
                />
                {errors.imageUrl && (
                  <p className="text-sm text-destructive font-medium">{errors.imageUrl.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="productName" className="flex items-center gap-2 text-muted-foreground">
                    <ShoppingBag className="w-4 h-4" /> Product Name (Optional)
                  </Label>
                  <Input
                    id="productName"
                    placeholder="e.g. Posture Corrector Pro"
                    {...register("productName")}
                    disabled={isPending}
                    className="bg-muted/30"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="productCategory" className="flex items-center gap-2 text-muted-foreground">
                    <Tag className="w-4 h-4" /> Category (Optional)
                  </Label>
                  <Input
                    id="productCategory"
                    placeholder="e.g. Health & Wellness"
                    {...register("productCategory")}
                    disabled={isPending}
                    className="bg-muted/30"
                  />
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Button 
                type="submit" 
                size="lg" 
                className="w-full text-base bg-gradient-to-r from-primary to-orange-500 hover:from-primary hover:to-orange-600 shadow-primary"
                disabled={isPending}
              >
                {isPending ? (
                  <>
                    <Sparkles className="w-5 h-5 mr-2 animate-pulse" />
                    Generating Magic...
                  </>
                ) : (
                  <>
                    Generate Ad Pack
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Right Side - Image Preview */}
          <div className="w-full md:w-[40%] bg-muted/30 border-t md:border-t-0 md:border-l border-border/50 p-6 sm:p-8 flex flex-col justify-center items-center min-h-[250px]">
            {watchImageUrl && !errors.imageUrl ? (
              <div className="relative w-full aspect-square max-w-[280px] rounded-2xl overflow-hidden shadow-lg border border-border bg-white">
                {/* We use an img tag but hide it via opacity if it fails, showing a fallback */}
                <img 
                  src={watchImageUrl} 
                  alt="Preview" 
                  className={cn("w-full h-full object-cover transition-opacity duration-300", imagePreview === null ? "opacity-0" : "opacity-100")}
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                />
                {imagePreview === null && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground p-6 text-center">
                    <Sparkles className="w-8 h-8 mb-3 opacity-20" />
                    <p className="text-sm font-medium">Image preview unavailable</p>
                    <p className="text-xs mt-1 opacity-70">We'll still try to process the URL.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full aspect-square max-w-[280px] rounded-2xl border-2 border-dashed border-border flex flex-col items-center justify-center text-muted-foreground p-6 text-center bg-white/50">
                <div className="w-16 h-16 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8" />
                </div>
                <p className="font-medium text-secondary">Ready for magic</p>
                <p className="text-sm mt-1">Paste a valid image URL to see a preview</p>
              </div>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
