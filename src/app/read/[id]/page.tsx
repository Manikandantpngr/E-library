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
    <div className="min-h-screen bg-[#333] text-zinc-300">
      <header className="sticky top-0 z-10 bg-[#212121] p-4 flex justify-between items-center border-b border-zinc-700 shadow-md">
        <div>
          <h1 className="text-xl font-bold font-headline text-white">{book.title}</h1>
          <p className="text-sm text-zinc-400">{book.author}</p>
        </div>
        <Button variant="ghost" size="icon" asChild className="text-zinc-400 hover:bg-zinc-700 hover:text-white">
          <Link href={`/book/${book.id}`}>
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </Link>
        </Button>
      </header>
      <main className="flex justify-center p-4 sm:p-8">
        <div className="bg-white text-zinc-900 shadow-2xl rounded-lg max-w-4xl w-full">
            <article className="p-8 sm:p-12 md:p-16 prose prose-lg prose-headings:font-headline prose-headings:font-bold prose-headings:text-zinc-800 prose-p:text-justify max-w-none">
            <h2 className="text-3xl !mb-0">{book.title}</h2>
            <h3 className="text-2xl text-zinc-500 !-mt-0">{book.author}</h3>

            {bookContent.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}
            </article>
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
