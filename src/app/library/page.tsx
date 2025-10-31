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
        <div>
          <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight">Library Catalog</h1>
          <p className="text-muted-foreground">Browse and discover your next favorite book.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title or author..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedGenre} onValueChange={setSelectedGenre}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter by genre" />
            </SelectTrigger>
            <SelectContent>
              {genres.map(genre => (
                <SelectItem key={genre} value={genre}>
                  {genre === 'all' ? 'All Genres' : genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
