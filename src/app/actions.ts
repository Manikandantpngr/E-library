"use server";

import { getPersonalizedRecommendations } from "@/ai/flows/personalized-book-recommendations";
import type { PersonalizedRecommendationsInput, PersonalizedRecommendationsOutput } from "@/ai/flows/personalized-book-recommendations";

export async function getRecommendationsAction(
  input: PersonalizedRecommendationsInput
): Promise<PersonalizedRecommendationsOutput> {
  try {
    const recommendations = await getPersonalizedRecommendations(input);
    return recommendations;
  } catch (error) {
    console.error("Error getting recommendations:", error);
    throw new Error("Failed to get recommendations from AI.");
  }
}
