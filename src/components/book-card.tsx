import Image from 'next/image';
import Link from 'next/link';
import type { Book } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface BookCardProps {
  book: Book;
}

export function BookCard({ book }: BookCardProps) {
  const placeholder = PlaceHolderImages.find(p => p.id === book.coverImage);

  return (
    <Card className="overflow-hidden transition-all hover:shadow-xl hover:-translate-y-1 h-full flex flex-col group border-2 border-transparent hover:border-primary/20">
      <CardContent className="p-4 flex-grow flex flex-col">
        <Link href={`/book/${book.id}`} className="block">
          <div className="relative aspect-[2/3] w-full mb-4 rounded-md overflow-hidden">
            {placeholder && (
              <Image
                src={placeholder.imageUrl}
                alt={`Cover of ${book.title}`}
                fill
                className="object-cover"
                data-ai-hint={placeholder.imageHint}
              />
            )}
          </div>
          <h3 className="font-headline text-lg font-semibold leading-tight tracking-tight flex-grow group-hover:text-primary transition-colors">{book.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">{book.author}</p>
        </Link>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button asChild size="sm" className="flex-1 btn-gradient">
          <Link href={`/book/${book.id}`}>Details</Link>
        </Button>
        <Button asChild size="sm" variant="outline" className="flex-1">
          <Link href={`/book/${book.id}`}>Read Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
