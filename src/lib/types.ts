export type User = {
  id: string;
  name: string;
  email: string;
  password?: string; // Should not be sent to client
  role: 'admin' | 'member';
};

export type Book = {
  id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  availability: 'available' | 'checked_out';
  coverImage: string;
};
