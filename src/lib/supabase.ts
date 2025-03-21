
// This file now contains mock types and data 

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
  completed?: boolean;
};

export type User = {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
};

// Mock videos data for the Learn page (Indian Sign Language)
export const mockVideos: Video[] = [
  {
    id: '1',
    title: 'Introduction to Indian Sign Language',
    description: 'Learn the basics of Indian Sign Language with this beginner-friendly tutorial.',
    url: 'https://www.youtube.com/watch?v=VV9vpcKZ4Xg',
    thumbnail: 'https://images.unsplash.com/photo-1608403890284-86f353d83d49',
    category: 'basics',
    level: 'beginner',
    duration: 320,
    created_at: new Date().toISOString(),
    completed: true,
  },
  {
    id: '2',
    title: 'Common Phrases in ISL',
    description: 'Master everyday phrases that will help you communicate effectively in Indian Sign Language.',
    url: 'https://www.youtube.com/watch?v=FWkJ86HXWu8',
    thumbnail: 'https://images.unsplash.com/photo-1588710277537-126980e8d44e',
    category: 'phrases',
    level: 'beginner',
    duration: 480,
    created_at: new Date().toISOString(),
    completed: true,
  },
  {
    id: '3',
    title: 'ISL Alphabet Mastery',
    description: 'Learn to sign every letter in the Indian Sign Language alphabet with perfect form.',
    url: 'https://www.youtube.com/watch?v=yCkHsEJ8GsY',
    thumbnail: 'https://images.unsplash.com/photo-1600880292089-90a7e086ee0c',
    category: 'alphabet',
    level: 'beginner',
    duration: 420,
    created_at: new Date().toISOString(),
    completed: false,
  },
  {
    id: '4',
    title: 'Numbers and Counting in ISL',
    description: 'Master numbers from 1-100 and learn counting techniques in Indian Sign Language.',
    url: 'https://www.youtube.com/watch?v=hy6ZwCJmSFE',
    thumbnail: 'https://images.unsplash.com/photo-1567177662154-dfeb4c93b6ae',
    category: 'numbers',
    level: 'beginner',
    duration: 280,
    created_at: new Date().toISOString(),
    completed: false,
  },
  {
    id: '5',
    title: 'Intermediate Conversational ISL',
    description: 'Take your signing to the next level with more complex conversational patterns in Indian Sign Language.',
    url: 'https://www.youtube.com/watch?v=pJcjZGI8hQM',
    thumbnail: 'https://images.unsplash.com/photo-1607748851687-ba9a10438621',
    category: 'conversation',
    level: 'intermediate',
    duration: 560,
    created_at: new Date().toISOString(),
    completed: false,
  },
  {
    id: '6',
    title: 'Advanced Expression Techniques in ISL',
    description: 'Learn to convey emotions and complex ideas through facial expressions and body language in Indian Sign Language.',
    url: 'https://www.youtube.com/watch?v=sW2ps5VGTBU',
    thumbnail: 'https://images.unsplash.com/photo-1580130732478-4e339fb1172f',
    category: 'expressions',
    level: 'advanced',
    duration: 620,
    created_at: new Date().toISOString(),
    completed: false,
  },
];

// Function to get user progress
export const getUserProgress = () => {
  const completedVideos = mockVideos.filter(video => video.completed).length;
  const totalVideos = mockVideos.length;
  return (completedVideos / totalVideos) * 100;
};

// YouTube channel URL for Indian Sign Language
export const youtubeChannelUrl = 'https://www.youtube.com/channel/UC3AcGIlqVI4nJWCwHgHFXtg';

// Dictionary of common words/phrases and their YouTube video IDs
export const signDictionary: Record<string, string> = {
  "hello": "VV9vpcKZ4Xg",
  "thank you": "FWkJ86HXWu8",
  "please": "yCkHsEJ8GsY", 
  "sorry": "hy6ZwCJmSFE",
  "good morning": "pJcjZGI8hQM",
  "good night": "sW2ps5VGTBU",
  "how are you": "VV9vpcKZ4Xg", 
  "my name is": "FWkJ86HXWu8",
  "nice to meet you": "yCkHsEJ8GsY",
  "family": "hy6ZwCJmSFE",
  "friend": "pJcjZGI8hQM",
  "help": "sW2ps5VGTBU",
  "yes": "VV9vpcKZ4Xg",
  "no": "FWkJ86HXWu8",
  "water": "yCkHsEJ8GsY",
  "food": "hy6ZwCJmSFE",
  "happy": "pJcjZGI8hQM",
  "sad": "sW2ps5VGTBU"
};
