import type { Book, User } from './types';

export const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@securelib.com',
    password: 'password', // In a real app, this would be a hash
    role: 'admin',
  },
  {
    id: '2',
    name: 'Member User',
    email: 'member@securelib.com',
    password: 'password',
    role: 'member',
  },
  {
    id: '3',
    name: 'Jane Doe',
    email: 'jane.d@example.com',
    password: 'password',
    role: 'member',
  },
];

export const books: Book[] = [
  {
    id: '1',
    title: 'Dune',
    author: 'Frank Herbert',
    genre: 'Science Fiction',
    isbn: '978-0441013593',
    description:
      'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the "spice" melange, a drug capable of extending life and enhancing consciousness. ',
    availability: 'available',
    coverImage: 'dune',
  },
  {
    id: '2',
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Romance',
    isbn: '978-1503290563',
    description:
      'It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife. So begins Pride and Prejudice, Jane Austen\'s witty comedy of manners--one of the most popular novels of all time.',
    availability: 'checked_out',
    coverImage: 'pride-and-prejudice',
  },
  {
    id: '3',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    isbn: '978-0061120084',
    description:
      'The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it, To Kill A Mockingbird became both an instant bestseller and a critical success when it was first published in 1960.',
    availability: 'available',
    coverImage: 'mockingbird',
  },
  {
    id: '4',
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    isbn: '978-0451524935',
    description:
      'In 1984, London is a grim city in the totalitarian state of Oceania where Big Brother is always watching you and the Thought Police can practically read your mind. Winston Smith is a man in grave danger for the simple reason that his memory still functions.',
    availability: 'available',
    coverImage: '1984',
  },
  {
    id: '5',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    isbn: '978-0345339683',
    description:
      'Bilbo Baggins is a hobbit who enjoys a comfortable, unambitious life, rarely traveling any farther than his pantry or cellar. But his contentment is disturbed when the wizard Gandalf and a company of dwarves arrive on his doorstep one day to whisk him away on an adventure.',
    availability: 'checked_out',
    coverImage: 'hobbit',
  },
  {
    id: '6',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Fiction',
    isbn: '978-0743273565',
    description: 'The Great Gatsby, F. Scott Fitzgerald’s third book, stands as the supreme achievement of his career. This exemplary novel of the Jazz Age has been acclaimed by generations of readers.',
    availability: 'available',
    coverImage: 'gatsby',
  },
  {
    id: '7',
    title: 'Foundation',
    author: 'Isaac Asimov',
    genre: 'Science Fiction',
    isbn: '978-0553803716',
    description:
      'For twelve thousand years the Galactic Empire has ruled supreme. Now it is dying. But only Hari Seldon, creator of the revolutionary science of psychohistory, can see into the future -- to a dark age of ignorance, barbarism, and warfare that will last thirty thousand years.',
    availability: 'available',
    coverImage: 'foundation',
  },
  {
    id: '8',
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    genre: 'Fiction',
    isbn: '978-0316769488',
    description:
      'The hero-narrator of The Catcher in the Rye is an ancient child of sixteen, a native New Yorker named Holden Caufield. Through circumstances that tend to preclude adult, secondhand description, he leaves his prep school in Pennsylvania and goes underground in New York City for three days.',
    availability: 'available',
    coverImage: 'catcher-in-the-rye',
  },
];
