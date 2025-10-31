import AppLayout from '@/components/layouts/app-layout';
import { books } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookCheck, Bookmark } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function BookDetailPage({ params }: { params: { id: string } }) {
  const book = books.find(b => b.id === params.id);

  if (!book) {
    notFound();
  }

  const placeholder = PlaceHolderImages.find(p => p.id === book.coverImage);

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="relative aspect-[2/3] w-full rounded-lg overflow-hidden shadow-lg">
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
          </div>
          <div className="md:col-span-2 space-y-4">
            <div>
              <Badge variant="secondary">{book.genre}</Badge>
              <h1 className="font-headline text-3xl md:text-4xl font-bold mt-2">{book.title}</h1>
              <p className="text-xl text-muted-foreground mt-1">by {book.author}</p>
            </div>
            
            <div className="flex items-center gap-4">
              <Button size="lg" disabled={book.availability === 'checked_out'}>
                <BookCheck className="mr-2 h-4 w-4" />
                {book.availability === 'available' ? 'Check Out' : 'Unavailable'}
              </Button>
              <Button size="lg" variant="outline">
                <Bookmark className="mr-2 h-4 w-4" />
                Add to Wishlist
              </Button>
            </div>

            <Separator />

            <div>
                <h2 className="font-headline text-2xl font-semibold">Description</h2>
                <p className="text-foreground/80 mt-2 leading-relaxed">{book.description}</p>
            </div>
            
            <Separator />

            <div>
                <h2 className="font-headline text-2xl font-semibold">Details</h2>
                <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                    <span className="text-muted-foreground">ISBN</span>
                    <span>{book.isbn}</span>
                    <span className="text-muted-foreground">Availability</span>
                    <span className={`capitalize ${book.availability === 'available' ? 'text-green-600' : 'text-red-600'}`}>
                        {book.availability === 'available' ? 'Available' : 'Checked Out'}
                    </span>
                </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export async function generateStaticParams() {
    return books.map(book => ({
        id: book.id,
    }));
}
