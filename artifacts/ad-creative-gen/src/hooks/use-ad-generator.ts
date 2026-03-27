import { useMutation } from "@tanstack/react-query";

// Explicitly typing the expected response based on the OpenAPI schema
export interface AdCreativePack {
  primaryAngle: {
    angle: string;
    reason: string;
  };
  scrollStoppingHooks: string[];
  adCopyVariations: {
    hook: string;
    problem: string;
    solution: string;
    cta: string;
    fullCopy: string;
  }[];
  videoAdScript: {
    hook: string;
    problem: string;
    productInAction: string;
    resultAndCta: string;
  };
  imageCreativeIdeas: {
    conceptName: string;
    visualDescription: string;
    textOverlay: string;
    whyItConverts: string;
  }[];
  offerAndPricingAngle: {
    suggestedSellingPrice: string;
    discountPrice: string;
    offerType: string;
    psychologicalReason: string;
  };
  ctaOptions: string[];
}

export interface GenerateAdCreativeRequest {
  imageUrl: string;
  productCategory?: string;
  productName?: string;
}

export function useGenerateAdCreative() {
  return useMutation({
    mutationFn: async (data: GenerateAdCreativeRequest): Promise<AdCreativePack> => {
      const res = await fetch("/api/ad-creative/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        let errorMsg = "Failed to generate ad creative.";
        try {
          const errorData = await res.json();
          if (errorData.error) errorMsg = errorData.error;
        } catch (e) {
          // Ignore JSON parse error if response is not JSON
        }
        throw new Error(errorMsg);
      }

      return await res.json() as AdCreativePack;
    },
  });
}
