"use client";

import { useState, useMemo } from 'react';
import AppLayout from '@/components/layouts/app-layout';
import { books as allBooks } from '@/lib/data';
import { BookCard } from '@/components/book-card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from 'lucide-react';

export default function LibraryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');

  const genres = useMemo(() => ['all', ...Array.from(new Set(allBooks.map(b => b.genre)))], []);

  const filteredBooks = useMemo(() => {
    return allBooks.filter(book => {
      const matchesSearch =
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = selectedGenre === 'all' || book.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    });
  }, [searchTerm, selectedGenre]);

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="mb-8">
          <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">Library</h1>
        </div>

        {filteredBooks.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {filteredBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="font-headline text-2xl font-semibold">No Books Found</h2>
            <p className="text-muted-foreground mt-2">Try adjusting your search or filter.</p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
