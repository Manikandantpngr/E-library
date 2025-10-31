import { books } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { X } from 'lucide-react';

export default function ReadPage({ params }: { params: { id: string } }) {
  const book = books.find((b) => b.id === params.id);

  if (!book) {
    notFound();
  }

  // Using description as placeholder for full book content
  const bookContent = book.description.repeat(20);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm p-4 flex justify-between items-center border-b">
        <div>
          <h1 className="text-xl font-bold font-headline">{book.title}</h1>
          <p className="text-sm text-muted-foreground">{book.author}</p>
        </div>
        <Button variant="ghost" size="icon" asChild>
          <Link href={`/book/${book.id}`}>
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </Link>
        </Button>
      </header>
      <main className="max-w-3xl mx-auto p-8">
        <div className="prose dark:prose-invert max-w-none">
          {bookContent.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  return books.map((book) => ({
    id: book.id,
  }));
}
