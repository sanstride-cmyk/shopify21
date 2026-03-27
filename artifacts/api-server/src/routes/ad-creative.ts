import { Router, type IRouter } from "express";
import { GenerateAdCreativeBody } from "@workspace/api-zod";
import { openai } from "@workspace/integrations-openai-ai-server";

const router: IRouter = Router();

router.post("/ad-creative/generate", async (req, res) => {
  const parsed = GenerateAdCreativeBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const { imageUrl, productCategory, productName } = parsed.data;

  const systemPrompt = `You are a high-conversion ecommerce ad expert specializing in Indian dropshipping products.
Analyze the product and generate a COMPLETE ad creative pack designed to maximize clicks and conversions on Facebook and Instagram.
Target Audience: Indian buyers (price-sensitive, COD preference, trust issues with online shopping)
Platform: Facebook / Instagram Ads

DO NOT produce generic or fluffy output. Everything must feel like a real winning ad.
Do NOT sound like AI. Focus on Indian buyer psychology.
No generic phrases like "high quality" or "best product".
Use simple English or Hinglish where it converts better.

You MUST respond with ONLY valid JSON matching the exact structure below. No explanation, no markdown, just JSON:

{
  "primaryAngle": {
    "angle": "Name of the angle (e.g. Problem → Solution)",
    "reason": "1 line WHY this angle works for this product"
  },
  "scrollStoppingHooks": [
    "Hook 1 (max 10 words, pattern interrupt)",
    "Hook 2",
    "Hook 3",
    "Hook 4",
    "Hook 5"
  ],
  "adCopyVariations": [
    {
      "hook": "Opening hook line",
      "problem": "Pain point description",
      "solution": "Product as solution",
      "cta": "Call to action",
      "fullCopy": "Full 80-100 word ad copy combining all elements"
    },
    { "hook": "...", "problem": "...", "solution": "...", "cta": "...", "fullCopy": "..." },
    { "hook": "...", "problem": "...", "solution": "...", "cta": "...", "fullCopy": "..." }
  ],
  "videoAdScript": {
    "hook": "0-3 sec: Hook visual + text description",
    "problem": "3-8 sec: Show problem scene description",
    "productInAction": "8-15 sec: Product in action description",
    "resultAndCta": "15-20 sec: Result + CTA scene description"
  },
  "imageCreativeIdeas": [
    {
      "conceptName": "Concept name",
      "visualDescription": "Visual description",
      "textOverlay": "Bold short text overlay",
      "whyItConverts": "Why it converts"
    },
    { "conceptName": "...", "visualDescription": "...", "textOverlay": "...", "whyItConverts": "..." },
    { "conceptName": "...", "visualDescription": "...", "textOverlay": "...", "whyItConverts": "..." }
  ],
  "offerAndPricingAngle": {
    "suggestedSellingPrice": "₹999",
    "discountPrice": "₹599",
    "offerType": "Limited time deal / combo / etc",
    "psychologicalReason": "Why this pricing works for Indian buyers"
  },
  "ctaOptions": [
    "CTA 1",
    "CTA 2",
    "CTA 3",
    "CTA 4",
    "CTA 5"
  ]
}`;

  const userContent: Array<{ type: string; text?: string; image_url?: { url: string } }> = [
    {
      type: "text",
      text: `Analyze this product and generate the complete ad creative pack.
Product Image URL: ${imageUrl}
${productCategory ? `Product Category: ${productCategory}` : ""}
${productName ? `Product Name: ${productName}` : ""}

Generate highly specific, conversion-focused content based on the actual product. Make it feel real, not generic.`,
    },
    {
      type: "image_url",
      image_url: { url: imageUrl },
    },
  ];

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-5.2",
      max_completion_tokens: 8192,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userContent as Parameters<typeof openai.chat.completions.create>[0]["messages"][0]["content"] },
      ],
    });

    const rawContent = response.choices[0]?.message?.content ?? "";

    let adPack;
    try {
      const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No JSON found in response");
      }
      adPack = JSON.parse(jsonMatch[0]);
    } catch {
      req.log.error({ rawContent }, "Failed to parse AI response as JSON");
      res.status(500).json({ error: "Failed to parse AI response" });
      return;
    }

    res.json(adPack);
  } catch (err) {
    req.log.error({ err }, "Error generating ad creative");
    res.status(500).json({ error: "Failed to generate ad creative pack" });
  }
});

export default router;
