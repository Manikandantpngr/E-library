import Image from 'next/image';
import Link from 'next/link';
import type { Book } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const placeholder = PlaceHolderImages.find(p => p.id === book.coverImage);

  return (
    <Link href={`/book/${book.id}`}>
      <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
        <div className="relative aspect-[2/3] w-full">
          {placeholder && (
            <Image
              src={placeholder.imageUrl}
              alt={`Cover of ${book.title}`}
              fill
              className="object-cover"
              data-ai-hint={placeholder.imageHint}
            />
          )}
          {book.availability === 'checked_out' && (
             <Badge variant="secondary" className="absolute top-2 right-2">Checked Out</Badge>
          )}
        </div>
        <CardContent className="p-4 flex-grow flex flex-col">
          <h3 className="font-headline text-lg font-semibold leading-tight tracking-tight flex-grow">{book.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{book.author}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
