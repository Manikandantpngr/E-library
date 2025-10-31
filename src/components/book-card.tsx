import Image from 'next/image';
import Link from 'next/link';
import type { Book } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const placeholder = PlaceHolderImages.find(p => p.id === book.coverImage);

  return (
    <Link href={`/book/${book.id}`} className="block group">
        <Card className="overflow-hidden transition-all hover:shadow-xl h-full flex flex-col border-2 border-transparent hover:border-primary/50">
            <CardContent className="p-0 flex-grow flex flex-col">
                <div className="relative aspect-[2/3] w-full">
                    {placeholder && (
                    <Image
                        src={placeholder.imageUrl}
                        alt={`Cover of ${book.title}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        data-ai-hint={placeholder.imageHint}
                    />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <h3 className="font-headline text-lg font-bold leading-tight tracking-tight">{book.title}</h3>
                        <p className="text-sm text-white/80 mt-1">{book.author}</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    </Link>
  );
}
