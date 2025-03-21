
// This file now contains mock types and data instead of Supabase client

export type Video = {
  id: string;
  title: string;
  description: string;
  url: string;
  thumbnail: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  duration: number;
  created_at: string;
};

export type User = {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
};

// Mock videos data for the Learn page
export const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Introduction to Sign Language',
    description: 'Learn the basics of sign language with this beginner-friendly tutorial.',
    url: 'https://example.com/video1',
    thumbnail: 'https://images.unsplash.com/photo-1608403890284-86f353d83d49',
    category: 'basics',
    level: 'beginner',
    duration: 320,
    created_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Common Phrases in Sign Language',
    description: 'Master everyday phrases that will help you communicate effectively.',
    url: 'https://example.com/video2',
    thumbnail: 'https://images.unsplash.com/photo-1588710277537-126980e8d44e',
    category: 'phrases',
    level: 'beginner',
    duration: 480,
    created_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'ASL Alphabet Mastery',
    description: 'Learn to sign every letter in the alphabet with perfect form.',
    url: 'https://example.com/video3',
    thumbnail: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c',
    category: 'alphabet',
    level: 'beginner',
    duration: 420,
    created_at: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Numbers and Counting in Sign Language',
    description: 'Master numbers from 1-100 and learn counting techniques.',
    url: 'https://example.com/video4',
    thumbnail: 'https://images.unsplash.com/photo-1567177662154-dfeb4c93b6ae',
    category: 'numbers',
    level: 'beginner',
    duration: 280,
    created_at: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Intermediate Conversational Signs',
    description: 'Take your signing to the next level with more complex conversational patterns.',
    url: 'https://example.com/video5',
    thumbnail: 'https://images.unsplash.com/photo-1607748851687-ba9a10438621',
    category: 'conversation',
    level: 'intermediate',
    duration: 560,
    created_at: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'Advanced Expression Techniques',
    description: 'Learn to convey emotions and complex ideas through facial expressions and body language.',
    url: 'https://example.com/video6',
    thumbnail: 'https://images.unsplash.com/photo-1580130732478-4e339fb1172f',
    category: 'expressions',
    level: 'advanced',
    duration: 620,
    created_at: new Date().toISOString(),
  },
];
