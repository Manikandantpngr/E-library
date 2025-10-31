'use client';

import { books } from '@/lib/data';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { X, Book, Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export default function ReadPage({ params }: { params: { id: string } }) {
  const book = books.find(b => b.id === params.id);

  if (!book) {
    notFound();
  }

  const bookImage = PlaceHolderImages.find(p => p.id === book.coverImage);

  // Using description as placeholder for full book content
  const bookContent = book.description.repeat(10);
  const chapters = [
    'Chapter 1: The Beginning',
    'Chapter 2: The Discovery',
    'Chapter 3: The Challenge',
    'Chapter 4: The Climax',
    'Chapter 5: The Resolution',
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#1a1a1a] text-zinc-300 font-serif">
      <header className="sticky top-0 z-20 bg-[#212121] p-3 flex justify-between items-center border-b border-zinc-700 shadow-md">
        <div className="flex items-center gap-4">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="text-zinc-400 hover:bg-zinc-700 hover:text-white"
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Table of Contents</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="bg-[#212121] text-zinc-300 border-zinc-700">
              <SheetHeader>
                <SheetTitle className="text-primary font-headline text-2xl">
                  Table of Contents
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-8">
                <ul className="space-y-3">
                  {chapters.map((chapter, index) => (
                    <li key={index}>
                      <a href="#" className="block p-2 rounded-md hover:bg-zinc-700 transition-colors">
                        {chapter}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex items-center gap-2">
            <Book className="h-6 w-6 text-primary" />
            <h1 className="text-lg font-bold font-headline text-white truncate">
              {book.title}
            </h1>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="text-zinc-400 hover:bg-zinc-700 hover:text-white"
        >
          <Link href={`/book/${book.id}`}>
            <X className="h-6 w-6" />
            <span className="sr-only">Close</span>
          </Link>
        </Button>
      </header>

      <main className="flex-grow p-6 sm:p-8 md:p-12">
        <div className="max-w-3xl mx-auto">
          <article className="prose prose-lg prose-invert prose-headings:font-headline prose-p:leading-relaxed prose-p:text-justify max-w-none">
            <h2 className="text-4xl !mb-2">{book.title}</h2>
            <h3 className="text-2xl text-zinc-400 !mt-0 !mb-8">{book.author}</h3>
            
            <h4>Chapter 1: The Beginning</h4>
            {bookContent.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

            {bookImage && (
              <div className="!my-12">
                <Image
                  src={bookImage.imageUrl}
                  alt={bookImage.description}
                  width={800}
                  height={500}
                  className="rounded-lg shadow-lg"
                  data-ai-hint={bookImage.imageHint}
                />
                <p className="text-center text-sm italic text-zinc-400 mt-2">{bookImage.description}</p>
              </div>
            )}

            <h4>Chapter 2: The Discovery</h4>
            {bookContent.split('\n').map((paragraph, index) => (
              <p key={index+100}>{paragraph}</p>
            ))}
          </article>
        </div>
      </main>

      <footer className="sticky bottom-0 z-10 bg-[#212121] p-3 text-center border-t border-zinc-700">
        <p className="text-sm text-zinc-400">Page 1 of 352</p>
      </footer>
    </div>
  );
}

export async function generateStaticParams() {
  return books.map(book => ({
    id: book.id,
  }));
}
