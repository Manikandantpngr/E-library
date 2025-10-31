import AppLayout from "@/components/layouts/app-layout";
import { RecommendationsForm } from "@/components/recommendations-form";

export default function RecommendationsPage() {
  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <div className="space-y-2 mb-8">
            <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">AI Book Recommender</h1>
            <p className="text-muted-foreground">Let our AI find your next favorite book based on your unique taste.</p>
        </div>
        <RecommendationsForm />
      </div>
    </AppLayout>
  );
}
