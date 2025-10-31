'use server';

/**
 * @fileOverview Provides personalized book recommendations based on user reading history and preferences.
 *
 * - getPersonalizedRecommendations - A function that retrieves personalized book recommendations for a user.
 * - PersonalizedRecommendationsInput - The input type for the getPersonalizedRecommendations function.
 * - PersonalizedRecommendationsOutput - The return type for the getPersonalizedRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedRecommendationsInputSchema = z.object({
  userId: z.string().describe('The ID of the user to generate recommendations for.'),
  readingHistory: z
    .string()
    .describe(
      'A comma-separated list of book titles the user has read, with author names in parentheses.'
    ),
  preferences: z
    .string()
    .describe(
      'A description of the user’s preferred genres, authors, and themes in books.'
    ),
});
export type PersonalizedRecommendationsInput = z.infer<
  typeof PersonalizedRecommendationsInputSchema
>;

const PersonalizedRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe(
      'A list of book recommendations tailored to the user’s reading history and preferences.'
    ),
});
export type PersonalizedRecommendationsOutput = z.infer<
  typeof PersonalizedRecommendationsOutputSchema
>;

export async function getPersonalizedRecommendations(
  input: PersonalizedRecommendationsInput
): Promise<PersonalizedRecommendationsOutput> {
  return personalizedBookRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedBookRecommendationsPrompt',
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  prompt: `You are an expert book recommender. A user will provide their reading history and preferences.

  Based on this information, recommend books that the user is likely to enjoy. Try to include a variety of authors and genres, but prioritize books that align closely with their stated preferences.

  Reading History: {{{readingHistory}}}
  Preferences: {{{preferences}}}

  Recommendations:`,
});

const personalizedBookRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedBookRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
