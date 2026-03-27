import { motion } from "framer-motion";
import { 
  Target, 
  Lightbulb, 
  PenTool, 
  Video, 
  Image as ImageIcon, 
  Tag, 
  MousePointerClick,
  CheckCircle2,
  Play,
  ArrowRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { CopyButton } from "./copy-button";
import type { AdCreativePack } from "@/hooks/use-ad-generator";

interface CreativePackDisplayProps {
  data: AdCreativePack;
  imageUrl: string;
}

const containerVars = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVars = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export function CreativePackDisplay({ data, imageUrl }: CreativePackDisplayProps) {
  return (
    <motion.div 
      className="max-w-6xl mx-auto space-y-8 pb-24"
      variants={containerVars}
      initial="hidden"
      animate="show"
    >
      {/* Header Summary */}
      <motion.div variants={itemVars} className="flex flex-col md:flex-row gap-8 items-start bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-border/50">
        <div className="w-full md:w-1/4 aspect-square rounded-2xl overflow-hidden bg-muted flex-shrink-0 relative">
          <img src={imageUrl} alt="Product" className="w-full h-full object-cover" />
          <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl"></div>
        </div>
        <div className="flex-1 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                <Target className="w-3 h-3 mr-1" /> Primary Angle
              </Badge>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-secondary">
              {data.primaryAngle.angle}
            </h2>
            <p className="text-lg text-muted-foreground mt-3 leading-relaxed">
              {data.primaryAngle.reason}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-border/50">
             <div className="space-y-1">
               <p className="text-sm text-muted-foreground">Selling Price</p>
               <p className="font-bold text-secondary text-xl">{data.offerAndPricingAngle.discountPrice}</p>
             </div>
             <div className="space-y-1">
               <p className="text-sm text-muted-foreground">MRP</p>
               <p className="font-bold text-muted-foreground text-xl line-through">{data.offerAndPricingAngle.suggestedSellingPrice}</p>
             </div>
             <div className="space-y-1 col-span-2">
               <p className="text-sm text-muted-foreground">Offer Type</p>
               <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 px-3 py-1 text-sm border-none">
                 {data.offerAndPricingAngle.offerType}
               </Badge>
             </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column (Hooks & CTAs) */}
        <div className="space-y-8 lg:col-span-1">
          {/* Hooks */}
          <motion.div variants={itemVars}>
            <Card className="h-full bg-gradient-to-b from-white to-orange-50/30">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                      <Lightbulb className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-xl">Scroll-Stoppers</CardTitle>
                  </div>
                  <CopyButton 
                    content={data.scrollStoppingHooks.join("\n\n")} 
                    label="Copy All" 
                    size="sm" 
                    variant="outline" 
                  />
                </div>
                <CardDescription>First 3 seconds that grab attention</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {data.scrollStoppingHooks.map((hook, i) => (
                  <div key={i} className="group flex items-start gap-3 p-3 rounded-xl hover:bg-white border border-transparent hover:border-orange-100 hover:shadow-sm transition-all">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-xs font-bold mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-sm font-medium text-secondary flex-1 leading-snug">{hook}</p>
                    <CopyButton content={hook} className="opacity-0 group-hover:opacity-100 flex-shrink-0" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Pricing Psychology */}
          <motion.div variants={itemVars}>
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg">
                    <Tag className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-xl">Pricing Angle</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                  <h4 className="font-semibold text-emerald-900 mb-2">Why this works in India:</h4>
                  <p className="text-sm text-emerald-800 leading-relaxed">
                    {data.offerAndPricingAngle.psychologicalReason}
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={itemVars}>
            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                    <MousePointerClick className="w-5 h-5" />
                  </div>
                  <CardTitle className="text-xl">Call To Actions</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {data.ctaOptions.map((cta, i) => (
                  <Badge key={i} variant="outline" className="px-3 py-1.5 text-sm cursor-pointer hover:bg-secondary hover:text-white transition-colors">
                    {cta}
                  </Badge>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column (Copy, Video, Images) */}
        <div className="space-y-8 lg:col-span-2">
          
          {/* Video Script */}
          <motion.div variants={itemVars}>
            <Card className="border-primary/20 shadow-md shadow-primary/5 overflow-hidden">
              <div className="h-1.5 w-full bg-gradient-to-r from-primary via-orange-400 to-rose-400"></div>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary/10 text-primary rounded-lg">
                      <Video className="w-5 h-5" />
                    </div>
                    <CardTitle className="text-2xl">Reels/Shorts Script</CardTitle>
                  </div>
                  <CopyButton 
                    content={`0-3s: ${data.videoAdScript.hook}\n3-8s: ${data.videoAdScript.problem}\n8-15s: ${data.videoAdScript.productInAction}\n15-20s: ${data.videoAdScript.resultAndCta}`}
                    label="Copy Script" 
                    variant="outline" 
                  />
                </div>
                <CardDescription>Optimized for 20-second retention drops</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative border-l-2 border-muted ml-3 space-y-8 pb-4">
                  {[
                    { time: "0-3s", title: "The Hook", content: data.videoAdScript.hook, color: "bg-rose-500" },
                    { time: "3-8s", title: "Agitate Problem", content: data.videoAdScript.problem, color: "bg-orange-500" },
                    { time: "8-15s", title: "Product Demo", content: data.videoAdScript.productInAction, color: "bg-primary" },
                    { time: "15-20s", title: "Result & CTA", content: data.videoAdScript.resultAndCta, color: "bg-emerald-500" },
                  ].map((segment, i) => (
                    <div key={i} className="relative pl-8 group">
                      {/* Timeline dot */}
                      <div className={`absolute -left-[9px] top-1 w-4 h-4 rounded-full border-4 border-white shadow-sm ${segment.color}`}></div>
                      
                      <div className="bg-muted/30 rounded-2xl p-4 border border-border/50 group-hover:border-primary/30 transition-colors">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="secondary" className="font-mono">{segment.time}</Badge>
                          <span className="font-semibold text-secondary">{segment.title}</span>
                        </div>
                        <p className="text-secondary leading-relaxed">{segment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Ad Copy Variations */}
          <motion.div variants={itemVars}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                  <PenTool className="w-5 h-5" />
                </div>
                <h3 className="text-2xl font-display font-bold text-secondary">Ad Copy Variations</h3>
              </div>
            </div>
            <div className="space-y-4">
              {data.adCopyVariations.map((copy, i) => (
                <Card key={i} className="hover:border-primary/30 transition-colors">
                  <CardHeader className="pb-3 pt-5">
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="bg-background">Variation {i + 1}</Badge>
                      <CopyButton content={copy.fullCopy} label="Copy Text" size="sm" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-secondary whitespace-pre-wrap leading-relaxed">
                      {copy.fullCopy}
                    </p>
                    <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-2">
                      <span className="inline-flex items-center text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
                        <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-500" /> Hook included
                      </span>
                      <span className="inline-flex items-center text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
                        <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-500" /> Agitation
                      </span>
                      <span className="inline-flex items-center text-xs text-muted-foreground bg-muted px-2 py-1 rounded-md">
                        <CheckCircle2 className="w-3 h-3 mr-1 text-emerald-500" /> Solution + CTA
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

          {/* Image Concepts */}
          <motion.div variants={itemVars}>
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-pink-100 text-pink-600 rounded-lg">
                <ImageIcon className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-display font-bold text-secondary">Static Image Concepts</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.imageCreativeIdeas.map((idea, i) => (
                <Card key={i} className="h-full bg-gradient-to-br from-white to-pink-50/20">
                  <CardHeader className="pb-2">
                    <Badge className="w-fit mb-2 bg-pink-100 text-pink-700 hover:bg-pink-100 border-none">Concept {i + 1}</Badge>
                    <CardTitle className="text-lg leading-tight">{idea.conceptName}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Visual</p>
                      <p className="text-sm text-secondary">{idea.visualDescription}</p>
                    </div>
                    <div className="bg-black/5 p-3 rounded-lg border border-black/5">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Text Overlay</p>
                      <p className="text-sm font-bold text-secondary font-display">"{idea.textOverlay}"</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-1">
                        <TrendingUp className="w-3 h-3" /> Why it works
                      </p>
                      <p className="text-sm text-muted-foreground">{idea.whyItConverts}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}
