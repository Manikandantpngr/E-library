"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Wand2 } from "lucide-react";
import { useState } from "react";
import { getRecommendationsAction } from "@/app/actions";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  readingHistory: z.string().min(10, {
    message: "Please tell us at least one book you've read.",
  }),
  preferences: z.string().min(10, {
    message: "Please describe your preferences.",
  }),
});

export function RecommendationsForm() {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const [recommendations, setRecommendations] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      readingHistory: "",
      preferences: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!currentUser) {
      toast({ variant: "destructive", title: "You must be logged in." });
      return;
    }
    
    setIsLoading(true);
    setRecommendations(null);

    try {
      const result = await getRecommendationsAction({
        userId: currentUser.id,
        ...values,
      });
      setRecommendations(result.recommendations);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not fetch recommendations. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="readingHistory"
                render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-lg">Your Reading History</FormLabel>
                    <FormControl>
                    <Textarea
                        placeholder="e.g., 'Dune (Frank Herbert), The Hobbit (J.R.R. Tolkien)'"
                        rows={4}
                        {...field}
                    />
                    </FormControl>
                    <FormDescription>
                    List some books you've enjoyed recently.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="preferences"
                render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-lg">Your Preferences</FormLabel>
                    <FormControl>
                    <Textarea
                        placeholder="e.g., 'I love epic fantasy with complex world-building, but I'm open to mystery novels as well.'"
                        rows={4}
                        {...field}
                    />
                    </FormControl>
                    <FormDescription>
                    What genres, themes, or authors do you like?
                    </FormDescription>
                    <FormMessage />
                </FormItem>
                )}
            />
            <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                    <>
                        <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                    </>
                ) : (
                    <>
                        <Wand2 className="mr-2 h-4 w-4" />
                        Get Recommendations
                    </>
                )}
            </Button>
            </form>
        </Form>
      
      {(isLoading || recommendations) && <Separator />}

      {isLoading && (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                    <Sparkles className="h-6 w-6 text-accent" />
                    Finding Your Next Read...
                </CardTitle>
                <CardDescription>Our AI is analyzing your taste to find the perfect books for you.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="h-4 bg-muted rounded-full w-full animate-pulse"></div>
                <div className="h-4 bg-muted rounded-full w-5/6 animate-pulse"></div>
                <div className="h-4 bg-muted rounded-full w-3/4 animate-pulse"></div>
            </CardContent>
        </Card>
      )}

      {recommendations && (
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl">Your Personalized Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm dark:prose-invert max-w-none">
              {recommendations.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
