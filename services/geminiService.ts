
import { GoogleGenAI } from "@google/genai";

// Fix: Updated the transformation function to strictly follow Google GenAI SDK standards and handle image parts correctly.
export async function generateTransformedImage(
  base64Image: string,
  prompt: string,
  aspectRatio: "1:1" | "3:4" | "4:3" | "9:16" | "16:9" = "16:9"
): Promise<string | null> {
  try {
    // Fix: Using process.env.API_KEY directly for initialization.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Clean base64 string
    const dataOnly = base64Image.split(',')[1];
    const mimeType = base64Image.split(',')[0].split(':')[1].split(';')[0];

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: dataOnly,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: aspectRatio
        }
      }
    });

    // Fix: Iterating through parts to find the image part and using the returned mimeType for the data URL.
    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }

    return null;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
}
